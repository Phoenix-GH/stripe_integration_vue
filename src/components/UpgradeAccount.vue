<template>
    <!-- CONTENT -->
    <div class="content__section row container container--fw">
        <div class="col col--9-of-12 col--centered">

            <!-- PANEL -->
            <div class="panel" style="overflow:hidden;">
                <!-- PANEL HEADER -->
                <div class="panel__head bg--black is--reversed">
                    <div class="wrapper">
                        <div class="wrapper__inner">
                            <span class="fontSize--s color--white-80">Start your learning journey today!</span>
                            <h3 class="ts--headline">Upgrade to Premium</h3>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg class="icon-star icon--l color--brand">
                                <use xlink:href="#icon-star"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- /PANEL HEADER -->
                <!-- PANEL BODY -->
                <div class="panel__body">

                    <div class="row">
                        <div class="col col--5-of-8 col--am">
                            <ul class="list list--bulleted list--checks fontSize--l">
                                <li class="item">
                                    Unlimited on-demand access
                                </li>
                                <li class="item">
                                    One new video lesson per month
                                </li>
                                <li class="item">
                                    Exclusive Mastery Course discounts
                                </li>
                                <li class="item">
                                    Live webcast shows and Q&amp;A
                                </li>
                                <li class="item">
                                    Invite-only annual events &amp; adventures
                                </li>
                            </ul>
                        </div>
                        <div class="col col--3-of-8 col--am align--center">
                            <!-- UPGRADE BUTTONS -->
                            <div class="panel__section divider--or">
                                <div data-tooltip="Best Deal!" data-tip-pos="left">
                                    <button @click="upgradeToAnnual(false)" class="btn btn--cta btn--block">$149.99 / Year</button>
                                </div>
                            </div>
                            <button @click="upgradeToMonthly(false)" class="btn btn--secondary">$13.95 (Monthly Plan)</button>
                            <!-- /UPGRADE BUTTONS -->
                        </div>
                    </div>

                </div>
                <!-- /PANEL BODY -->
            </div>
            <!-- /PANEL -->

            <div class="well align--center margin--m no--margin-lr no--margin-b">
                <a class="link" @click="goBack">No thanks, I'll upgrade later.</a>
            </div>

        </div>
    </div>
    <!-- /CONTENT -->
</template>

<script>
    import { User } from '../api';
    import { mapGetters } from 'vuex';

    export default {
        mounted() {
            let _this = this;
            this.stripeHandler = StripeCheckout.configure({
                key: 'pk_test_hz7Ftxjb7anZasP8PFtcFwQv',
                image: 'https://s3.amazonaws.com/selfmademan/webassets/smmlogo.jpg',
                locale: 'auto',
                token: function (token) {
                    User.createStripeCustomer(_this, { token: token.id }, (err, response) => {
                        if (err) return alert(`${err}`);
                        if (_this.targetMembership == 'annual') {
                            _this.upgradeToAnnual(true);
                        } else {
                            _this.upgradeToMonthly(true);
                        }
                    })
                }
            });

            // Close Checkout on page navigation:
            window.addEventListener('popstate', function () {
                if (this.stripeHandler != undefined) {
                    this.stripeHandler.close();
                }
            });
        },
        data: function () {
            return {
                stripeHandler: {},
                targetMembership: 'annual'
            }
        },
        computed: {
            ...mapGetters([
                'user', 'classesInProgress', 'userLoggedIn'
            ]),
        },
        methods: {
            goBack() {
                console.log('will go back');
                this.$router.go(-1);
            },
            upgradeToMonthly(skip) {
                if (skip) {
                    let _this = this;
                    this.$store.dispatch('updateSpinner', true);
                    User.purchaseMonthlySubscription(this, (err, response) => {
                        this.$store.dispatch('updateSpinner', false);
                        if (err != null) return alert(JSON.stringify(err));
                        _this.$router.go(-1);
                    });
                } else {
                    if (this.user.stripeSubscriptionId != undefined) return alert('You already have an active subscription!');
                    if (this.user.hasCustomerId) { //go ahead and update subscription
                        let _this = this;
                        this.$store.dispatch('updateSpinner', true);
                        User.purchaseMonthlySubscription(this, (err, response) => {
                            this.$store.dispatch('updateSpinner', false);
                            if (err != null) return alert(JSON.stringify(err));
                            _this.$router.go(-1);
                        });
                    } else { //must create it first
                        let email = this.user.email || '';
                        if (email.length > 0) {
                            this.targetMembership = 'monthly';
                            this.stripeHandler.open({
                                name: 'Self Made Man',
                                description: 'Monthly Membership',
                                amount: 1395,
                                email: email,
                                'allow-remember-me': false
                            });
                        } else {
                            this.targetMembership = 'monthly';
                            this.stripeHandler.open({
                                name: 'Self Made Man',
                                description: 'Monthly Membership',
                                amount: 1395,
                                'allow-remember-me': false
                            });
                        }

                    }
                }
            },
            upgradeToAnnual(skip) {

                if (skip) {
                    let _this = this;
                    this.$store.dispatch('updateSpinner', true);
                    User.purchaseAnnualSubscription(this, (err, response) => {
                        this.$store.dispatch('updateSpinner', false);
                        if (err != null) return alert(JSON.stringify(err));
                        _this.$router.go(-1);
                    });
                } else {
                    if (this.user.stripeSubscriptionId != undefined) return alert('You already have an active subscription!');
                    if (this.user.hasCustomerId) { //go ahead and update subscription
                        let _this = this;
                        this.$store.dispatch('updateSpinner', true);
                        User.purchaseAnnualSubscription(this, (err, response) => {
                            this.$store.dispatch('updateSpinner', false);
                            if (err != null) return alert(JSON.stringify(err));
                            _this.$router.go(-1);
                        });
                    } else { //must create it first
                        let email = this.user.email || '';
                        if (email.length > 0) {
                            this.targetMembership = 'annual';
                            this.stripeHandler.open({
                                name: 'Self Made Man',
                                description: 'Annual Membership',
                                amount: 14999,
                                email: email,
                                'allow-remember-me': false
                            });
                        } else {
                            this.targetMembership = 'annual';
                            this.stripeHandler.open({
                                name: 'Self Made Man',
                                description: 'Annual Membership',
                                amount: 14999,
                                'allow-remember-me': false
                            });
                        }

                    }
                }
            }
        }
    }

</script>

<style scoped>
    .flexContainer {
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        align-items: center;
        width: 80%;
        height: 80%;
        border: 2px solid #2d2d2d;
        padding: 2rem;
        background-color: #ffffff;
        flex-wrap: wrap;
    }

    .flex {
        display: flex;
        flex-flow: row;
        width: 100%;
    }

    .container {
        width: 100%;
        height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    .rightColumn {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-around;
        height: 30%;
    }

    .leftColumn {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-around;
        height: 60%;
    }

    .topButton {
        background-color: #ffffff;
        color: #2d2d2d;
        border: 2px solid #2d2d2d;
        width: 20rem;
    }

    .bottomButton {
        width: 20rem;
    }

    .formStyle {
        width: 20rem;
        background-color: #ffffff;
        position: absolute;
        top: 10rem;
        z-index: 1000;
        border: 2px solid #2d2d2d;
        padding: 2rem;
        color: #2d2d2d;
    }
</style>