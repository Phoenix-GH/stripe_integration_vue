<template>

  <!-- SEARCH RESULTS PANEL -->
  <div class="container container--fw">

    <!-- EMPTY STATE -->
    <div id="emptyResults" v-if="showEmpty">
      <div class="well no--border no--pad align--center">
        <svg class="icon-search icon--l margin--l">
          <use xlink:href="#icon-search"></use>
        </svg>
        <span class="ts--subtitle is--secondary">Oops! We couldn't find anything...</span>
        <span class="ts--headline">There are no results maching '<span class="underlined">{{searchTerms}}</span>'</span>
        <span class="divider divider--s"></span>
      </div>
      <div class="well border--light is--empty align--center">
        <span class="ts--title">Try searching for something else, or <button class="btn btn--cta margin--s no--margin-tb no--margin-r" @click="browseClasses">Browse Classes</button></span>
      </div>
    </div>
    <!-- /EMPTY STATE -->

    <!-- HAS RESULTS -->
    <div class="results">
      <div class="well border--light wrapper">
        <div class="wrapper__inner">
          <span class="ts--title">You searched for: '<span class="underlined">{{searchTerms}}</span>'</span>
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
        <div class="results__head has--badge" :data-badge="classes.length">
          Classes
        </div>
        <div class="results__list">

          <!-- EMPTY RESULTS -->
          <div class="well is--empty border--light align--center" v-if="classes.length == 0">
            No matching classes...
          </div>
          <!-- /EMPTY RESULTS -->

          <!-- SINGLE RESULT -->
          <div v-for="course in classes" class="result is--class">
            <div class="meta" @click="openCourse(course)">
              <div class="thumb" :style="{ 'background-image': 'url(' + course.thumbImageUrl + ')' }">
                <svg class="icon-play">
                  <use xlink:href="#icon-play"></use>
                </svg>
              </div>
              <span class="ts--title truncate link">{{ course.title }}</span>
              <ul class="list list--inline list--divided">
                <li class="item has--icon">
                  <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + course.instructor.profileImage + ')' }"></span>                  {{ course.instructor.name }}
                </li>
                <li class="item has--icon">
                  <svg class="icon-thumbs-up">
                    <use xlink:href="#icon-thumbs-up"></use>
                  </svg>
                  {{ course.positiveReviewCount ? course.positiveReviewCount : 0 }}
                </li>
                <li class="item has--icon">
                  <svg class="icon-time">
                    <use xlink:href="#icon-time"></use>
                  </svg>
                  <a class="link link--secondary" href="javascript:;">{{ readableCourseDuration(course.duration) }}</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- /SINGLE RESULT -->

        </div>
      </div>
      <!-- /CLASS RESULTS -->

      <!-- PODCAST RESULTS -->
      <div class="col col--5-of-12 col--push-1-of-12">
        <div class="results__head has--badge" :data-badge="podcasts.length">
          Podcasts
        </div>
        <div class="results__list">
          <!-- EMPTY RESULTS -->
          <div class="well is--empty border--light align--center" v-if="podcasts.length == 0">
            No matching podcasts...
          </div>
          <!-- /EMPTY RESULTS -->
          <!-- SINGLE RESULT -->
          <div v-for="podcast in podcasts" class="result is--podcast">
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
  import { User, Class } from '../../api';
  import { mapGetters } from 'vuex';
  import { eventBus } from '../../main';
  import { convertSecondsToReadableFormat } from '../../helpers/util';
  export default {
    data() {
      return {
        terms: "",
        searchResults: [],
        classes: [],
        podcasts: [],
        showEmpty: false
      }
    },
    computed: {
      searchTerms() {
        return this.terms;
      }
    },
    methods: {
      search(terms) {
        let _this = this;
        Class.searchClasses(this, this.terms, result => {
          if (result.status == 'success') {
            _this.searchResults = result.data;
            _this.classes = result.data.filter(object => {
              if ((object.type == 'Class') || (object.type == 'Master')) {
                return true;
              } else {
                return false;
              }
            }).map(object => { return object; });
            _this.podcasts = result.data.filter(object => {
              if (object.type == 'Podcast') {
                return true;
              } else {
                return false;
              }
            }).map(object => { return object; });
            _this.showEmpty = false;
          } else {
            _this.searchResults = [];
            _this.podcasts = [];
            _this.classes = [];
            _this.showEmpty = true;
          }
        })
      },
      readableCourseDuration(duration) {
        return convertSecondsToReadableFormat(duration);
      },
      openCourse(course) {
        this.$store.dispatch('updateActiveCourse', course);
        this.$router.push({ name: 'singleclass', params: { id: course._id } });
      },
      browseClasses() {
        this.$router.push({ name: 'classes' });
      }
    },
    created() {
      eventBus.$on('updateSearchTerms', terms => {
        this.terms = terms;
        this.search(this.terms);
      })
      this.terms = this.$route.query.terms;
      this.search(this.terms);
    },
    destroyed() {
      eventBus.$off('updateSearchTerms');
    }
  }

</script>

<style>

</style>