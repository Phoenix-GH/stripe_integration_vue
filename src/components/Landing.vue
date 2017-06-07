<template>

    <div>

        <!-- BANNER (BASIC) -->
        <div class="banner bg--positive jagged jagged jagged--fog" v-if="!lastLessonExists">
            <div class="banner__content container container--fw is--reversed">
                <div class="wrapper">
                    <div class="wrapper__inner">
                        <h1 class="ts--display">Welcome back, {{ user.firstName }}</h1>
                        <p class="ts--title is--secondary">What will you learn today?</p>
                    </div>
                    <div class="wrapper__inner align--right">
                        <button class="btn btn--cta is--reversed">Browse Classes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /BANNER (BASIC) -->

        <!-- BANNER (CONTINUE) -->
        <div class="banner banner--m bg--silver go go--bottom jagged jagged--fog" :style="{ 'background-image': 'url(' + activeCourse.bannerImageUrl + ')' }" v-if="lastLessonExists">
            <div class="banner__content container container--fw is--reversed">
                <div class="wrapper">
                    <div class="wrapper__inner">
                        <a id="mobilePlay" class="btn__play" href="javascript:;" @click="updateCurrentClass(updateFeaturedClass)">Watch</a>
                        <span class="ts--display truncate">{{ lastLesson.lesson.title }}</span>
                        <span class="ts--title is--secondary">{{ lastLesson.course.title }} ({{ leftOffMessage }})</span>
                        <div class="divider divider--s"></div>
                        <ul class="list list--inline">
                            <li class="item">
                                <button class="btn btn--secondary is--reversed" @click.stop="startLastLessonOver">
                                    <svg class="icon-restart icon--s color--white"><use xlink:href="#icon-restart"></use></svg>
                                    Start Over
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="banner__play wrapper__inner align--center">
                        <a @click.stop="openLastLesson" class="btn__play btn--l" href="javascript:;">Watch</a>
                        <br><br>
                        <span class="ts--title">Continue Watching</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- /BANNER (CONTINUE) -->

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
