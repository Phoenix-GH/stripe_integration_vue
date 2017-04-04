<template>

  <!-- SEARCH RESULTS PANEL -->
  <div class="container container--fw">

    <!-- EMPTY STATE -->
    <div id="emptyResults" class="">
      <div class="well no--border no--pad align--center">
        <svg class="icon-search icon--l margin--l">
          <use xlink:href="#icon-search"></use>
        </svg>
        <span class="ts--subtitle is--secondary">Oops! We couldn't find anything...</span>
        <span class="ts--headline">There are no results maching '<span class="underlined">Lorem Ipsum</span>'</span>
        <span class="divider divider--s"></span>
      </div>
      <div class="well border--light is--empty align--center">
        <span class="ts--title">Try searching for something else, or <button class="btn btn--cta margin--s no--margin-tb no--margin-r" href="#">Browse Classes</button></span>
      </div>
    </div>
    <!-- /EMPTY STATE -->

    <!-- HAS RESULTS -->
    <div class="results">
      <div class="well border--light wrapper">
        <div class="wrapper__inner">
          <span class="ts--title">You searched for: '<span class="underlined">Lorem Ipsum</span>'</span>
        </div>
        <div class="wrapper__inner align--right">
          Sort by:
          <span class="link link--dropdown has--dropdown is--inline">
                    Newest First
                    <ul class="list list--nav">
                        <li class="item">
                            <a href="javascript:;">Newest First</a>
                        </li>
                        <li class="item">
                            <a href="javascript:;">Highest Rated</a>
                        </li>
                        <li class="item">
                            <a href="javascript:;">Most Popular</a>
                        </li>
                    </ul>
                </span>
        </div>
      </div>

      <!-- CLASS RESULTS -->
      <div class="col col--5-of-12">
        <div class="results__head has--badge" data-badge="2">
          Classes
        </div>
        <div class="results__list">
          <!-- EMPTY RESULTS -->
          <div class="well is--empty border--light align--center">
            No matching classes...
          </div>
          <!-- /EMPTY RESULTS -->

          <!-- SINGLE RESULT -->
          <div class="result is--class">
            <div class="meta">
              <div class="thumb" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-1.png')">
                <svg class="icon-play">
                  <use xlink:href="#icon-play"></use>
                </svg>
              </div>
              <span class="ts--title truncate link">How to Build a Team That Works and Gets Results Longer Title</span>
              <ul class="list list--inline list--divided">
                <li class="item has--icon">
                  <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-daymond.jpg');"></span>                  Daymond John
                </li>
                <li class="item has--icon">
                  <svg class="icon-thumbs-up">
                    <use xlink:href="#icon-thumbs-up"></use>
                  </svg>
                  <a class="link link--secondary" href="#">1.2K</a>
                </li>
                <li class="item has--icon">
                  <svg class="icon-time">
                    <use xlink:href="#icon-time"></use>
                  </svg>
                  <a class="link link--secondary" href="#">2h 53m</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- /SINGLE RESULT -->

          <!-- SINGLE RESULT -->
          <div class="result is--class">
            <div class="meta">
              <div class="thumb" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-3.png')">
                <svg class="icon-play">
                  <use xlink:href="#icon-play"></use>
                </svg>
              </div>
              <span class="ts--title truncate link">How to Grow Your Brand and Live Your Dream</span>
              <ul class="list list--inline list--divided">
                <li class="item has--icon">
                  <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-lewis.jpg');"></span>                  Lewis Howes
                </li>
                <li class="item has--icon">
                  <svg class="icon-thumbs-up">
                    <use xlink:href="#icon-thumbs-up"></use>
                  </svg>
                  <a class="link link--secondary" href="#">1.2K</a>
                </li>
                <li class="item has--icon">
                  <svg class="icon-time">
                    <use xlink:href="#icon-time"></use>
                  </svg>
                  <a class="link link--secondary" href="#">2h 53m</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- /SINGLE RESULT --->

        </div>
      </div>
      <!-- /CLASS RESULTS -->

      <!-- PODCAST RESULTS -->
      <div class="col col--5-of-12 col--push-1-of-12">
        <div class="results__head has--badge" data-badge="1">
          Podcasts
        </div>
        <div class="results__list">
          <!-- EMPTY RESULTS -->
          <div class="well is--empty border--light align--center">
            No matching podcasts...
          </div>
          <!-- /EMPTY RESULTS -->
          <!-- SINGLE RESULT -->
          <div class="result is--podcast">
            <div class="meta">
              <div class="thumb" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-2.png')">
                <svg class="icon-podcast">
                  <use xlink:href="#icon-podcast"></use>
                </svg>
              </div>
              <span class="ts--title truncate link">EP61 &mdash; How to Make, Keep and Grow Your Money</span>
              <ul class="list list--inline list--divided">
                <li class="item has--icon">
                  <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-daymond.jpg');"></span>                  Daymond John
                </li>
                <li class="item has--icon">
                  <svg class="icon-date">
                    <use xlink:href="#icon-date"></use>
                  </svg>
                  July 17, 2016
                </li>
              </ul>
            </div>
          </div>
          <!-- /SINGLE RESULT --->

        </div>
      </div>
      <!-- /PODCAST RESULTS -->

    </div>
    <!-- /HAS RESULTS -->

  </div>
  <!-- /SEARCH RESULTS PANEL -->

</template>

<script>
  export default {
    data() {
      return {
        searchResults: []
      }
    },
  }

</script>

<style>

</style>