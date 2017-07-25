<template>
    <!-- CLASSES - IN PROGRESS -->
    <div class="content__row">

        <h2 v-if="classesInProgress.length > 0" class="ts--title is--title has--badge is--tertiary" :data-badge="classesInProgress.length">In Progress</h2>

        <div class="row grid">

            <div class="class col col--6-of-12 col--m-2-of-3 col--s-2-of-2">
                <ul class="challenge__box list list--nav list--dropdown">
                    <li class="item">
                        <svg class="icon-trophy icon--l color--brand"><use xlink:href="#icon-trophy"></use></svg>
                        <div class="ts--title is--secondary">
                            Quick-Start Challenge:
                        </div>
                        <div class="ts--headline">
                            Complete 3 Lessons
                        </div>
                    </li>
                    <li class="item item--bottom">
                        <ul class="list list--progress">
                            <li class="is--complete" style="background-image:url('https://images.contentful.com/neuh3uvg7bz8/1re746Kr3e6UgEKSqkWUWo/4dcb1cff3d920e24c405402ac204ebbd/vanessa-thumb.jpg')" data-step="1"></li>
                            <li data-step="2"></li>
                            <li data-step="3"></li>
                        </ul>
                    </li>
                    <li class="challenge__explainer">
                        <a class="link">Details</a>
                    </li>
                </ul>
            </div>

            <!-- SINGLE CLASS -->
            <div v-for="course in classesInProgress" class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2" data-progress="0">
                <a class="class__thumb" @click="updateCurrentClass(course)">

                    <div class="progress progress--s show--count">
                        <svg data-progress="1" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                            <circle cx="16" cy="16" r="14" class="progress__bg" />
                            <circle cx="16" cy="16" r="14" class="progress__bar" :style="offset(course)" />
                        </svg>
                    </div>

                    <img :src="course.thumbImageUrl" alt="">
                    <span class="btn__play btn--s btn--secondary"></span>
                    <span class="image__cap"><svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>{{ readableCourseDuration(course.duration) }}</span>
                </a>
                <div class="class__info">
                    <a class="link" href="#">{{ course.title }}</a>
                    <ul class="class__meta list list--inline">
                        <li class="item has--icon">
                            <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + course.instructor.profileImage + ')' }"></span>{{
                            course.instructor.name }}
                        </li>
                        <li class="item has--icon">
                            <svg class="icon-thumbs-up">
                                <use xlink:href="#icon-thumbs-up"></use>
                            </svg>
                            <a class="link link--secondary">{{ courseReviewCount(course) }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /SINGLE CLASS -->

        </div>

    </div>
    <!-- /CLASSES - IN PROGRESS -->


</template>

<script>
    import { Class, User } from '../../../api';
    import { mapGetters } from 'vuex';
    import { convertSecondsToReadableFormat } from '../../../helpers/util';

    export default {
        computed: {
            ...mapGetters([
                'user', 'classesInProgress', 'userLoggedIn'
            ]),
            updatedClassesInProgress() {
                return this.classesInProgress;
            }

        },
        methods: {
            offset(course) {
                let offset = 100 - course.progress;
                return { 'stroke-dashoffset': offset };
            },
            courseReviewCount(course) {
                let rating = (course.positiveReviewCount / course.reviewCount) * 100;
                if (course.reviewCount == null) {
                    return "No reviews yet.";
                } else {
                    return `${rating}%`;
                }
            },
            readableCourseDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            },
            updateCurrentClass(course) {
                console.log(course);
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
            thumbnail(url) {
                return `${url}?w=388&h=193`;
            }
        }
    }

</script>

<style>

</style>
