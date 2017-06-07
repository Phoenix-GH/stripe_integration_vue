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
                    <router-link class="link is--active" :to="{ name: 'payments' }">Payments</router-link>
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
                        <router-link class="link" :to="{ name: 'account' }">Account</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" v-if="!hasFacebook" :to="{ name: 'password' }">Password</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link is--active" :to="{ name: 'payments' }">Payments</router-link>
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
                            <h3 class="ts--title">Payment Settings</h3>
                            <p class="ts--body is--secondary">Change your saved method of payment.</p>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg class="icon-payments icon--l color--accent">
                                <use xlink:href="#icon-payments"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- /PANEL HEADER -->

                <!-- PANEL BODY -->
                <div class="panel__body">
                    <div class="panel__section">

                        <!-- PAYMENT METHOD -->
                        <!-- NOTE: Display only if Credit Card saved -->
                        <div class="well" v-if="hasStripeAccount">
                            <div class="row">
                                <div class="col col--7-of-12 col--am">
                                    <ul class="list list--inline list--divided">
                                        <li class="item no--pad-l">
                                            <span class="cc__icon" :class="{'is--visa': updatedCardInfo.cardType == 'Visa', 'is--mastercard': updatedCardInfo.cardType == 'MasterCard', 'is--amex': updatedCardInfo.cardType == 'American Express', 'is--discover': updatedCardInfo.cardType == 'Discover', 'is--diners-club': updatedCardInfo.cardType == 'Diners Club'}"></span>
                                        </li>
                                        <li class="item">
                                            <span class="ts--subtitle disp--block">{{ updatedCardInfo.cardType }} ending in {{ updatedCardInfo.last4 }}</span>
                                            <span class="ts--body is--secondary">Expires on  {{ updatedCardInfo.exp_month }}/{{ updatedCardInfo.exp_year }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col col--5-of-12 col--am align--right">
                                    <button class="btn btn--secondary btn--block" @click="updateCreditCard">Change Method</button>
                                </div>
                            </div>
                        </div>
                        <!-- /PAYMENT METHOD -->

                        <!-- PAYMENT METHOD - EMPTY STATE -->
                        <!-- NOTE: Display if no payment method is added -->
                        <div class="well is--empty align--center" v-if="showCardEntry">
                            <p class="ts--body">You don't have a payment method saved yet.</p>
                            <div class="form-row">
                                <div class="StripeElement" id="card-element">
                                </div>
                                <div id="card-errors"></div>
                            </div>
                            <br>
                            <button style="margin: 20px;" @click="generateToken" class="btn btn--primary">{{ buttonMessage }}</button>
                        </div>

                        <!-- /PAYMENT METHOD - EMPTY STATE -->

                        <!-- Billing Link -->
                        <div class="align--right" v-if="hasStripeAccount">
                            <router-link class="link link--secondary" :to="{ name: 'billing' }">View Billing History</router-link>
                        </div>

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
    export default {
        mounted() {
            if (!this.user.hasCustomerId) {
                this.setupStripe();
            }
            this.retrieveCardInfo();
        },
        data: function () {
            return {
                cardInfo: {},
                stripeReference: {},
                cardReference: {},
                changeCreditCard: false,
                buttonMessage: 'Add Credit Card'
            }
        },
        watch: {
            changeCreditCard(val) {
                if (val == true) {
                    this.$nextTick(() => {
                        this.setupStripe();
                    })
                    console.log('wants to change credit card');
                } else {
                    console.log('back to normal');
                }
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
            hasStripeAccount() {
                if (this.user.hasCustomerId && this.changeCreditCard == false) {
                    return true;
                } else {
                    return false;
                }
            },
            updatedCardInfo() {
                return this.cardInfo;
            },
            showCardEntry() {
                if (!this.user.hasCustomerId || this.changeCreditCard == true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            generateToken() {
                let _this = this;
                this.stripeReference.createToken(this.cardReference).then(function (result) {
                    if (result.error) {
                        // Inform the user if there was an error
                        var errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
                    } else {
                        // Send the token to your server
                        if (_this.user.hasCustomerId) { //just update the card on file
                            _this.updateCustomerCreditCard(result.token.id);
                        } else { //create a new customer
                            _this.createStripeCustomer(result.token.id);
                        }
                    }
                });
            },
            setupStripe() {
                // Create a Stripe client
                let stripe = Stripe('pk_test_hz7Ftxjb7anZasP8PFtcFwQv');
                this.stripeReference = stripe;

                // Create an instance of Elements
                var elements = stripe.elements();

                // Custom styling can be passed to options when creating an Element.
                // (Note that this demo uses a wider set of styles than the guide below.)
                var style = {
                    base: {
                        color: '#32325d',
                        lineHeight: '24px',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '24px',
                        '::placeholder': {
                            color: '#aab7c4'
                        }
                    },
                    invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a'
                    }
                };

                // Create an instance of the card Element
                var card = elements.create('card', { style: style, hidePostalCode: true });

                // Add an instance of the card Element into the `card-element` <div>
                var cardElement = document.getElementById('card-element');
                card.mount(cardElement);

                // Handle real-time validation errors from the card Element.
                card.addEventListener('change', function (event) {
                    var displayError = document.getElementById('card-errors');
                    if (event.error) {
                        displayError.textContent = event.error.message;
                    } else {
                        displayError.textContent = '';
                    }
                });

                this.cardReference = card;

            },
            createStripeCustomer(token) {
                const payload = {
                    token: token
                }
                let _this = this;
                this.changeCreditCard = false;
                User.createStripeCustomer(_this, payload, (err, response) => {
                    if (err) return console.log(err);
                    console.log(response);
                });
            },
            retrieveCardInfo() {
                let _this = this;
                User.cardInfo(this, (err, result) => {
                    if (err) console.log(err);
                    _this.cardInfo = result;
                })
            },
            updateCreditCard() {
                this.changeCreditCard = true;
                this.buttonMessage = 'Update Card';
            },
            updateCustomerCreditCard(token) {
                let _this = this;
                User.updateCardInfo(this, { token: token }, cardupdate => {
                    _this.changeCreditCard = false;
                    _this.retrieveCardInfo();
                })
            }
        }
    }

</script>

<style lang="css" scoped>
    .StripeElement {
        background-color: white;
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid transparent;
        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
        border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
</style>
