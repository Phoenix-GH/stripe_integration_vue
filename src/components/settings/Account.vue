<template lang="html">

    <div class="row content">

        <!-- LEFT SIDEBAR -->
        <div class="col col--2-of-12 col--push-1-of-12">
            <ul class="list list--nav page__tabs">
                <li class="item">
                    <router-link class="link is--active" :to="{ name: 'account' }">Account</router-link>
                </li>
                <li class="item">
                    <router-link class="link" v-if="!hasFacebook" :to="{ name: 'password' }">Password</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'payments' }">Payments</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'billing' }">Billing</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'emailnotifications' }">Email Notifications</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'referrals' }">Referrals</router-link>
                </li>
            </ul>
        </div>
        <!-- /LEFT SIDEBAR -->

        <!-- SETTINGS PANEL -->
        <div class="col col--7-of-12">
            <div class="panel">
                <!-- PANEL HEADER -->
                <div class="panel__head">
                    <div class="wrapper">
                        <div class="wrapper__inner">
                            <h3 class="ts--title">Account Settings</h3>
                            <p class="ts--body is--secondary">Make changes to your profile information and membership.</p>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg class="icon-account icon--l color--accent">
                                <use xlink:href="#icon-account"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- /PANEL HEADER -->

                <!-- PANEL BODY -->
                <div class="panel__body">

                    <!-- AVATAR -->
                    <div class="panel__section">
                        <div class="well">
                            <div class="wrapper">
                                <div class="wrapper__inner">
                                    <div class="avatar avatar--l margin--s no--margin-tb no--margin-l" :style="'background-image:url(' + profileImageUrl + ')'"></div>
                                    <!-- NOTE: Can be 'Never', '23 hours ago', 'Yesterday', '2 days ago', 'A month ago', '2 months ago', 'A year ago', '2 years ago' -->
                                    Updated: 2 days ago
                                </div>
                                <div class="wrapper__inner align--right">
                                    <ul class="list list--inline">
                                        <!-- NOTE: 'Delete' is only displayed if a photo has been uploaded -->
                                        <li class="item" v-if="user.profileImageUrl">
                                            <a class="link link--secondary fontSize--xs" href="#">Delete</a>
                                        </li>
                                        <li class="item">
                                            <input type="file" accept="image/png, image/jpeg" style="display:none;" id="inputfile" @change="onFileChange" />
                                            <button id="upload-button" class="btn btn--primary" :class="{'has--loader': hasLoader }" :style="styleObject" @click="uploadPhoto">
                                                <div v-if="uploadState <= 1" class="btn--inner"><span class="text">{{ uploadingText }}</span><div class="loader"><span></span></div></div>
                                                <div v-if="uploadState == 2" class="btn--inner"><span class="checkmark"></span></div>
                                              </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /AVATAR -->

                    <!-- PROFILE FORM -->
                    <div class="panel__section">
                        <div class="well bg--snow">
                            <form id="formProfileSettings" class="form" action="">
                                <div class="input input--text">
                                    <input type="text" class="input__field" :class="{'not--empty': firstName.length > 0}" id="firstName" v-model="firstName">
                                    <label for="firstName">First Name</label>
                                </div>
                                <div class="input input--text">
                                    <input type="text" class="input__field" :class="{'not--empty': lastName.length > 0}" id="lastName" v-model="lastName">
                                    <label for="lastName">Last Name (Optional)</label>
                                </div>
                                <div class="input input--text">
                                    <input type="email" class="input__field" :class="{'not--empty': email.length > 0}" id="emailAddress" v-model="email">
                                    <label for="emailAddress">Email Address</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /PROFILE FORM -->

                    <!-- MEMBERSHIP -->
                    <div clas="panel__section" v-if="isSubscribed">
                        <div class="well">
                            <div class="wrapper">
                                <div class="wrapper__inner">
                                    <span class="ts--subtitle">Membership</span>
                                    <span class="ts--body is--secondary disp--block">Automatically renews: {{ subscriptionRenewal }}</span>
                                </div>
                                <div class="wrapper__inner align--right">
                                    <button class="btn btn--secondary" @click="pauseRenewal">Pause Renewal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /MEMBERSHIP -->

                </div>
                <!-- /PANEL BODY -->
            </div>
        </div>
        <!-- /SETTINGS PANEL -->

        <!-- RIGHT SIDEBAR -->
        <div class="col col--2-of-12 align--center" :class="{hide: shouldHide}">
            <ul class="list list--buttons">
                <li class="item">
                    <button class="btn btn--primary" @click="saveUser">Save Changes</button>
                </li>
                <li class="item" @click="discardChanges">
                    <a class="link link--secondary fontSize--xs">Discard Changes</a>
                </li>
            </ul>
        </div>
        <!-- / RIGHT SIDEBAR -->

    </div>

