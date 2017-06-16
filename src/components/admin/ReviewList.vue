<template>

    <div class="container container--fw container--s layout--1-4 cf">

        <!-- LEFT SIDEBAR -->
        <div class="layout__col">
            <ul class="list list--nav page__tabs hide--m">
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
                    <router-link class="link" :to="{ name: 'referrals' }">Referrals</router-link>
                </li>
                <li class="item" v-if="user.role == 2">
                    <router-link class="link is--active" :to="{ name: 'reviews' }">Reviews</router-link>
                </li>
                <li class="item" v-if="user.role == 2">
                    <router-link class="link" :to="{ name: 'students' }">Students</router-link>
                </li>

            </ul>
        </div>
        <!-- /LEFT SIDEBAR -->

        <!-- SETTINGS PANEL -->
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
                        <router-link class="link" :to="{ name: 'referrals' }">Referrals</router-link>
                    </li>
                    <li class="item" v-if="user.role == 2">
                        <router-link class="link is--active" :to="{ name: 'reviews' }">Reviews</router-link>
                    </li>
                    <li class="item" v-if="user.role == 2">
                        <router-link class="link" :to="{ name: 'students' }">Students</router-link>
                    </li>
                </ul>
            </div>
            <!-- /MOBILE NAV -->

            <div>

                <!-- SINGLE -->
                <div v-for="review in reviews" class="well wrapper bg--white margin--s no--margin-lr">
                    <div class="wrapper__inner">
                        <div class="ts--subtitle">
                            {{ review.course.title }}
                        </div>
                        <ul class="list list--inline">
                            <li class="item has--icon">
                                <svg v-if="ratingText(review) == 'positive'" class="icon-thumbs-up-fill icon--s color--accent"><use xlink:href="#icon-thumbs-up-fill"></use></svg>
                                <svg v-if="ratingText(review) == 'negative'" class="icon-thumbs-down-fill icon--s color--negative"><use xlink:href="#icon-thumbs-down-fill"></use></svg>
                                {{ user.firstName }} {{ user.lastName }} (<i>{{ user.email }}</i>)
                            </li>
                        </ul>
                        <div class="well bg--snow padding--s margin--s no--margin-lr no--margin-b">{{ review.body }}</div>
                    </div>
                    <div class="wrapper__inner align--right" style="min-width:260px; width:30%;">
                        <ul class="list list--inline list--tight">
                            <li class="item">
                                <button class="btn btn--secondary is--affirmative" @click="approveReview(review)">Approve</button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--warning" @click="deleteReview(review)">Delete</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE-->

            </div>
        </div>
        <!-- /SETTINGS PANEL -->

    </div>

</template>

<script>
    import { Class, User } from '../../api';
    import { mapGetters } from 'vuex';
    import { eventBus } from '../../main';

    export default {
        data: function () {
            return {
                reviews: []
            }
        },
        computed: {
            ...mapGetters([
                'user', 'userLoggedIn'
            ]),
            hasFacebook() {
                if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
                return true;
            }
        },
        methods: {
            deleteReview(review) {
                console.log(JSON.stringify(review));
                let _this = this;
                User.deleteReview(this, review._id, response => {
                    _this.updateList();
                })
            },
            approveReview(review) {
                console.log(JSON.stringify(review));
                let _this = this;
                User.approveReview(this, review._id, response => {
                    _this.updateList();
                })
            },
            ratingText(review) {
                return review.rating == 1 ? 'positive' : 'negative';
            },
            updateList() {
                let _this = this;
                User.reviewList(this, (data) => {
                    _this.reviews = data;
                });
            }
        },
        created() {
            this.updateList();
        }
    }

</script>

<style>

</style>
