<template>
<!-- CLASSES - PURCHASED MASTERCLASSES -->
<div class="content__row">
    <h2 class="ts--title is--title has--badge is--tertiary" data-badge="3">Masterclasses</h2>

    <slick class="carousel" ref="slick" :options="slickOptions">

        <!-- SINGLE CLASS -->
        <div class="class" data-progress="0">
            <a class="class__thumb" href="/templates/classes/masterclass">
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
                        <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-daymond.jpg');"></span>
                        Daymond John
                    </li>
                </ul>
            </div>
        </div>
        <!-- /SINGLE CLASS -->

        <!-- SINGLE CLASS -->
        <div class="class">
            <a class="class__thumb" href="/templates/classes/masterclass">
                <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-2.png" alt="">
                <span class="btn__play btn--s btn--secondary"></span>
                <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
            </a>
            <div class="class__info">
                <a class="link" href="#">How to Attract One Million Fans While Raising Four Kids</a>
                <ul class="class__meta list list--inline">
                    <li class="item has--icon">
                        <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-rachel.jpg');"></span>
                        Rachel Maser
                    </li>
                </ul>
            </div>
        </div>
        <!-- /SINGLE CLASS -->

        <!-- SINGLE CLASS -->
        <div class="class">
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
                        <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-lewis.jpg');"></span>
                        Lewis Howes
                    </li>
                </ul>
            </div>
        </div>
        <!-- /SINGLE CLASS -->

    </slick>
</div>
<!-- /CLASSES - PURCHASED MASTERCLASSES -->

</template>

<script>
  
  import Slick from 'vue-slick';

  export default {
    data: function() {
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