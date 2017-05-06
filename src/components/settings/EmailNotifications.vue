<template lang="html">

    <div class="row">

        <!-- LEFT SIDEBAR -->
        <div class="col col--2-of-12 col--push-1-of-12">
            <ul class="list list--nav page__tabs">
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
                    <router-link class="link is--active" :to="{ name: 'emailnotifications' }">Email Notifications</router-link>
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
        <div class="col col--7-of-12">

            <div class="panel">

                <!-- PANEL HEADER -->
                <div class="panel__head">
                    <div class="wrapper">
                        <div class="wrapper__inner">
                            <h3 class="ts--title">Email Notifications</h3>
                            <p class="ts--body is--secondary">Choose what you’d like to recieve from us in your inbox.</p>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg class="icon-email-settings icon--l color--accent">
                                <use xlink:href="#icon-email-settings"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- /PANEL HEADER -->

                <!-- PANEL BODY -->
                <div class="panel__body">

                    <!-- NEW CONTENT NOTIFICATIONS -->
                    <div class="panel__section">
                        <h4 class="ts--subtitle">Notify me:</h4>
                        <div class="control__group margin--s no--margin-r">
                            <label class="control control__checkbox">
                          <input type="checkbox" name="notifNewClasses" v-model="notifyNewClass">
                          <div class="control__indicator"></div>
                          New classes are released
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" name="notifNewPodcasts" v-model="notifyNewPodcast">
                          <div class="control__indicator"></div>
                          New podcast episodes are available
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" name="notifNewAnnouncements" v-model="notifyAnouncement">
                          <div class="control__indicator"></div>
                          Announcements/upcoming events
                      </label>
                        </div>
                    </div>
                    <!-- /NEW CONTENT NOTIFICATIONS -->

                    <!-- FOLLOWED TOPICS -->
                    <div class="panel__section">
                        <h4 class="ts--subtitle">Followed Topics</h4>
                        <p class="ts--body is--secondary">Notify me when new classes are released for my followed topics:</p>
                        <div class="control__group margin--s no--margin-r">
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Mindset" value="Mindset" name="followedMindset" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Mindset
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Productivity" value="Productivity" name="followedProductivity" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Productivity
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Entrepreneurship" value="Entrepreneurship" name="followedEntreneurship" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Entrepreneurship
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Money" value="Money" name="followedMoney" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Money
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Giving" value="Giving" name="followedGiving" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Giving
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Fitness" value="Health & Fitness" name="followedHealthFitness" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Health &amp; Fitness
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Defense" value="Defense" name="followedDefense" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Defense
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Lifestyle" value="Lifestyle" name="followedLifestyle" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Lifestyle
                      </label>
                            <label class="control control__checkbox">
                          <input type="checkbox" id="Relationships" value="Relationships" name="followedRelationships" v-model="selectedTopics">
                          <div class="control__indicator"></div>
                          Relationships
                      </label>
                        </div>
                    </div>
                    <!-- /FOLLOWED TOPICS -->

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
        data: function () {
            return {
                selectedTopics: [],
                notifyNewClass: false,
                notifyNewPodcast: false,
                notifyAnouncement: false
            }
        },
        beforeDestroy() {
            let payload = {
                topics: this.selectedTopics
            }
            this.updateUser(payload);
        },
        created() {
            this.selectedTopics = this.user.followedTopics;
            this.notifyNewClass = this.user.notifyNewClass;
            this.notifyNewPodcast = this.user.notifyNewPodcast;
            this.notifyAnouncement = this.user.notifyAnouncement;
        },
        computed: {
            ...mapGetters([
                'user'
            ]),
            hasFacebook() {
                if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
                return true;
            },
            updatePayload() {
                return {
                    followedTopics: this.selectedTopics,
                    notifyNewClass: this.notifyNewClass,
                    notifyNewPodcast: this.notifyNewPodcast,
                    notifyAnouncement: this.notifyAnouncement
                }
            }
        },
        methods: {
            updateUser(payload) {
                let _this = this;
                User.updateUser(_this, this.updatePayload);
            }
        }
    }

</script>

<style lang="css">

</style>