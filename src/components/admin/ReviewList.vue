<template>

    <div class="row content">

        <!-- LEFT SIDEBAR -->
        <div class="col col--2-of-12 col--push-1-of-12">
            <ul class="list list--nav page__tabs">
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
        <div class="col col--7-of-12">
            <div>
                <div v-for="review in reviews" style="margin-bottom: 25px; background-color: white; padding: 10px; width: auto">
                    <div style="display: inline-flex">
                        <div style="width:auto; padding: 15px">
                            <span class="avatar avatar--xxl" :style="{ 'background-image': 'url(' + user.profileImageUrl + ')' }"></span>
                        </div>
                        <div style="width:auto; background-color: white; margin-left: 25px; padding: 15px;">
                            <div>title: <b>{{ review.course.title }}</b></div>
                            <div>email: <i>{{ review.user.email }}</i></div>
                            <div>rating: <i>{{ ratingText(review) }}</i></div>
                            <div style="padding: 10px 0px 10px 0px">{{ review.body }}</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; padding-bottom: 20px 0px 20px 0px">
                        <button class="btn btn--primary is--affirmative" @click="approveReview(review)">Approve</button>
                        <div style="width: 15px"></div>
                        <button class="btn btn--primary" @click="deleteReview(review)">Delete</button>
                    </div>
                </div>
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