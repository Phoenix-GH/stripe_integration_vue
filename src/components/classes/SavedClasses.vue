<template>
<div>

<!-- BANNER -->
<div class="banner bg--black bg--wood">
    <div class="banner__content container container--fw is--reversed">
        <div class="wrapper">
            <div class="wrapper__inner">
                <h1 class="ts--headline">Saved for Later</h1>
                <p class="ts--title is--secondary">View a list of all the classes you’ve saved to take later</p>
            </div>
            <!-- BROWSE CLASSES -->
            <!-- NOTE: This button is only displayed if the user is enrolled in classes -->
            <div class="wrapper__inner align--right">
                <button class="btn btn--cta">Browse Classes</button>
            </div>
            <!-- /BROWSE CLASSES -->
        </div>
    </div>
</div>
<!-- /BANNER -->

<!-- CLASS LIST -->
<div class="content__section container container--fw">

    <!-- EMPTY STATE -->
    <!--
        NOTE: Display only if the user hasn't saved any classes.
    -->
    <div class="well is--empty align--center padding--xxl border--medium">
        <span class="ts--title">You haven't saved any classes yet!</span>
        <div class="divider divider--s" style="margin-left:auto; margin-right:auto;"></div>
        <button class="btn btn--cta" data-target="/templates/classes">Browse Classes</button>
    </div>
    <!-- /EMPTY STATE -->

    <!-- CLASSES - IN PROGRESS -->
    <div class="carousel">

        <!-- SINGLE CLASS -->
        <div class="class" data-progress="0">
            <a class="class__thumb" href="/templates/classes/class">
                <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-1.png" alt="">
                <span class="btn__play btn--s btn--secondary"></span>
                <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                <span class="remove__link link link--secondary">Remove</span>
            </a>
            <div class="class__info">
                <a class="link" href="#">The Power of Being Broke</a>
                <ul class="class__meta list list--inline">
                    <li class="item has--icon">
                        <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-daymond.jpg');"></span>
                        Daymond John
                    </li>
                    <li class="item has--icon">
                        <svg class="icon-thumbs-up"><use xlink:href="#icon-thumbs-up"></use></svg>
                        <a class="link link--secondary" href="#">1.2k</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- /SINGLE CLASS -->

    </div>
    <!-- /CLASSES - IN PROGRESS -->

</div>
<!-- /CLASS LIST -->

</div>
</template>

<script>

  export default {
    data: function() {
      return {
        savedClasses: []
      }
    },
    beforeCreate(){
    document.body.classList.add("has--banner");
    },
    beforeDestroy(){
      document.body.classList.remove("has--banner");
    }
  }

</script>

<style>

</style>
