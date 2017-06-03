<template lang="html">

    <div class="container container--fw container--s layout--1-4 cf">

        <!-- LEFT SIDEBAR -->
        <div class="layout__col">
            <ul class="list list--nav page__tabs hide--m">
                <li class="item">
                    <router-link class="link" :to="{ name: 'account' }">Account</router-link>
                </li>
                <li class="item" v-if="!hasFacebook">
                    <router-link class="link" :to="{ name: 'password' }">Password</router-link>
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
                    <router-link class="link is--active" :to="{ name: 'referrals' }">Referrals</router-link>
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
                        <router-link class="link" :to="{ name: 'account' }">Account</router-link>
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
                        <router-link class="link is--active" :to="{ name: 'referrals' }">Referrals</router-link>
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
                            <h3 class="ts--title">Rewards &amp; Referrals</h3>
                            <p class="ts--body is--secondary">Keep track of the friend’s you’ve referred and the rewards you’ve received.</p>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg class="icon-reward icon--l color--accent">
                                <use xlink:href="#icon-reward"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- /PANEL HEADER -->

                <!-- PANEL BODY -->
                <div class="panel__body">

                    <!-- SHARING -->
                    <div class="panel__section">
                        <h4 class="ts--subtitle">Give a month, earn a month!</h4>
                        <p class="ts--body is--secondary">
                            Share your unique referral code with your friends and you’ll both receive a free month of Premium when they sign up!
                        </p>
                        <div class="well bg--snow" style="overflow:visible;">
                            <div class="wrapper">
                                <div class="wrapper__inner padding--m no--pad-l no--pad-tb">
                                    <div @click="addToClipboard" class="input input--text" data-tooltip="Click to copy" data-tip-pos="right">
                                        <input type="text" class="input__field not--empty" data-copy="Copied!" readonly id="inputID" :value="shareUrl">
                                        <label for="inputID">Referral URL</label>
                                    </div>
                                </div>
                                <div class="wrapper__inner" style="width:190px; transform: translateY(-4px);">

                                    <!-- FACBOOK SHARE -->
                                    <div class="fb-share-button" :data-href="shareUrl" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fselfmademan.com%2F&amp;src=sdkpreparse">Share</a></div>
                                    <!-- /FACEBOOK SHARE -->

                                    <!-- TWITTER SHARE -->
                                    <div class="disp--ib" style="transform:translateY(7px);">
                                        <a href="https://twitter.com/share" class="twitter-share-button" data-show-count="false" :data-url="shareUrl">Tweet</a>
                                    </div>
                                    <!-- /TWITTER SHARE -->

                                    <a class="btn btn--share is--email" href="mailto:support@smm.co">Email</a>
                                    <!-- /EMAIL SHARE -->

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /SHARING -->

                    <!-- MY REFERRALS -->
                    <div class="panel__section">
                        <h4 class="ts--subtitle">My Referrals</h4>

                        <!-- REFERRALS - (EMPTY STATE) -->
                        <!-- NOTE: Display only if the user has no referrals -->
                        <div class="well is--empty align--center">
                            You haven't invited any friends yet.
                        </div>
                        <!-- /REFERRALS - (EMPTY STATE) -->

                        <!-- REFERRALS -->
                        <table class="table" v-if="loggedIn">
                            <tbody>

                                <!-- SINGLE REFERRAL -->
                                <tr>
                                    <td>
                                        <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-2.jpg')"></div>
                                        William D.
                                    </td>
                                    <td class="align--center">
                                        Jan 17, 2017
                                    </td>
                                    <td class="align--right fontWeight--2">
                                        1 Month Free
                                    </td>
                                </tr>
                                <!-- /SINGLE REFERRAL -->

                                <!-- SINGLE REFERRAL -->
                                <tr>
                                    <td>
                                        <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-3.jpg')"></div>
                                        Senisa S.
                                    </td>
                                    <td class="align--center">
                                        Jan 17, 2017
                                    </td>
                                    <td class="align--right fontWeight--2">
                                        <!-- NOTE: Display 'check' icon if the credit has already been applied to the account -->
                                        <span data-tooltip="Mar. 11, 2017" data-tip-pos="left">
                                      <svg class="icon-check-circle icon--s color--accent margin--xs no--margin-l no--margin-tb"><use xlink:href="#icon-check-circle"></use></svg>
                                      1 Month Free
                                  </span>
                                    </td>
                                </tr>
                                <!-- /SINGLE REFERRAL -->

                                <!-- SINGLE REFERRAL -->
                                <tr>
                                    <td>
                                        <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-4.jpg')"></div>
                                        Bosco B.
                                    </td>
                                    <td class="align--center">
                                        Jan 17, 2017
                                    </td>
                                    <td class="align--right fontWeight--2">
                                        <!-- NOTE: Display 'check' icon if the credit has already been applied to the account -->
                                        <span data-tooltip="Mar. 11, 2017" data-tip-pos="left">
                                      <svg class="icon-check-circle icon--s color--accent margin--xs no--margin-l no--margin-tb"><use xlink:href="#icon-check-circle"></use></svg>
                                      1 Month Free
                                  </span>
                                    </td>
                                </tr>
                                <!-- /SINGLE REFERRAL -->

                            </tbody>
                        </table>
                        <!-- /REFERRALS -->

                    </div>
                    <!-- MY REFERRALS -->

                </div>
                <!-- /PANEL BODY -->

            </div>
        </div>
        <!-- /MAIN CONTENT -->

    </div>

</template>

<script>
    import $ from 'jquery';
    import { User } from '../../api';
    import { mapGetters } from 'vuex';

    export default {
        data: function () {
            return {
                referrals: []
            }
        },
        mounted() {
            twttr.widgets.load();
            if (window.FB) {
                window.FB.XFBML.parse();
            }

            $('[data-copy]').click(function () {
                var text = $(this).data('copy'),
                    alert = '<span class="field__alert">' + text + '</span>',
                    par = $(this).closest('.input'),
                    dur = 300;
                $(this).select();
                document.execCommand('copy');
                $(alert).hide().appendTo(par).fadeIn(dur).css({ 'transform': 'translateY(-5px)', 'opacity': '0' }).promise().done(function () {
                    $(this).fadeTo(50, 0, function () {
                        setTimeout(function () {
                            $('.field__alert').remove();
                        }, 200)
                    })
                });
            })

        },
        computed: {
            ...mapGetters([
                'user'
            ]),
            hasFacebook() {
                if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
                return true;
            },
            loggedIn() {
                return false;
            },
            shareUrl() {
                return `https://smm.co?ref=${this.user.referralId}`;
            },
            twitterShareUrl() {
                return `https://twitter.com/intent/tweet?url=${this.shareUrl}`;
            }
        },
        methods: {
            addToClipboard() {
                console.log('added to clipboard');
                document.querySelector('#inputID').select();
                document.execCommand('copy');
            }
        }
    }

</script>

<style lang="css">

</style>
