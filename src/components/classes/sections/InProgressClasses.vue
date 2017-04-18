<template>
    <!-- CLASSES - IN PROGRESS -->
    <div class="content__row">

        <h2 class="ts--title is--title has--badge is--tertiary" :data-badge="classesInProgress.length">In Progress</h2>

        <slick class="carousel" ref="slick" :options="slickOptions">

            <!-- SINGLE CLASS -->
            <div v-for="course in classesInProgress" class="class" data-progress="0">
                <a class="class__thumb" @click="updateCurrentClass(course)">
                    <!-- TODO: Need to add progress circles to already started courses. The percent/100 should be appended to the 'data-progress' attribute -->
                    <img :src="course.thumbImageUrl" alt="">
                    <span class="btn__play btn--s btn--secondary"></span>
                    <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    {{ readableCourseDuration(course.duration) }}
                </span>
                </a>
                <div class="class__info">
                    <a class="link" href="#">{{ course.title }}</a>
                    <ul class="class__meta list list--inline">
                        <li class="item has--icon">
                            <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + course.instructor.profileImage + ')' }"></span>                            {{course.instructor.name}}
                        </li>
                        <li class="item has--icon">
                            <svg class="icon-thumbs-up">
                                <use xlink:href="#icon-thumbs-up"></use>
                            </svg>
                            <a class="link link--secondary" href="#">1.2k</a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /SINGLE CLASS -->

        </slick>

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
        },
        created() {
            console.log('created this');
            Class.inProgress(this);
        }
    }

</script>

<style>

</style>