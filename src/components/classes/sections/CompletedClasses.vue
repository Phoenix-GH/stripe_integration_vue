<template>
  <!-- CLASSES - COMPLETE -->
<div class="content__row">

    <h2 class="ts--title is--title has--badge is--tertiary" data-badge="4">Complete</h2>

    <Slick class="carousel" ref="slick" :options="slickOptions">

        <!-- SINGLE CLASS -->
        <div class="class">
            <a class="class__thumb" href="/templates/classes/class">
                <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-3.png" alt="">
                <span class="btn__play btn--s btn--secondary"></span>
            </a>
            <div class="class__info">
                <a class="link" href="#">How to Grow Your Brand and Live Your Dream</a>
                <ul class="class__meta list list--inline">
                    <li class="item has--icon">
                        <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-lewis.jpg');"></span>
                        Lewis Howes
                    </li>
                    <li class="item has--icon" style="float:right;">
                        <svg class="icon-thumbs-up-fill"><use xlink:href="#icon-thumbs-up-fill"></use></svg>
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
        Slick
    }

  }

</script>

<style>
  
</style>