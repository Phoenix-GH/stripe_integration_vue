<template lang="html">

    <div class="container container--fw container--s layout--1-4 cf">

        <!-- LEFT SIDEBAR -->
        <div class="layout__col">
            <ul class="list list--nav page__tabs hide--m">
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
                <li class="item" v-if="user.role == 2">
                    <router-link class="link" :to="{ name: 'reviews' }">Reviews</router-link>
                </li>
                <li class="item" v-if="user.role == 2">
                    <router-link class="link" :to="{ name: 'students' }">Students</router-link>
                </li>
            </ul>
        </div>
        <!-- /LEFT SIDEBAR -->

        <!-- MAIN CONTENT -->
        <div class="layout__col">

            <!-- MOBILE NAV -->
            <div class="input input--dropdown mobile__menu show--m">
                <span class="input__field">Navigation</span>
                <ul class="dropdown__list">
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
                    <li class="item" v-if="user.role == 2">
                        <router-link class="link" :to="{ name: 'reviews' }">Reviews</router-link>
                    </li>
                    <li class="item" v-if="user.role == 2">
                        <router-link class="link" :to="{ name: 'students' }">Students</router-link>
                    </li>
                </ul>
            </div>
            <!-- /MOBILE NAV -->

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
                            <div class="row">
                                <div class="col col--7-of-12 col--am">
                                    <div class="avatar avatar--l margin--s no--margin-tb no--margin-l" :style="'background-image:url(' + profileImageUrl + ')'">
                                        <div v-if="this.user.facebookId != undefined" class="badge badge--fb"><svg class="icon-social-facebook"><use xlink:href="#icon-social-facebook"></use></svg></div>
                                    </div>
                                    <!-- NOTE: Can be 'Never', '23 hours ago', 'Yesterday', '2 days ago', 'A month ago', '2 months ago', 'A year ago', '2 years ago' -->
                                    {{ lastUpdatedPhoto }}
                                </div>
                                <div class="col col--5-of-12 col--am align--right">
                                    <input type="file" accept="image/png, image/jpeg" style="display:none;" id="inputfile" @change="onFileChange" />
                                    <button id="upload-button" class="btn btn--primary btn--block" :class="{'has--loader': hasLoader }"  @click="uploadPhoto">
                                        <div v-if="uploadState <= 1" class="btn--inner"><span class="text"><use xlink:href="#icon-upload-photo"></use></svg>{{ uploadingText }}</span><div class="loader"><span></span></div></div>
                                        <div v-if="uploadState == 2" class="btn--inner"><span class="checkmark"></span></div>
                                    </button>
                                    <a class="link link--secondary fontSize--xs margin--xs no--margin-b no--margin-lr" @click="removeImage">Delete</a>
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
                                    <label for="lastName">Last Name</label>
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
                    <div clas="panel__section" v-if="user.subscriptionType!='free'">
                        <div class="well">
                            <div class="row">
                                <div class="col col--8-of-12 col--m-1-of-2 col--am">
                                    <span v-if="user.subscriptionType!='paused'" class="ts--subtitle">Membership</span>
                                    <span v-if="user.subscriptionType=='paused'" class="ts--subtitle">Membership Paused</span>
                                    <span v-if="user.subscriptionType!='paused'" class="ts--body is--secondary disp--block">Automatically renews: {{ subscriptionRenewal }}</span>
                                    <span v-if="user.subscriptionType=='paused'" class="ts--body is--secondary disp--block">Will Cancel On: {{ subscriptionRenewal }}</span>
                                </div>
                                <div class="col col--4-of-12 col--m-1-of-2 col--am align--right">
                                    <button v-if="user.subscriptionType!='paused'" class="btn btn--secondary btn--block is--warning" @click="pauseRenewal">Pause Renewal</button>
                                    <button v-if="user.subscriptionType=='paused'" class="btn btn--secondary btn--block is--affirmative" @click="activateRenewal">Activate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /MEMBERSHIP -->

                </div>
                <!-- /PANEL BODY -->
            </div>
        </div>
        <!-- /MAIN CONTENT -->

        <!-- CONTROL BAR -->
        <div class="control__bar fixed--bottom wrapper bg--accent is--reversed" :class="{show: !shouldHide}">
            <div class="wrapper__inner">
                <a class="link link--secondary fontSize--xs" @click="discardChanges">Discard Changes</a>
            </div>
            <div class="wrapper__inner align--right">
                <button class="btn btn--primary is--reversed" @click="saveUser">Save</button>
            </div>
        </div>
        <!-- /CONTROL BAR -->

    </div>

</template>

<script>
    import { User } from '../../api';
    import { mapGetters } from 'vuex';
    import { uploadToS3 } from '../../api/uploader';
    import { eventBus } from '../../main';
    import { timeSince } from '../../helpers/util';

    var hdate = require('human-date');

    export default {
        data: function () {
            return {
                photoIsUploaded: false,
                profileImageUrl: 'https://s3.amazonaws.com/selfmademanbucket/assets/img/avatar-default-2.png',
                email: '',
                firstName: '',
                lastName: '',
                errorMessage: '',
                hasLoader: false,
                uploadingText: 'Upload Photo',
                width: '192px',
                uploadState: 0,
                subDate: '',
                subType: ''
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
            lastUpdatedPhoto() {
                let date = new Date(this.user.updatedAt);
                return `${timeSince(date)} ago`;
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
                if (this.user.subscriptionType != 'free') return true;
                return false;
            },
            subscriptionRenewal() {
                return this.lastRenewal;
            }
        },
        created() {

            //set initial values
            if (this.user.profileImageUrl.length > 0) {
                this.profileImageUrl = this.user.profileImageUrl;
            } else {
                this.profileImageUrl = "https://s3.amazonaws.com/selfmademanbucket/assets/img/avatar-default-2.png";
            }

            if (this.user.email != undefined) {
                this.email = this.user.email;
            }

            if (this.user.firstName != undefined) {
                this.firstName = this.user.firstName;
            }

            if (this.user.lastName != undefined) {
                this.lastName = this.user.lastName;
            }




            if (this.user.subscribed) {
                User.subscriptionInfo(this, info => {
                    this.subType = info.items.data[0].plan.id;
                    let newDate = hdate.prettyPrint(new Date(info.current_period_end * 1000));
                    this.$store.dispatch('updateLastRenewal', newDate);
                })
            }


            console.log(JSON.stringify(this.user));

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
                    User.updateUser(_this, _this.updatePayload);
                });
            },
            removeImage() {
                this.profileImageUrl = 'https://s3.amazonaws.com/selfmademanbucket/assets/img/avatar-default-2.png';
                User.updateUser(this, this.updatePayload);
            },
            pauseRenewal() {
                User.pauseRenewal(this);
            },
            activateRenewal() {
                if (this.subType == 'monthlysmm') {
                    User.activateMonthly(this);
                } else if (this.subType == 'annualsmm') {
                    User.activateAnnual(this);
                } else {
                    console.log(this.subType);
                }
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

<style lang="css" scoped>

</style>
