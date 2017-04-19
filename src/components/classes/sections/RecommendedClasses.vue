<template>
    <!-- RECOMMENDED CLASSES -->
    <div>
        <div class="content__row">
            <h2 class="ts--title is--title">Recommended for you</h2>
            <div class="row grid">
                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2" data-progress="0">
                    <a class="class__thumb" href="/templates/classes/class">
                        <!-- TODO: Need to add progress circles to already started courses. The percent/100 should be appended to the 'data-progress' attribute -->
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-1.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">The Power of Being Broke</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-daymond.jpg');"></span>                                Daymond John
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
            </div>
        </div>
        <!-- /RECOMMENDED CLASSES -->
        <!--<div class="divider divider--s align--center margin--xxxl"></div>-->
    </div>

</template>

<script>
    import Slick from 'vue-slick';

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
            slick: Slick
        }
    }

</script>

<style>

</style>