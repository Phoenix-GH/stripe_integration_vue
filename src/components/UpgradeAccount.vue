<template>
    <div class="content__section row container container--fw container--s">
        <div class="flexContainer">
            <div class="leftColumn">
                <h1>Upgrade to Premium!</h1>
                <br>
                <div class="flex">
                    <svg class="icon-check-circle">
                        <use xlink:href="#icon-check-circle" />
                    </svg>
                    <p> Unlimited on-demand access </p>
                </div>
                <div class="flex">
                    <svg class="icon-check-circle">
                        <use xlink:href="#icon-check-circle" />
                    </svg>
                    <p> One new video lesson per month </p>
                </div>
                <div class="flex">
                    <svg class="icon-check-circle">
                        <use xlink:href="#icon-check-circle" />
                    </svg>
                    <p> Exclusive Mastery Course discounts </p>
                </div>
                <div class="flex">
                    <svg class="icon-check-circle">
                        <use xlink:href="#icon-check-circle" />
                    </svg>
                    <p> Live webcast shows and Q&A </p>
                </div>
                <div class="flex">
                    <svg class="icon-check-circle">
                        <use xlink:href="#icon-check-circle" />
                    </svg>
                    <p> Invite-only annual events & adventures </p>
                </div>
            </div>
            <div class="rightColumn">
                <button @click="upgradeToMonthly(false)" class="btn btn--primary topButton">$13.95/Month</button>
                <br>
                <p> -or- </p>
                <br>
                <button @click="upgradeToAnnual(false)" class="btn btn--primary bottomButton">$149.99/Year (Best Deal!)</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { User } from '../api';
    import { mapGetters } from 'vuex';

    export default {
        mounted() {
            let _this = this;
            this.stripeHandler = StripeCheckout.configure({
                key: 'pk_test_hz7Ftxjb7anZasP8PFtcFwQv',
                image: '',
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
                this.stripeHandler.close();
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
            upgradeToMonthly(skip) {
                if (skip) {
                    let _this = this;
                    User.purchaseMonthlySubscription(this, (err, response) => {
                        if (err != null) return alert(JSON.stringify(err));
                        _this.$router.push({ name: 'account' })
                    });
                } else {
                    if (this.user.stripeSubscriptionId != undefined) return alert('You already have an active subscription!');
                    if (this.user.hasCustomerId) { //go ahead and update subscription
                        let _this = this;
                        User.purchaseMonthlySubscription(this, (err, response) => {
                            if (err != null) return alert(JSON.stringify(err));
                            _this.$router.push({ name: 'account' })
                        });
                    } else { //must create it first
                        this.targetMembership = 'monthly';
                        this.stripeHandler.open({
                            name: 'Self Made Man',
                            description: 'Monthly Membership',
                            amount: 1395
                        });
                    }
                }
            },
            upgradeToAnnual(skip) {
                if (skip) {
                    let _this = this;
                    User.purchaseAnnualSubscription(this, (err, response) => {
                        if (err != null) return alert(JSON.stringify(err));
                        _this.$router.push({ name: 'account' })
                    });
                } else {
                    if (this.user.stripeSubscriptionId != undefined) return alert('You already have an active subscription!');
                    if (this.user.hasCustomerId) { //go ahead and update subscription
                        let _this = this;
                        User.purchaseAnnualSubscription(this, (err, response) => {
                            if (err != null) return alert(JSON.stringify(err));
                            _this.$router.push({ name: 'account' })
                        });
                    } else { //must create it first
                        this.targetMembership = 'annual';
                        this.stripeHandler.open({
                            name: 'Self Made Man',
                            description: 'Annual Membership',
                            amount: 14999
                        });
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