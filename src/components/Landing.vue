<template>

    <div>

        <!-- BANNER -->
        <div class="banner bg--black bg--wood">
            <div class="banner__content container container--fw container--l is--reversed">
                <div class="row">
                    <div class="col col--7-of-12 col--am col--m-2-of-2">
                        <h1 class="ts--display">Welcome back, {{ user.firstName }}</h1>
                        <p class="ts--title is--secondary">What will you learn today?</p>

                        <div class="divider divider--s"></div>

                        <ul class="list list--inline list--buttons list--tight" style="max-width:600px;">
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Mindset
                          </button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Productivity
                          </button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Entrepreneurship
                          </button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Money
                          </button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Giving
                          </button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Health &amp; Fitness
                          </button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Defense
                          </button>
                            </li>
                            <li class="item">
                                <button class="btn btn--secondary is--reversed">
                              Relationships
                          </button>
                            </li>
                        </ul>
                    </div>

                    <!-- CONTINUE WATCHING -->
                    <div class="col col--4-of-12 col--push-1-of-12 col--am col--m-2-of-2">
                        <!--
                      NOTE: This div should always be here, even if empty.
                  -->
                        <div v-if="lastLessonExists" class="well no--pad no--border margin--s no--margin-lr no--margin-t">
                            <span class="ts--title">Continue Watching:</span>
                        </div>
                        <!-- SINGLE CLASS -->
                        <div v-if="lastLessonExists" class="class is--bookmarked" @click.stop="updateCurrentClass(lastLesson.course)">
                            <a class="class__thumb">
                                <span class="btn__play btn--m btn--secondary"></span>
                                <img :src="activeCourse.thumbImageUrl" alt="">
                                <div class="class__title">
                                    <span class="ts--subtitle">{{ lastLesson.course.title }}</span>
                                    <span class="ts--headline truncate">{{ lastLesson.lesson.title }}</span>
                                </div>
                                <span class="image__cap">
                              <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                              {{ leftOffMessage }}
                          </span>
                                <span class="remove__link">
                              <ul class="list list--inline">
                                  <li @click.stop="startLastLessonOver" class="item">
                                      <span class="link link--secondary">
                                          <svg class="icon-restart icon--s"><use xlink:href="#icon-restart"></use></svg>
                                          Start Over
                                      </span>
                                </li>
                                <li @click.stop="openLastLesson" class="item">
                                    <span class="link link--secondary">
                                          <svg class="icon-bookmark icon--s"><use xlink:href="#icon-bookmark"></use></svg>
                                          Where I Left Off ({{ readableCourseDuration(lastLesson.progress.lastPosition) }})
                                      </span>
                                </li>
                                </ul>
                                </span>
                            </a>
                        </div>
                        <!-- /SINGLE CLASS -->
                    </div>
                    <!-- /CONTINUE WATCHING -->
                </div>
            </div>
        </div>
        <!-- /BANNER -->

        <!-- CLASS LIST -->
        <div class="content__section row container container--fw">
            <inprogress />
            <purchased v-if="false" />
            <recommended v-if="false" />
            <!-- FEATURED CLASS -->
            <div v-if="featuredClasses.length > 0" class="content__row">
                <div class="banner banner--m go go--bottom is--inline" :style="{ 'background-image': 'url(' + validBannerImage + ')' }">
                    <div class="banner__content is--reversed">
                        <div class="wrapper">
                            <div class="banner__text wrapper__inner width--60 align--bottom">
                                <a id="mobilePlay" class="btn__play" href="javascript:;" @click="updateCurrentClass(updateFeaturedClass)">Watch</a>
                                <span class="banner__featured ts--title is--secondary">Featured in &mdash; {{ topicList }}</span>
                                <span class="banner__title ts--display" @click="updateCurrentClass(updateFeaturedClass)">{{ updateFeaturedClass.title }}</span>
                                <div class="divider divider--s"></div>
                                <ul class="list list--inline list--divided list--box">
                                    <li class="item has--icon">
                                        <span class="avatar avatar--m" :style="{ 'background-image': 'url(' + updateFeaturedClass.instructor.profileImage + ')' }"></span>
                                        <a @click="updateCurrentClassToInstructor(updateFeaturedClass)" class="link link--secondary" href="javascript:;">{{ updateFeaturedClass.instructor.name }}</a>
                                    </li>
                                    <li class="item has--icon">
                                        <svg class="icon-thumbs-up color--white">
                                            <use xlink:href="#icon-thumbs-up"></use>
                                        </svg>
                                        <a class="link link--secondary" href="javascript:;">{{ updateFeaturedClass.positiveReviewCount }}</a>
                                    </li>
                                    <li class="item has--icon color--white">
                                        <svg class="icon-users color--white">
                                            <use xlink:href="#icon-users"></use>
                                        </svg>
                                        {{ updateFeaturedClass.studentCount }}
                                    </li>
                                </ul>
                            </div>
                            <div class="banner__play wrapper__inner align--right align--bottom">
                                <a @click="updateCurrentClass(updateFeaturedClass)" class="btn__play btn--l" href="javascript:;">Watch</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /FEATURED CLASS -->
        </div>
        <!-- /CLASS LIST -->

    </div>

</template>

<script>
    import Rec from '../components/classes/sections/RecommendedClasses.vue'
    import PurchasedClasses from '../components/classes/sections/PurchasedClasses.vue'
    import InProgress from '../components/classes/sections/InProgressClasses.vue'
    import { User, Class } from '../api';
    import { mapGetters } from 'vuex';
    import { convertSecondsToReadableFormat } from '../helpers/util';

    export default {
        data: function () {
            return {
                lastLessonExists: false
            }
        },
        components: {
            recommended: Rec,
            inprogress: InProgress,
            purchased: PurchasedClasses
        },
        computed: {
            ...mapGetters([
                'user', 'featuredClasses', 'activeCourse', 'lastLesson'
            ]),
            updateFeaturedClass() {
                if (this.featuredClasses.length > 0) {
                    return this.featuredClasses[0];
                }
            },
            validBannerImage() {
                if (this.featuredClasses.length > 0) {
                    let fclass = this.featuredClasses[0];
                    if (fclass.bannerImageUrl != undefined) {
                        return fclass.bannerImageUrl;
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            topicList() {
                if (this.featuredClasses.length > 0) {
                    let course = this.featuredClasses[0];
                    let str = course.topics.join(" ");
                    return str;
                }
            },
            leftOffMessage() {
                if (this.lastLesson.lesson != undefined) {
                    if (this.lastLesson.progress.percentComplete == 100) {
                        return 'Complete';
                    } else {
                        let durationDifference = this.readableCourseDuration(this.lastLesson.lesson.duration - this.lastLesson.progress.lastPosition);
                        return `${durationDifference} Left`;
                    }
                } else {
                    return '';
                }
            }
        },
        methods: {
            openLastLesson() {
                let course = this.lastLesson.course;
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id }, query: { action: 'last' } });
            },
            startLastLessonOver() {
                let course = this.lastLesson.course;
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id }, query: { action: 'new' } });
            },
            updateCurrentClass(course) {
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
            updateCurrentClassToInstructor(course) {
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id }, query: { action: "instructor" } });
            },
            readableCourseDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            }
        },
        mounted() {
            Class.featuredClasses(this);
            Class.inProgress(this);
            Class.completed(this);
            if (this.lastLesson.course != undefined) {
                this.lastLessonExists = true;
            }
        }

    }

</script>

<style>

</style>
