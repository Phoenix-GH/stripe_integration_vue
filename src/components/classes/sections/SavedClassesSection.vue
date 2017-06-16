<template>
    <!-- CLASSES - IN PROGRESS -->
    <div class="content__row">

        <h2 v-if="savedClasses.length > 0" class="ts--title is--title has--badge is--tertiary" :data-badge="savedClasses.length">Saved Classes</h2>

        <div class="row grid">

            <!-- SINGLE CLASS -->
            <div v-for="course in savedClasses" class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2" data-progress="0">
                <a class="class__thumb" @click="updateCurrentClass(course)">
                    <img :src="course.thumbImageUrl" alt="">
                    <span class="btn__play btn--s btn--secondary"></span>
                    <span class="image__cap"><svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>{{ readableCourseDuration(course.duration) }}</span>
                    <span @click.stop="removeClass(course)" class="remove__link link link--secondary">Remove</span>
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
                'user', 'savedClasses', 'userLoggedIn'
            ]),
            updatedSavedClasses() {
                return this.savedClasses;
            }

        },
        methods: {
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
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
            thumbnail(url) {
                return `${url}?w=388&h=193`;
            },
            removeClass(course) {
                Class.removeSavedForLater(this, course._id);
            }
        }
    }

</script>

<style>

</style>