</template>

<script>
    import { User } from '../../api';
    import { mapGetters } from 'vuex';
    import { uploadToS3 } from '../../api/uploader';
    import { eventBus } from '../../main';
    var hdate = require('human-date');

    export default {
        data: function () {
            return {
                photoIsUploaded: false,
                profileImageUrl: '',
                email: '',
                firstName: '',
                lastName: '',
                errorMessage: '',
                hasLoader: false,
                uploadingText: 'Upload Photo',
                width: '192px',
                uploadState: 0,
                subDate: ''
            }
        },
        computed: {
            ...mapGetters([
                'user', 'lastRenewal'
            ]),
            shouldHide() {
                if ((this.email != this.user.email) || (this.firstName != this.user.firstName) || (this.lastName != this.user.lastName)) return false;
                return true;
            },
            updatePayload() {
                return {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    profileImageUrl: this.profileImageUrl
                }
            },
            styleObject() {
                return {
                    width: this.width,
                    'max-width': this.width
                };
            },
            hasFacebook() {
                if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
                return true;
            },
            isSubscribed() {
                if (this.user.subscribed) return true;
                return false;
            },
            subscriptionRenewal() {
                return this.lastRenewal;
            }
        },
        created() {

            //set initial values
            this.profileImageUrl = this.user.profileImageUrl;
            this.email = this.user.email;
            this.firstName = this.user.firstName;
            this.lastName = this.user.lastName;

            User.subscriptionInfo(this, info => {
                let newDate = hdate.prettyPrint(new Date(info.current_period_end * 1000));
                this.$store.dispatch('updateLastRenewal', newDate);
            })

        },
        methods: {
            uploadPhoto(e) {
                document.getElementById('inputfile').click();
            },
            beginUpload() {
                if (!this.hasLoader) {
                    this.uploadingText = "Uploading..."
                    this.width = document.getElementById('upload-button').offsetWidth;
                    this.hasLoader = true;
                }
            },
            completeUpload() {
                this.hasLoader = false;
                this.uploadState = 2;
                let _this = this;
                setTimeout(function () {
                    _this.uploadingText = "Upload Photo";
                    _this.uploadState = 0;
                }, 1400);
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let _this = this;
                this.beginUpload();
                uploadToS3(file, (err, imageUrl) => {
                    if (err) console.log(err);
                    _this.completeUpload();
                    _this.profileImageUrl = imageUrl;
                    _this.$store.dispatch('updateUser', { profileImageUrl: imageUrl });
                });
            },
            removeImage() {
                this.image = '';
            },
            pauseRenewal() {
                console.log('pausing');
            },
            saveUser() {
                this.$store.dispatch('updateUser', this.updatePayload);
                User.updateUser(this, this.updatePayload);
            },
            discardChanges() {
                this.profileImageUrl = this.user.profileImageUrl;
                this.email = this.user.email;
                this.firstName = this.user.firstName;
                this.lastName = this.user.lastName;
            }
        }

    }

</script>

<style lang="css">

</style>