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
                    <router-link class="link is--active" :to="{ name: 'billing' }">Billing</router-link>
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
                        <router-link class="link" :to="{ name: 'account' }">Account</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" v-if="!hasFacebook" :to="{ name: 'password' }">Password</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" :to="{ name: 'payments' }">Payments</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link is--active" :to="{ name: 'billing' }">Billing</router-link>
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
                            <h3 class="ts--title">Billing</h3>
                            <p class="ts--body is--secondary">{{ nextInvoiceDate }}</p>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg class="icon-billing icon--l color--accent">
                                <use xlink:href="#icon-billing"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- /PANEL HEADER -->

                <!-- PANEL BODY -->
                <div class="panel__body">
                    <div class="panel__section">

                        <!-- INVOICE LIST -->
                        <table class="table" v-if="isSubscribed">
                            <tbody>

                                <!-- SINGLE INVOICE -->
                                <!-- NOTE: If the month was comp'd from a referral, the total is '$0.00' and the 'reward' icon is displayed. Additionally the 'View Receipt' link is disabled. -->
                                <tr v-for="bill in updatedBills">
                                    <td>
                                        <span class="ts--subtitle disp--block">{{ readableDate(bill.date) }}</span>
                                        <span class="ts--body is--secondary">{{ bill.type }} Subscription</span>
                                    </td>
                                    <td class="align--right">
                                        <div class="disp--ib align--left">
                                            <!-- NOTE: Has a tooltip with the name of the person referred -->
                                            <span class="ts--subtitle disp--block" data-tooltip="" data-tip-pos="left">
                                          $ {{ (bill.amount/100).toFixed(2) }}
                                          <svg class="icon-reward icon--s color--accent"><use xlink:href="#icon-reward"></use></svg>
                                      </span>
                                            <a class="link link--secondary is--disabled">View Receipt</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- SINGLE INVOICE -->

                            </tbody>
                        </table>
                        <!-- /INVOICE LIST -->

                        <!-- EMPTY STATE -->
                        <!-- NOTE: Display if no history is available -->
                        <div class="well is--empty align--center" v-if="!isSubscribed">
                            <p class="ts--body">You don't have any billing history yet.</p>
                        </div>
                        <!-- /EMPTY STATE -->

                    </div>
                </div>
                <!-- /PANEL BODY -->

            </div>

        </div>
        <!-- /MAIN CONTENT -->

    </div>

</template>

<script>
    import { User } from '../../api';
    import { mapGetters } from 'vuex';
    import hdate from 'human-date';
    export default {
        data: function () {
            return {
                topics: [],
                nextInvoiceDate: "",
                bills: []
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
            isSubscribed() {
                if (this.user.subscriptionType != 'free') return true;
                return false;
            },
            updatedBills() {
                return this.bills;
            }
        },
        methods: {
            updateInvoices() {
                let _this = this;
                if (this.user.stripeCustomerId != undefined) {
                    User.billingInfo(this, info => {
                        _this.bills = info;
                    })
                }
            },
            readableDate(date) {
                let newDate = hdate.prettyPrint(new Date(date * 1000));
                return newDate;
            }
        },
        created() {
            this.updateInvoices();
        }
    }

</script>

<style lang="css">

</style>
