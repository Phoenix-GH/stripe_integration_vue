<template>
    <div :class="{'is--playing': isPlaying}">
        <transition name="fadet">
            <div class="flash" v-if="willShowFlash"></div>
        </transition>
        <div class="flex__layout">
            <div class="class__container theater__target" :class="{'is--theater-mode': isTheaterMode}">
                <div class="video__container">

                    <div class="video__player">
                        <div class="video__nav wrapper">
                            <div class="wrapper__inner">
                                <ul class="list list--inline list--divided is--reversed">
                                    <li class="item has--icon">
                                        <a @click="shareClass" class="link modal--toggle">
                                            <svg class="icon-share color--white" style="transform:translateY(-4px);">
                                                <use xlink:href="#icon-share"></use>
                                            </svg>
                                            Share
                                        </a>
                                    </li>
                                    <li class="item" v-if="1 == 0">
                                        <a @click="saveForLater" class="link">Save for Later</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="wrapper__inner align--right">
                                <div class="has--popover disp--ib" :class="{'is--active': showPopover}" @click.stop="openMenu">
                                    <svg class="icon-more color--white no--margin">
                                        <use xlink:href="#icon-more"></use>
                                    </svg>
                                    </a>
                                    <ul class="list">
                                        <li class="item" @click="tappedOnUnEnroll">
                                            <a>Un-Enroll</a>
                                        </li>
                                        <li class="item" @click="tappedOnResetProgress">
                                            <a>Reset Progress</a>
                                        </li>
                                        <li class="item" @click="tappedOnMarkComplete">
                                            <a>Mark Complete</a>
                                        </li>
                                        <li class="item" @click="switchMode">
                                            <a>Switch Mode</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- VIDEO STATES -->

                        <!-- Create Lesson Note -->
                        <div class="popover__toggle has--overlay" style="position:absolute; width:100%; height:100%;">
                            <button @click="createNote" id="createNote" class="btn btn--primary btn--icon btn--circle btn--s btn--toggle is--reversed is--off">
                                <svg class="icon-pencil"><use xlink:href="#icon-pencil"></use></svg>
                                <svg class="icon-close"><use xlink:href="#icon-close"></use></svg>
                            </button>

                            <div id="createNotePopover" class="popover is--below align--right" :class="{'is--visible': showNotepad}" style="min-width:300px; width:60%;">
                                <div class="wrapper align--left padding--xs no--pad-lr no--pad-t">
                                    <div class="wrapper__inner ts--subtitle">
                                        Make a Note
                                    </div>
                                    <div class="wrapper__inner align--right">
                                        <ul class="list list--inline">
                                            <li class="item has--icon">
                                                <svg class="icon-time icon--s">
                                                    <use xlink:href="#icon-time"></use>
                                                </svg>
                                                {{ noteTime }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="input input--textarea input--s">
                                    <textarea v-model="noteDraft" class="input__field" placeholder="It will be saved to the current time...">{{ noteDraft }}</textarea>
                                </div>
                                <div class="align--right">
                                    <ul class="list list--inline">
                                        <li class="item">
                                            <span @click="cancelNote" class="link link--secondary">Cancel</span>
                                        </li>
                                        <li class="item">
                                            <button @click="saveNote" class="btn btn--primary" data-change="" data-loads>Save</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div id="videoNote" class="popover is--above padding--s" :class="{'is--visible': false}" style="left:50px;">
                            <div class="wrapper color--black padding--xs no--pad-lr no--pad-t">
                                <div class="wrapper__inner fontSize--s">
                                    <svg class="icon-time icon--s color--accent">
                                        <use xlink:href="#icon-time"></use>
                                    </svg>
                                    02:08
                                </div>
                                <div class="wrapper__inner align--right">
                                    <svg class="icon-time icon--s color--close">
                                        <use xlink:href="#icon-close"></use>
                                    </svg>
                                </div>
                            </div>
                            <span class="ts--body" style="max-height:64px; overflow-y:scroll;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet nisi id eros fringilla consequat.</span>
                        </div>


                        <div id="previewCTA" class="video__state is--reversed" v-if="showPreviewCTAOverlay">
                            <div class="blur" :style="{ 'background-image': 'url(' + activeCourse.bannerImageUrl + ')' }"></div>
                            <div class="wrapper">
                                <div class="wrapper__inner align--center">
                                    <svg class="icon-star icon--l color--brand margin--m no--margin-t no--margin-lr">
                                        <use xlink:href="#icon-star"></use>
                                    </svg>
                                    <span class="ts--headline">Get immediate access to the full class!</span>
                                    <div class="divider divider--s"></div>
                                    <button class="btn btn--cta margin--m no--margin-t no--margin-lr">Upgrade to Premium</button>
                                    <br>
                                    <button class="btn btn--secondary is--reversed">
                            <svg class="icon-restart icon--s"><use xlink:href="#icon-restart"></use></svg>
                            Replay Preview
                        </button>
                                </div>
                            </div>
                        </div>


                        <div id="bookmarkedLesson" class="video__state is--reversed" v-if="showBookmarkOverlay">
                            <div class="blur" :style="{ 'background-image': 'url(' + activeCourse.bannerImageUrl + ')' }"></div>
                            <div class="wrapper">
                                <div class="wrapper__inner align--center padding--xxl no--pad-tb">
                                    <svg class="icon-bookmark icon--l color--accent margin--m no--margin-t no--margin-lr">
                                        <use xlink:href="#icon-bookmark"></use>
                                    </svg>
                                    <span class="ts--headline">4. Another Great Lesson Name That Is Really Really Obnoxiously Long <wbr><span class="fontSize--xxs">(24m&nbsp;17s)</span></span>
                                    <div class="divider divider--s"></div>
                                    <span class="ts--subtitle">Continue Watching:</span>
                                    <br>
                                    <ul class="list list--inline">
                                        <li class="item">
                                            <button class="btn btn--secondary is--reversed">
                                    <svg class="icon-restart icon--s"><use xlink:href="#icon-restart"></use></svg>
                                    Start Over
                                </button>
                                        </li>
                                        <li class="item">
                                            <button class="btn btn--secondary is--reversed">
                                    <svg class="icon-bookmark icon--s"><use xlink:href="#icon-bookmark"></use></svg>
                                    Where I Left Off
                                </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="completeLesson" class="video__state is--reversed" v-if="showCompleteLessonOverlay">
                            <div class="blur" :style="{ 'background-image': 'url(' + activeCourse.bannerImageUrl + ')' }"></div>
                            <div class="wrapper">
                                <div class="wrapper__inner align--center padding--xxl no--pad-tb">
                                    <div class="progress show--count"><span class="progress__counter">{{ percentComplete }}%</span>
                                        <svg data-progress="0.8" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                            <circle cx="16" cy="16" r="15" class="progress__bg" />
                                            <circle cx="16" cy="16" r="15" class="progress__bar" :style="courseProgressBar" />
                                        </svg>
                                    </div>
                                    <span class="ts--headline">You're doing great, Steve!</span>
                                    <div class="divider divider--s"></div>
                                    <span class="ts--subtitle">
                            <span class="fontWeight--2">'Another Great Lesson Name'</span>                                    will begin playing in...
                                    <span id="lessonCountdown" class="fontSize--m">{{ transitionTimer }}s</span>
                                    </span>
                                    <br>
                                    <ul class="list list--inline">
                                        <li class="item">
                                            <button class="btn btn--secondary is--reversed" style="width:128px;">
                                    <svg class="icon-restart icon--s"><use xlink:href="#icon-restart"></use></svg>
                                    Replay
                                </button>
                                        </li>
                                        <li class="item">
                                            <button class="btn btn--secondary is--reversed" style="width:128px;">
                                    Next
                                    <svg class="icon-next icon--s" style="margin-left:8px;"><use xlink:href="#icon-next"></use></svg>
                                </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="completeClass" class="video__state is--reversed" v-if="showCompleteClassOverlay">
                            <div class="blur" :style="{ 'background-image': 'url(' + activeCourse.bannerImageUrl + ')' }"></div>
                            <div class="wrapper">
                                <div class="wrapper__inner align--center padding--xxl no--pad-tb">
                                    <div class="progress">
                                        <div class="checkmark"></div>
                                        <svg data-progress="1" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                            <circle cx="16" cy="16" r="15" class="progress__bg" />
                                            <circle cx="16" cy="16" r="15" class="progress__bar" />
                                        </svg>
                                    </div>
                                    <span class="ts--headline">Class Complete! Nice work.</span>
                                    <div class="divider divider--s"></div>
                                    <span class="ts--title">
                            Recommend it to a friend?
                            <div class="control__group is--inline disp--ib margin--s no--margin-tb no--margin-r" style="transform:translateY(-2px);">
                                <label @click="addReview('good')" class="control control__radio control__icon no--margin-b is--reversed modal--toggle" data-target="#modalReviewClass">
                                    <input type="radio" name="completeRec" required>
                                    <div class="control__indicator">
                                        <svg class="icon-thumbs-up-fill"><use xlink:href="#icon-thumbs-up-fill"></use></svg>
                                    </div>
                                </label>
                                <label @click="addReview('bad')" class="control control__radio control__icon is--reversed modal--toggle" data-target="#modalReviewClass">
                                    <input type="radio" name="completeRec">
                                    <div class="control__indicator">
                                        <svg class="icon-thumbs-down-fill"><use xlink:href="#icon-thumbs-down-fill"></use></svg>
                                    </div>
                                </label>
                            </div>
                        </span>
                                </div>
                            </div>
                            <a @click="startOver" class="link" style="position:absolute; z-index:10; bottom:24px; left:24px;">
                                <svg class="icon-next icon--s" style="margin-right:8px; transform:rotate(180deg);">
                                    <use xlink:href="#icon-next"></use>
                                </svg>
                                Start Over
                            </a>
                            <a @click="replayLesson" class="link" style="position:absolute; z-index:10; bottom:24px; right:24px;">
                                <svg class="icon-restart icon--s" style="margin-right:8px;">
                                    <use xlink:href="#icon-restart"></use>
                                </svg>
                                Replay Lesson
                            </a>
                        </div>


                        <div class="player">
                            <video id="example-video" class="video-js" controls preload="auto">
                                <p class="vjs-no-js">
                                    To view this video please enable JavaScript, and consider upgrading to a web browser that
                                    <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                                </p>
                            </video>
                        </div>

                    </div>
                </div>
                <div class="class__lessons">

                    <div class="lessons__layout">

                        <ol class="lessons__list">


                            <li class="heading wrapper">
                                <div class="wrapper__inner">
                                    <ul class="list list--inline list--divided">

                                        <li class="item">
                                            <div class="progress show--count"><span class="progress__counter">{{ percentComplete }}%</span>
                                                <svg data-progress="0.8" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                    <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                    <circle cx="16" cy="16" r="15" class="progress__bar" :style="courseProgressBar" />
                                                </svg>
                                            </div>
                                        </li>

                                        <li class="item">
                                            {{ lessons.length }} Lessons
                                        </li>
                                    </ul>
                                </div>
                                <div class="wrapper__inner align--right">
                                    <svg class="icon-time icon--s color--accent">
                                        <use xlink:href="#icon-time"></use>
                                    </svg>
                                    {{ totalTime }}
                                </div>
                            </li>

                            <li v-for="lesson in lessons" @click.stop="playLesson(lesson)" class="lesson wrapper" :class="checkStatus(lesson)">
                                <div class="lesson__title wrapper__inner" :data-tooltip="tooltipString(lesson)" data-tip-pos="left">
                                    <span class="lesson__btn">
                                        <div class="progress">
                                            <svg data-progress="1" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                <circle cx="16" cy="16" r="15" class="progress__bar" :style="offsetCalc(lesson)" />
                                            </svg>
                                        </div>
                                    </span>
                                    <span class="title__trunc">{{ lesson.title }}</span>
                                </div>
                                <div class="lesson__time wrapper__inner align--right">
                                    <ul class="list list--inline list--tight">
                                        <li @click.stop="playLessonMark(lesson._id, lesson.cloudUrl, lessonProgress[lesson._id].lastPosition)" class="item" v-if="startedLesson(lesson._id)">
                                            <svg class="icon-bookmark icon--s">
                                                <use xlink:href="#icon-bookmark"></use>
                                            </svg>
                                            <span class="link link--secondary">{{ lessonDurationTag(lesson._id) }}</span>
                                        </li>
                                        <li class="item">
                                            {{ convertLessonDuration(lesson.duration) }}
                                        </li>
                                    </ul>

                                </div>
                            </li>

                        </ol>

                        <!--TODO: Add sharing section -->
                        <div class="lessons__sharing">
                            <div class="well bg--snow">
                                <svg class="icon-reward icon--m color--accent" style="float:right;">
                                    <use xlink:href="#icon-reward"></use>
                                </svg>
                                <span class="ts--subtitle">Give a month, earn a month!</span>
                                <p class="ts--body">Share this class with your friends and you’ll both receive a free month of Premium when they
                                    sign up.</p>
                                <div class="divider divider--s"></div>
                                <div class="wrapper">
                                    <div class="wrapper__inner padding--m no--pad-l no--pad-tb">
                                        <div class="input input--text" data-tooltip="Click to copy" data-tip-pos="right">
                                            <input type="text" class="input__field not--empty" data-copy="Copied!" readonly id="inputID" value="http://smm.co/J3ki80a">
                                            <label for="inputID">Referral URL</label>
                                        </div>
                                    </div>
                                    <div class="wrapper__inner" style="width:190px; transform: translateY(-4px);">

                                        <!-- FACBOOK SHARE -->
                                        <div class="fb-share-button" data-href="https://selfmademan.com/" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fselfmademan.com%2F&amp;src=sdkpreparse">Share</a></div>
                                        <!-- /FACEBOOK SHARE -->

                                        <!-- TWITTER SHARE -->
                                        <div class="disp--ib" style="transform:translateY(7px);">
                                            <a href="https://twitter.com/share" class="twitter-share-button" data-show-count="false">Tweet</a>
                                        </div>
                                        <!-- /TWITTER SHARE -->

                                        <a class="btn btn--share is--email" href="mailto:support@smm.co" style="transform: translateY(1px);">Email</a>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="class__info">

                    <!-- CLASS INFO -->
                    <div class="bar">

                        <div class="wrapper">

                            <!-- INFO BAR LEFT -->
                            <div class="wrapper__inner">
                                <h1 class="class__title ts--headline">{{ activeCourse.title }}</h1>
                                <ul class="class__meta list list--inline list--divided">
                                    <li class="item has--icon">
                                        <!-- NOTE: Instructors name should open the 'About Class' tab and scroll to the instructor card -->
                                        <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + activeCourse.instructor.profileImage + ')' }"></span>                                        with <a class="link link--secondary">{{ activeCourse.instructor.name }}</a>
                                    </li>
                                    <li class="item has--icon">
                                        <!-- NOTE: Feedback link should open the 'Reviews' tab. -->
                                        <svg class="icon-thumbs-up">
                                            <use xlink:href="#icon-thumbs-up"></use>
                                        </svg>
                                        <a class="link link--secondary">{{ activeCourse.positiveReviewCount }} Positive</a>
                                    </li>
                                    <li class="item has--icon">
                                        <svg class="icon-show">
                                            <use xlink:href="#icon-show"></use>
                                        </svg>
                                        {{ currentViewCount }} Views
                                    </li>
                                </ul>
                            </div>
                            <!-- /INFO BAR LEFT -->

                            <!-- INFO BAR RIGHT - FREE USER -->
                            <!-- NOTE: This should only be displayed for a free user -->
                            <div class="wrapper__inner align--center" style=" vertical-align:top;" v-if="showUpgrade">
                                <span class="ts--subtitle margin--s no--margin-t no--margin-lr">Get instant on-demand access!</span>
                                <button class="btn btn--primary is--affirmative">Upgrade to Premium</button>
                            </div>
                            <!-- /INFO BAR RIGHT - ENROLLED USER -->

                        </div>

                        <!-- CLASS TABS -->
                        <ul class="class__tabs list list--tabs fontSize--m">
                            <li class="item" :class="{'is--active': aboutActive}" @click="tappedOnAboutTab">
                                About Class
                            </li>
                            <li class="item" :class="{'is--active': notesActive}" @click="tappedOnNotesTab">
                                My Notes
                            </li>
                            <li class="item" :class="{'is--active': reviewsActive}" @click="tappedOnReviewsTab">
                                <span class="has--badge" :data-badge="activeCourse.reviews.length">Reviews</span>
                            </li>
                        </ul>
                        <!-- /CLASS TABS -->
                    </div>
                    <!-- /CLASS INFO -->

                    <!-- CLASS CONTENT -->
                    <div class="class__tabs">

                        <!-- ABOUT TAB -->
                        <div id="about" class="tab__content" :class="{'hide': !aboutActive, 'remove': !aboutActive}">
                            <h3 class="ts--subtitle">Tagged with:</h3>
                            <ul class="list list--inline list--tight margin--s no--margin-lr no--margin-b">
                                <li v-for="tagName in activeCourse.tags" class="item">
                                    <router-link class="tag" :to="{ name: 'searchresults', query: { terms: tagName }}">{{ tagName }}</router-link>
                                </li>
                            </ul>
                            <span class="divider divider--s"></span>

                            <vue-markdown class="ts--body">{{ activeCourse.description }}</vue-markdown>

                            <h3 class="ts--subtitle">What you will learn:</h3>
                            <ul class="list list--bulleted list--checks">
                                <li v-for="bullet in activeCourse.bullets" class="item">
                                    {{ bullet }}
                                </li>
                            </ul>
                            <br>
                            <h3 class="ts--subtitle">About the Instructor</h3>
                            <p class="ts--body">{{ activeCourse.instructor.bio }}</p>
                            <span class="divider divider--s"></span>
                            <div class="well disp--ib">
                                <ul class="list list--inline">
                                    <li class="item">
                                        <span class="avatar avatar--xxl" :style="{ 'background-image': 'url(' + activeCourse.instructor.profileImage + ')' }"></span>
                                    </li>
                                    <li class="item">
                                        <h3 class="ts--title">{{ activeCourse.instructor.name }}</h3>
                                        <span class="ts--subtitle is--secondary">{{ activeCourse.instructor.title }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- /ABOUT TAB -->

                        <!-- NOTES TAB -->
                        <div id="notes" class="tab__content" :class="{'hide': !notesActive, 'remove': !notesActive}">

                            <!-- EMPTY STATE -->
                            <!-- NOTE: Only displayed if there are no notes saved -->
                            <div class="well is--empty align--center" v-if="selectedNotes.length == 0">
                                You haven't saved any notes yet.
                            </div>
                            <!-- /EMPTY STATE -->

                            <!-- LESSON NOTES -->
                            <div v-if="selectedNotes.length > 0" class="lesson__notes">
                                <h3 class="ts--subtitle">{{ selectedLesson.title }}</h3>
                                <ul class="list">

                                    <!-- SINGLE NOTES -->
                                    <li @click="jumpToPosition(note)" v-for="note in selectedNotes" class="item well" style="overflow:visible;">
                                        <div class="well__title wrapper">
                                            <div class="wrapper__inner color--black">
                                                <svg class="icon-time icon--s">
                                                    <use xlink:href="#icon-time"></use>
                                                </svg>
                                                {{ convertLessonDuration(note.ts) }}
                                            </div>
                                            <div class="wrapper__inner align--right">
                                                <div class="has--popover disp--ib">
                                                    <svg class="icon-more icon--s color--black no--margin">
                                                        <use xlink:href="#icon-more"></use>
                                                    </svg>
                                                    </a>
                                                    <ul class="list">
                                                        <li class="item">
                                                            <a>Edit</a>
                                                        </li>
                                                        <li class="item">
                                                            <a>Delete</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {{ note.body }}
                                    </li>
                                    <!-- /SINGLE NOTES -->

                                </ul>
                            </div>
                            <!-- /LESSON NOTES -->

                        </div>
                        <!-- /NOTES TAB -->

                        <!-- REVIEWS TAB -->
                        <div id="reviews" class="tab__content" :class="{'hide': !reviewsActive, 'remove': !reviewsActive}">

                            <!-- EMPTY STATE -->
                            <!-- NOTE: Only displayed if there are no notes saved -->
                            <div class="well is--empty align--center" v-if="reviews.length == 0">
                                <span class="ts--subtitle">No one has reviewed this class yet...</span>
                                <span class="divider divider--s"></span>
                                <button class="btn btn--cta modal--toggle" @click="addReview('good')">Be the first to review it</button>
                            </div>
                            <!-- /EMPTY STATE -->

                            <!-- REVIEWS LIST -->
                            <ul class="reviews" v-if="activeCourse.reviews.length > 0">

                                <!-- REVIEW -->
                                <li v-for="review in activeCourse.reviews" class="review" :class="{'is--positive': true, 'is--negative': false}">
                                    <div class="well">
                                        {{ review.body }}
                                    </div>
                                    <ul class="review__meta list list--inline list--divided">
                                        <li class="item">
                                            <span class="avatar avatar-xs" :style="{ 'background-image': 'url(' + review.user.profileImageUrl + ')' }"></span>                                            {{ review.user.firstName }} {{ review.user.lastName }}
                                        </li>
                                        <li class="item">
                                            <svg class="icon-thumbs-up-fill" v-if="review.rating == 1">
                                                <use xlink:href="#icon-thumbs-up-fill"></use>
                                            </svg>
                                            <svg class="icon-thumbs-down" v-if="review.rating == 0">
                                                <use xlink:href="#icon-thumbs-down"></use>
                                            </svg>
                                        </li>
                                        <li class="item">
                                            <svg class="icon-progress">
                                                <use xlink:href="#icon-progress"></use>
                                            </svg>
                                            {{review.reviewProgress}}% Completed
                                        </li>
                                    </ul>
                                </li>
                                <!-- /REVIEW -->

                            </ul>

                        </div>
                        <!-- /REVIEWS TAB -->

                    </div>
                    <!-- /CLASS CONTENT -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import { Class, User } from '../../api';
    import { mapGetters } from 'vuex';
    import { convertSecondsToReadableFormat } from '../../helpers/util';
    import { eventBus } from '../../main';
    import VueMarkdown from 'vue-markdown';

    export default {

        data() {
            return {
                lessons: [],
                reviews: [],
                notes: [],
                currentCourseData: {},
                lessonProgress: {},
                currentLessonId: "",
                popOverIsActive: false,
                currentActiveTab: 'About',
                player: {},
                noteDraft: "",
                currentTime: 0.0,
                tempLastLesson: {},
                lastLessonValid: false,
                isTheaterMode: false,
                showFlash: false,
                isPlaying: false,
                courseComplete: false,
                showNotepad: false,
                transitionTimer: 10,
                showPreviewCTAOverlay: false,
                showBookmarkOverlay: false,
                showCompleteClassOverlay: false,
                showCompleteLessonOverlay: false
            }
        },
        components: {
            VueMarkdown
        },
        created() {
            let _this = this;
            eventBus.$on('updateClassDetails', () => {
                Class.classDetails(_this, _this.$route.params.id, error => {
                    //there was an error here, redirect to classes page
                    _this.$router.replace({ name: 'classes' });
                }, course => {
                    _this.initDetails();
                });
            });
            eventBus.$on('closeMenu', () => {
                this.popOverIsActive = false;
            });
        },
        mounted() {

            twttr.widgets.load();
            if (window.FB) {
                window.FB.XFBML.parse();
            }

            let _this = this;
            this.updateDataSource();

            //setup the player
            this.player = window.videojs('example-video', {
                src: '',
                type: 'application/x-mpegURL',
                flash: { hls: { withCredentials: false } },
                html5: { hls: { withCredentials: false } },
                poster: '',
                preload: true
            });
            this.player.on('ready', () => {
                _this.player.on('timeupdate', function (player) {
                    const currentTime = _this.player.currentTime();
                    if (currentTime > 0) {
                        _this.currentTime = currentTime;
                        if (_this.lessonProgress[_this.currentLessonId] != undefined) {
                            if (_this.lessonProgress[_this.currentLessonId].lastPosition <= currentTime) {
                                _this.lessonProgress[_this.currentLessonId].lastPosition = currentTime;
                                _this.lessonProgress[_this.currentLessonId].percentComplete = Math.round((currentTime / _this.player.duration()) * 100);
                            }
                        }
                    }
                });
                _this.player.on('play', () => {
                    _this.updateLastLesson();
                    _this.isPlaying = true;
                });
                _this.player.on('pause', () => {
                    if (_this.userLoggedIn) {
                        _this.updateLastLesson();
                        Class.updateCourseProgress(_this, _this.activeCourse._id, _this.progressPayload, result => {
                        });
                    }
                    _this.isPlaying = false;
                });
                _this.player.on('ended', () => {
                    _this.lessonProgress[_this.currentLessonId].completionDate = Date.now();
                    if (_this.userLoggedIn) {
                        _this.updateLastLesson();
                        Class.updateCourseProgress(_this, _this.activeCourse._id, _this.progressPayload, result => {
                        });
                    }
                    _this.isPlaying = false;
                });
                _this.player.src({
                    type: "application/x-mpegURL",
                    src: "https://d9iiow8rnlprs.cloudfront.net/logan/758294637291.m3u8",
                    withCredentials: false
                });
            })

            //this.checkOverlays();

        },
        beforeDestroy() {
            eventBus.$off('updateClassDetails');
            eventBus.$off('closeMenu');
            this.updateLastLesson();
            window.removeEventListener('keyup', event => {
                console.log('removing keyup event listener');
            })
            this.player.dispose();
            this.player = {};
        },
        computed: {
            ...mapGetters([
                'user', 'activeCourse', 'userLoggedIn', 'lastLesson'
            ]),
            showUpgrade() {
                if ((this.userLoggedIn) && (this.user.subscriptionType == 'free')) {
                    return true;
                } else {
                    return false;
                }
            },
            willShowFlash() {
                return this.showFlash;
            },
            currentViewCount() {
                return `${this.activeCourse.viewCount}`;
            },
            totalTime() {
                return convertSecondsToReadableFormat(this.lessons.map(lesson => {
                    return (lesson.duration != undefined) ? lesson.duration : 0;
                }).reduce((a, b) => a + b, 0));
            },
            noteTime() {
                if (this.player.name != undefined) {
                    return convertSecondsToReadableFormat(this.player.currentTime());
                }
                return '';
            },
            progressPayload() {
                let payload = {
                    lessonProgress: this.lessonProgress,
                    progress: this.percentComplete,
                    state: this.currentCourseData.state
                }
                return payload;
            },
            showPopover() {
                return this.popOverIsActive;
            },
            notesActive() {
                if (this.currentActiveTab == 'Notes') return true;
                return false;
            },
            aboutActive() {
                if (this.currentActiveTab == 'About') return true;
                return false;
            },
            reviewsActive() {
                if (this.currentActiveTab == 'Reviews') return true;
                return false;
            },
            percentComplete() {
                if (this.lessons == undefined) return 0;
                if (this.lessonProgress == undefined) return 0;
                let numberCompleted = 0;
                let numberOfLessons = this.lessons.length;
                Object.keys(this.lessonProgress).forEach(key => {
                    if (this.lessonProgress[key].percentComplete >= 100) numberCompleted++;
                });
                return Math.round((numberCompleted / numberOfLessons) * 100);
            },
            courseProgressBar() {
                let offset = 100 - this.percentComplete;
                return { 'stroke-dashoffset': offset };
            },
            //lessons
            currentLessons() {
                return this.lessons;
            },
            selectedLesson() {
                let _lessons = this.lessons.filter(lesson => {
                    if (lesson._id == this.currentLessonId) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(lesson => { return lesson; });
                if (_lessons.length > 0) {
                    return _lessons[0];
                }
            },
            //notes
            selectedNotes() {
                let _notes = this.notes.filter(note => {
                    if (note.lesson == this.currentLessonId) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(note => { return note; });
                return _notes;
            },
            checkLastLesson() {
                if (this.lastLesson.lesson != undefined) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            checkOverlays() {
                // if (this.lastLesson.lesson != undefined) {
                //     console.log('there is a last lesson');
                //     if (this.lastLesson.progress.percentComplete == 100) {
                //         this.showPreviewCTAOverlay = false,
                //             this.showBookmarkOverlay = false,
                //             this.showCompleteClassOverlay = true,
                //             this.showCompleteLessonOverlay = false
                //     } else {
                //         this.showPreviewCTAOverlay = false,
                //             this.showBookmarkOverlay = true,
                //             this.showCompleteClassOverlay = false,
                //             this.showCompleteLessonOverlay = false
                //     }
                // } else {
                //     this.showPreviewCTAOverlay = false,
                //         this.showBookmarkOverlay = false,
                //         this.showCompleteClassOverlay = false,
                //         this.showCompleteLessonOverlay = false
                // }
            },
            switchMode() {
                let _this = this;
                this.showFlash = true;
                if (this.isTheaterMode == true) {
                    setTimeout(() => {
                        _this.showFlash = false;
                    }, 300);
                    setTimeout(() => {
                        _this.isTheaterMode = false;
                    }, 100);
                } else {
                    setTimeout(() => {
                        _this.showFlash = false;
                    }, 300);
                    setTimeout(() => {
                        _this.isTheaterMode = true;
                    }, 100);
                }
            },
            toggleNotepad() {
                if (this.showNotepad == true) {
                    this.showNotepad = false;
                } else {
                    this.showNotepad = true;
                }
            },
            createNote() {
                this.toggleNotepad();
                this.player.pause();
            },
            cancelNote() {
                this.noteDraft = '';
                this.showNotepad = false;
            },
            saveNote() {
                this.addNoteToLesson();
                this.showNotepad = false;
            },
            changeVideoSource(url) {
                this.player.src({
                    type: "application/x-mpegURL",
                    src: url,
                    withCredentials: false
                });
            },
            updateDataSource() {
                let _this = this;
                this.$store.dispatch('updateSpinner', true);
                Class.classDetails(this, this.$route.params.id, error => {
                    //there was an error here, redirect to classes page
                    _this.$router.replace({ name: 'classes' });
                    this.$store.dispatch('updateSpinner', false);
                }, course => {
                    _this.initDetails();
                    this.$store.dispatch('updateSpinner', false);
                });
            },
            startedLesson(lessonId) {
                if (this.lessonProgress == undefined) return false;
                if (this.lessonProgress[lessonId] != undefined) {
                    if (this.lessonProgress[lessonId].percentComplete >= 100) {
                        return false;
                    } else {
                        if (this.lessonProgress[lessonId].lastPosition > 0) return true;
                    }
                }
                return false;
            },
            lessonDurationTag(lessonId) {
                if (this.lessonProgress[lessonId] != undefined) {
                    return this.convertLessonDuration(this.lessonProgress[lessonId].lastPosition);
                }
                return 0;
            },
            checkQuery() {
                let action = this.$route.query.action;
                if (action == 'new') {
                    //play last lesson new
                    this.playLesson(this.lastLesson.lesson);
                } else if (action == 'last') {
                    //play last lesson from last progress point
                    this.playLessonMark(this.lastLesson.lesson._id, this.lastLesson.lesson.cloudUrl, this.lastLesson.progress.lastPosition);
                }
            },
            initDetails() {

                this.currentCourseData = {};
                this.lessonProgress = {};

                //set the last lesson
                if (this.lastLesson != undefined) {
                    this.tempLastLesson = this.lastLesson;
                }

                //set local lessons array to the course lessons
                if (this.activeCourse.lessons != undefined) {
                    this.lessons = this.activeCourse.lessons;
                }


                //get course progress
                Class.getCourseProgress(this, this.activeCourse._id, data => {
                    console.log(JSON.stringify(data));
                    this.currentCourseData = data;
                    if (data.lessonProgress != undefined) {
                        this.lessonProgress = data.lessonProgress;
                    }

                    this.currentLessonId = this.lessons[0]._id;
                    if (!this.lessonProgress[this.currentLessonId]) {
                        this.lessonProgress[this.currentLessonId] = { lastPosition: 0, percentComplete: 0, completionDate: null };
                    }
                    for (var index = 0; index < this.lessons.length; index++) {
                        let lesson = this.lessons[index];
                        if (!this.lessonProgress[lesson._id]) {
                            this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null };
                        }
                    }
                    this.checkQuery();
                    Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                        this.currentCourseData = result;
                        this.lessonProgress = result.lessonProgress;
                        if (this.percentComplete == 100) {
                            this.courseComplete = true;
                        }
                    });
                })

                //set local reviews array to the course reviews
                this.reviews = this.activeCourse.reviews;

                //get updated notes
                if (this.userLoggedIn) {
                    this.updateClassNotes(this.activeCourse._id);
                }

                //update view count
                Class.updateViewCount(this, this.activeCourse._id, count => { })

                //setup of video
                this.changeVideoSource(this.lessons[0].cloudUrl);

                //last lesson is valid
                this.lastLessonValid = true;
            },
            convertLessonDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            },
            //this is to determine the icon state to the left of the lesson
            checkStatus(lesson) {

                if (lesson == undefined) return {};
                if (this.lessonProgress == undefined) return {};
                if (this.lessonProgress[lesson._id] == undefined) return {};
                if (this.userLoggedIn) {
                    let lessonProgress = this.lessonProgress[lesson._id];
                    if (lessonProgress != undefined) {
                        if (lessonProgress.percentComplete >= 100) {
                            return { 'is--playing': false, 'is--complete': true };
                        } else {
                            if (lesson._id == this.currentLessonId) return { 'is--playing': true, 'is--complete': false };
                            return { 'is--playing': false, 'is--complete': false };
                        }
                    } else {
                        if (lesson._id == this.currentLessonId) return { 'is--playing': true, 'is--complete': false };
                        return { 'is--playing': false, 'is--complete': false };
                    }
                } else {
                    if (!lesson.free) {
                        return { 'is--locked': true };
                    } else {
                        if (lesson._id == this.currentLessonId) return { 'is--playing': true, 'is--complete': false };
                    }
                }

            },
            //this is to determine the circular progress bar
            offsetCalc(lesson) {
                if (this.lessonProgress == undefined) return {};
                let lessonProgress = this.lessonProgress[lesson._id];
                if (lessonProgress != undefined) {
                    if (lessonProgress.percentComplete >= 100) {
                        return { 'stroke-dashoffset': 0 };
                    } else {
                        let offset = 100 - lessonProgress.percentComplete;
                        return { 'stroke-dashoffset': offset };
                    }
                } else {
                    return {};
                }
            },
            //method for calculating time for the tooltip
            tooltipString(lesson) {
                if (this.lessonProgress == undefined) return '';
                let lessonProgress = this.lessonProgress[lesson._id];
                if (lessonProgress != undefined) {
                    if (lessonProgress.percentComplete >= 100) {
                        return `Completed`;
                    } else if (lessonProgress.lastPosition == 0) {
                        return 'Not Started';
                    } else {
                        return `${lessonProgress.percentComplete}%`;
                    }
                } else {
                    return 'Not Started';
                }
            },
            //methods for handling tab changing
            tappedOnAboutTab() {
                this.currentActiveTab = 'About'
            },
            tappedOnNotesTab() {
                if (!this.userLoggedIn) return;
                this.currentActiveTab = 'Notes'
            },
            tappedOnReviewsTab() {
                if (!this.userLoggedIn) return;
                this.currentActiveTab = 'Reviews'
            },
            //methods for handling popovermenu selections
            tappedOnUnEnroll() {
                this.popOverIsActive = false;
            },
            tappedOnResetProgress() {
                this.popOverIsActive = false;
            },
            tappedOnMarkComplete() {
                this.popOverIsActive = false;
            },
            //open popover openMenu
            openMenu() {
                if (!this.userLoggedIn) return;
                if (this.popOverIsActive) {
                    this.popOverIsActive = false;
                } else {
                    this.popOverIsActive = true;
                }
            },
            //lesson playback handling
            //this will playback a lesson from the beginning
            playLesson(lesson) {

                this.courseComplete = false;

                //check if user is logged in
                if (!this.userLoggedIn) {
                    return;
                }

                let _this = this;
                this.currentLessonId = lesson._id;
                if (!this.lessonProgress[lesson._id]) {
                    this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null };
                }
                // if (this.currentCourseData.state == 0) {
                //     this.currentCourseData.state = 1;
                //     Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                //         this.currentCourseData = result;
                //         this.lessonProgress = result.lessonProgress;
                //         if (this.percentComplete == 100) {
                //             this.courseComplete = true;
                //         }
                //     });
                // }

                this.changeVideoSource(lesson.cloudUrl);
                setTimeout(() => {
                    _this.player.play();
                }, 150);
            },
            //this will jump to the position in the current lesson from a note
            jumpToPosition(note) {

                this.courseComplete = false;

                if (!this.userLoggedIn) return;
                let _this = this;
                let currentLesson = this.currentLesson();
                setTimeout(() => {
                    _this.player.currentTime(note.ts);
                    _this.player.play();
                }, 150);
            },
            //this gets the current lesson for use with jump to position
            currentLesson() {
                let _lessons = this.lessons.filter(lesson => {
                    if (lesson._id == this.currentLessonId) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(lesson => { return lesson; });
                if (_lessons.length > 0) {
                    return _lessons[0];
                }
            },
            //this will jump to the position on the list bookmark
            playLessonMark(id, videoUrl, mark) {
                this.courseComplete = false;
                if (!this.userLoggedIn) return;
                let _this = this;
                this.currentLessonId = id;
                this.changeVideoSource(videoUrl);
                setTimeout(() => {
                    _this.player.currentTime(mark);
                    _this.player.play();
                }, 150);
            },
            //this will determine the playback state of the lesson
            playbackState(lesson) {

                let lessonProgress = this.lessonProgress[lesson._id];
                if (lessonProgress != undefined) {
                    if (lessonProgress.percentComplete >= 100) {
                        return {
                            'is-complete': true
                        }
                    } else {
                        return {
                            'is--complete': false
                        }
                    }
                } else {
                    return {
                        'is--complete': false
                    }
                }
            },
            //this will determin the %complete of the lesson progress
            percentComplete(lesson) {
                let lessonProgress = this.lessonProgress[lesson._id];
                if (lessonProgress != undefined) {
                    if (lessonProgress.percentComplete >= 100) {
                        return '100%';
                    } else {
                        return `${lessonProgress.percentComplete}%`;
                    }
                } else {
                    return 'Not Started';
                }
            },
            updateLastLesson() {
                if (this.lessonProgress == undefined) return;
                if (this.lastLessonValid) {
                    this.tempLastLesson.course = this.activeCourse;
                    this.tempLastLesson.lesson = this.currentLesson();
                    this.tempLastLesson.progress = this.lessonProgress[this.currentLessonId];
                    this.$store.dispatch('updateLastLesson', this.tempLastLesson);
                }
            },
            //notes
            //this will update notes in the list, API
            updateClassNotes(id) {
                let _this = this;
                Class.classNotes(this, id, notes => {
                    _this.notes = notes;
                })
            },
            //this will add a note to the list, API
            addNoteToLesson() {
                const message = this.noteDraft;
                this.noteDraft = "";
                let payload = {
                    body: message,
                    course: this.activeCourse._id,
                    lesson: this.currentLessonId,
                    user: this.user._id,
                    ts: this.currentTime
                }
                let _this = this;
                Class.addNote(this, payload, note => {
                    _this.updateClassNotes(this.activeCourse._id);
                })
            },
            //this will open the review modal
            addReview(type) {
                if (!this.userLoggedIn) return;
                this.$store.dispatch('updateReviewStatusType', type);
                this.$store.dispatch('updateHasModal', true);
                this.$store.dispatch('updateActiveModal', 'review');
            },
            shareClass() {
                console.log('will share class');
                this.$store.dispatch('updateHasModal', true);
                this.$store.dispatch('updateActiveModal', 'share');
            },
            saveForLater() {
                console.log('will save for later');
            },
            startOver() {
                console.log('will start over');
                this.resetClass();
            },
            replayLesson() {
                this.courseComplete = false;
                this.playLesson(this.currentLesson());
                console.log('replay lesson');
            },
            resetClass() {
                for (var index = 0; index < this.lessons.length; index++) {
                    let lesson = this.lessons[index];
                    this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null };
                }
                let _this = this;
                Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                    _this.currentCourseData = result;
                    _this.lessonProgress = result.lessonProgress;
                    _this.courseComplete = false;
                });
            }
        }
    }

</script>

<style lang="css" scoped>
    .fadet-enter-active {
        transition: opacity 0.0s
    }
    
    .fadet-leave-active {
        transition: opacity 0.7s
    }
    
    .fadet-enter,
    .fadet-leave-to
    /* .fade-leave-active in <2.1.8 */
    
    {
        opacity: 0
    }
</style>