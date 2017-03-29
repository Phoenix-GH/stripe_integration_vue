<template>

<div>

  <!-- BANNER -->
  <div class="banner bg--black bg--wood">
      <div class="banner__content container container--fw container--l is--reversed">
          <div class="row">
              <div class="col col--7-of-12 col--am col--m-2-of-2">
                  <h1 class="ts--display">Welcome back, Steve</h1>
                  <p class="ts--title is--secondary">What will you learn today?</p>

                  <div class="divider divider--s"></div>

                  <ul class="list list--inline list--buttons list--tight" style="max-width:600px;">
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Mindset
                          </button>
                      </li>
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Productivity
                          </button>
                      </li>
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Entrepreneurship
                          </button>
                      </li>
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Money
                          </button>
                      </li>
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Giving
                          </button>
                      </li>
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Health &amp; Fitness
                          </button>
                      </li>
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Defense
                          </button>
                      </li>
                      <li class="item">
                          <button class="btn btn--secondary is--reversed">
                              Relationships
                          </button>
                      </li>
                  </ul>
              </div>

              <!-- CONTINUE WATCHING -->
              <div class="col col--4-of-12 col--push-1-of-12 col--am col--m-2-of-2">
                  <!--
                      NOTE: This div should always be here, even if empty.
                  -->
                  <div class="well no--pad no--border margin--s no--margin-lr no--margin-t">
                      <span class="ts--title">Continue Watching:</span>
                  </div>
                  <!-- SINGLE CLASS -->
                  <div class="class is--bookmarked">
                      <a class="class__thumb" href="/templates/classes/class">
                          <span class="btn__play btn--m btn--secondary"></span>
                          <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-1.png" alt="">
                          <div class="class__title">
                              <span class="ts--subtitle">The Power of Being Broke</span>
                              <span class="ts--headline truncate">Lesson 4 – Lorem Ipsum Dolor Sit Amet Another Word</span>
                          </div>
                          <span class="image__cap">
                              <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                              16m Left
                          </span>
                          <span class="remove__link">
                              <ul class="list list--inline">
                                  <li class="item">
                                      <span class="link link--secondary">
                                          <svg class="icon-restart icon--s"><use xlink:href="#icon-restart"></use></svg>
                                          Start Over
                                      </span>
                                  </li>
                                  <li class="item">
                                      <span class="link link--secondary">
                                          <svg class="icon-bookmark icon--s"><use xlink:href="#icon-bookmark"></use></svg>
                                          Where I Left Off (11m 17s)
                                      </span>
                                  </li>
                              </ul>
                          </span>
                      </a>
                  </div>
                  <!-- /SINGLE CLASS -->
              </div>
              <!-- /CONTINUE WATCHING -->
          </div>
      </div>
  </div>
  <!-- /BANNER -->

  <!-- CLASS LIST -->
  <div class="content__section row container container--fw">

    <inprogress />
    <purchased />
    <recommended />

      <!-- FEATURED CLASS -->
      <div class="content__row">
          <div class="banner banner--m go go--bottom is--inline" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/featured-banner-3.jpg');">
              <div class="banner__content is--reversed">
                  <div class="wrapper">
                      <div class="banner__text wrapper__inner width--60 align--bottom">
                          <a id="mobilePlay" class="btn__play" href="#">Watch</a>
                          <span class="banner__featured ts--title is--secondary">Featured in &mdash; Lifestyle, Money, Entrepreneurship</span>
                          <span class="banner__title ts--display">How to Save America, One Story at a Time</span>
                          <div class="divider divider--s"></div>
                          <ul class="list list--inline list--divided list--box">
                              <li class="item has--icon">
                                  <span class="avatar avatar--m" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-mike.jpg');"></span>
                                  <a class="link link--secondary" href="#">Mike Rowe</a>
                              </li>
                              <li class="item has--icon">
                                  <svg class="icon-thumbs-up color--white"><use xlink:href="#icon-thumbs-up"></use></svg>
                                  <a class="link link--secondary" href="#">1.2K</a>
                              </li>
                              <li class="item has--icon">
                                  <svg class="icon-users color--white"><use xlink:href="#icon-users"></use></svg>
                                  3.1K
                              </li>
                          </ul>
                      </div>
                      <div class="banner__play wrapper__inner align--right align--bottom">
                          <a class="btn__play btn--l" href="#">Watch</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- /FEATURED CLASS -->

  </div>
  <!-- /CLASS LIST -->

  </div>

</template>

<script>

import Rec from '../components/classes/sections/RecommendedClasses.vue'
import PurchasedClasses from '../components/classes/sections/PurchasedClasses.vue'
import InProgress from '../components/classes/sections/InProgressClasses.vue'

export default {
    components: {
        recommended: Rec,
        inprogress: InProgress,
        purchased: PurchasedClasses
    }
}

</script>

<style>
</style>
