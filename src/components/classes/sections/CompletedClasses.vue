<template>
    <!-- CLASSES - COMPLETE -->
    <div class="content__row">

        <h2 class="ts--title is--title has--badge is--tertiary" :data-badge="completedClasses.length">Complete</h2>

        <Slick class="carousel" ref="slick" :options="slickOptions">

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
                        <li class="item has--icon" style="float:right;">
                            <svg class="icon-thumbs-up-fill">
                                <use xlink:href="#icon-thumbs-up-fill"></use>
                            </svg>
                            Rated
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /SINGLE CLASS -->

        </Slick>

    </div>
    <!-- /CLASSES - COMPLETE -->

</template>

<script>
    import Slick from 'vue-slick';
    import { Class, User } from '../../../api';
    import { mapGetters } from 'vuex';
    import { convertSecondsToReadableFormat } from '../../../helpers/util';

    export default {

        data: function () {
            return {
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
        components: {
            Slick
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
            readableCourseDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            },
            updateCurrentClass(course) {
                this.$store.dispatch('updateCompletedClasses', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
        },
        created() {
            console.log('created this');
            Class.completed(this);
        }

    }

</script>

<style>

</style>