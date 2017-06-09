<template>
    <!-- CLASSES - COMPLETE -->
    <div class="content__row">

        <h2 class="ts--title is--title has--badge is--tertiary" :data-badge="completedClasses.length">Complete</h2>

        <div class="row grid">

            <!-- SINGLE CLASS -->
            <div v-for="course in completedClasses" class="class">
                <a class="class__thumb" @click="updateCurrentClass(course)">
                    <img :src="course.thumbImageUrl" alt="">
                    <span class="btn__play btn--s btn--secondary"></span>
                </a>
                <div class="class__info">
                    <a class="link" href="#">{{ course.title }}</a>
                    <ul class="class__meta list list--inline">
                        <li class="item has--icon">
                            <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + course.instructor.profileImage + ')' }"></span>                            {{ course.instructor.name }}
                        </li>
                        <!-- <li class="item has--icon" style="float:right;">
                            <svg class="icon-thumbs-up-fill">
                                <use xlink:href="#icon-thumbs-up-fill"></use>
                            </svg>
                            Rated
                        </li> -->
                    </ul>
                </div>
            </div>
            <!-- /SINGLE CLASS -->

        </div>

    </div>
    <!-- /CLASSES - COMPLETE -->

</template>

<script>
    import { Class, User } from '../../../api';
    import { mapGetters } from 'vuex';
    import { convertSecondsToReadableFormat } from '../../../helpers/util';

    export default {

        data: function () {
            return {
                toggle: {}
            }
        },
        computed: {
            ...mapGetters([
                'user', 'completedClasses', 'userLoggedIn'
            ]),
            updatedCompletedClasses() {
                return this.completedClasses;
            }
        },
        methods: {
            courseReviewCount(course) {
                if (course.positiveReviewCount == null) {
                    return "No reviews yet.";
                } else {
                    return `${course.positiveReviewCount}`;
                }
            },
            readableCourseDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            },
            updateCurrentClass(course) {
                this.$store.dispatch('updateCompletedClasses', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
        }

    }

</script>

<style>

</style>
