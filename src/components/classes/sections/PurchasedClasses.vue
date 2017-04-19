<template>
    <!-- CLASSES - PURCHASED MASTERCLASSES -->
    <div class="content__row">
        <h2 class="ts--title is--title has--badge is--tertiary" data-badge="3">Masterclasses</h2>

        <div class="row grid">

            <!-- SINGLE CLASS -->
            <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                <a class="class__thumb" href="/templates/classes/masterclass">
                    <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-3.png" alt="">
                    <span class="btn__play btn--s btn--secondary"></span>
                    <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                </a>
                <div class="class__info">
                    <a class="link" href="#">How to Grow Your Brand and Live Your Dream</a>
                    <ul class="class__meta list list--inline">
                        <li class="item has--icon">
                            <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-lewis.jpg');"></span>                            Lewis Howes
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /SINGLE CLASS -->

        </div>
    </div>
    <!-- /CLASSES - PURCHASED MASTERCLASSES -->

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