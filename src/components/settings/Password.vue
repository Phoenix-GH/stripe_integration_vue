<template lang="html">

    <div class="container container--fw container--s layout--1-4 cf">

        <!-- LEFT SIDEBAR -->
        <div class="layout__col">
            <ul class="list list--nav page__tabs hide--m">
                <li class="item">
                    <router-link class="link" :to="{ name: 'account' }">Account</router-link>
                </li>
                <li class="item" v-if="!hasFacebook">
                    <router-link class="link is--active" :to="{ name: 'password' }">Password</router-link>
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
            <div @click="toggleMob" class="input input--dropdown mobile__menu show--m" :class="{'is--active' : showMobileMenu}">
                <span class="input__field">Navigation</span>
                <ul class="dropdown__list">
                    <li class="item">
                        <router-link class="link" :to="{ name: 'account' }">Account</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link is--active" v-if="!hasFacebook" :to="{ name: 'password' }">Password</router-link>
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
                            <h3 class="ts--title">Change Password</h3>
                            <p class="ts--body is--secondary">Keep your account secure, and your information safe.</p>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg class="icon-lock icon--l color--accent">
                                <use xlink:href="#icon-lock"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- /PANEL HEADER -->

                <!-- PANEL BODY -->
                <div class="panel__body">

                    <!-- PASSWORD INFO -->
                    <div class="panel__section">
                        <p>For better security, try using a mix of upper/lower-case letters, numbers and special characters
                            like '!@#$%^&*', and don't use passwords like 'password' or '1234567890.'</p>
                    </div>
                    <!-- /PASSWORD INFO -->

                    <!-- PASSWORD FORM -->
                    <div class="panel__section">
                        <div class="well bg--snow">
                            <form id="formChangePassword" class="form" action="">
                                <div class="input input--password">
                                    <input type="password" class="input__field" :class="{'not--empty': password.length > 0}" id="currentPassword" v-model="password">
                                    <label for="currentPassword">Current Password</label>
                                    <div class="input__link"></div>
                                </div>
                                <div class="input input--password">
                                    <input type="password" class="input__field" :class="{'not--empty': newPassword.length > 0}" id="newPassword" v-model="newPassword">
                                    <label for="newPassword">New Password</label>
                                    <div class="input__link"></div>
                                    <span class="input__helper">Must be at least 8 characters (case sensitive)</span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /PASSWORD FORM -->

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
                <button class="btn btn--primary is--reversed" @click="changePassword">Save</button>
            </div>
        </div>
        <!-- /CONTROL BAR -->

    </div>

</template>

<script>
    import { User } from '../../api';
    import { mapGetters } from 'vuex';
    import $ from 'jquery';
    export default {
        data: function () {
            return {
                password: '',
                newPassword: '',
                errorMessage: '',
                showMobileMenu: false
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ]),
            hasFacebook() {
                if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
                return true;
            },
            shouldHide() {
                if (this.password.length >= 4) {
                    return false;
                }
                return true;
            }
        },
        methods: {
            changePassword() {
                User.resetPassword(this, { oldPassword: this.password, newPassword: this.newPassword }, (err, response) => {
                    if (err) {
                        alert('There was an error reseting your password');
                        return;
                    }
                    alert('Success!');
                    this.discardChanges();
                });
            },
            discardChanges() {
                this.password = '';
                this.newPassword = '';
            },
            toggleMob() {
                if (this.showMobileMenu) {
                    this.showMobileMenu = false;
                } else {
                    this.showMobileMenu = true;
                }
            }
        },
        created() {

            //===== Showing/Hiding Password Toggle
            $(document).ready(function () {
                $('.input--password .input__field').each(function () {
                    var input = $(this),
                        toggle = $(this).siblings('.input__link'),
                        show = '<svg class="input__link--icon icon-show"><use xlink:href="#icon-show"></use></svg><a class="link" href="javascript:;">Show</a>',
                        hide = '<svg class="input__link--icon icon-hide"><use xlink:href="#icon-hide"></use></svg><a class="link" href="javascript:;">Hide</a>';
                    $(toggle).html(show);
                    $(toggle).click(function () {
                        if ($(input).attr('type') === 'password') {
                            $(input).attr('type', 'text');
                            $(toggle).html(hide);
                        } else {
                            $(input).attr('type', 'password');
                            $(toggle).html(show);
                        }
                    })
                });
            });

        }
    }

</script>

<style lang="css">

</style>