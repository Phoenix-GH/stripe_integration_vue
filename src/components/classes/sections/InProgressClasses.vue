<template>
    <!-- CLASSES - IN PROGRESS -->
    <div class="content__row">

        <h2 class="ts--title is--title has--badge is--tertiary" :data-badge="classesInProgress.length">In Progress</h2>

        <div class="row grid">

            <!-- SINGLE CLASS -->
            <div v-for="course in classesInProgress" class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2" data-progress="0">
                <a class="class__thumb" @click="updateCurrentClass(course)">
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
                            <a class="link link--secondary">{{ course.positiveReviewCount }}</a>
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
    import Slick from 'vue-slick';
    import { Class, User } from '../../../api';
    import { mapGetters } from 'vuex';
    import { convertSecondsToReadableFormat } from '../../../helpers/util';

    export default {
        data: function () {
            return {
                dummyImage: "https://images.contentful.com/neuh3uvg7bz8/B0MsoNowSswcmQ40OAWQO/5bcb769cfb465c345b98a86a5427cbfe/XMENDOFP1.png",
                slickOptions: {
                    lazyLoad: 'ondemand',
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                },
            }
        },
        computed: {
            ...mapGetters([
                'user', 'classesInProgress', 'userLoggedIn'
            ]),
            updatedClassesInProgress() {
                return this.classesInProgress;
            }

        },
        components: {
            slick: Slick
        },
        methods: {
            readableCourseDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            },
            updateCurrentClass(course) {
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
            thumbnail(url) {
                return `${url}?w=388&h=193`;
            }
        },
        created() {
            console.log('created this');

        },
        mounted() {
            Class.inProgress(this);
        }
    }

</script>

<style>

</style>