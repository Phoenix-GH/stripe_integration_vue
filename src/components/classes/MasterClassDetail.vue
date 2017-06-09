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
                                    <li class="item" v-if="showSavedForLater">
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


                        <div id="previewCTA" class="video__state is--reversed" v-if="currentOverlay == 'preview'">
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


                        <div id="bookmarkedLesson" class="video__state is--reversed" v-if="currentOverlay == 'bookmark'">
                            <div class="blur" :style="{ 'background-image': 'url(' + activeCourse.bannerImageUrl + ')' }"></div>
                            <div class="wrapper">
                                <div class="wrapper__inner align--center padding--xxl no--pad-tb">
                                    <svg class="icon-bookmark icon--l color--accent margin--m no--margin-t no--margin-lr">
                                        <use xlink:href="#icon-bookmark"></use>
                                    </svg>
                                    <span class="ts--headline">{{ currentLessonInProgress.lesson.title }}<wbr><span class="fontSize--xxs"></span></span>
                                    <div class="divider divider--s"></div>
                                    <span class="ts--subtitle">Continue Watching:</span>
                                    <br>
                                    <ul class="list list--inline">
                                        <li class="item">
                                            <button @click="playLesson(currentLessonInProgress.lesson)" class="btn btn--secondary is--reversed">
                                    <svg class="icon-restart icon--s"><use xlink:href="#icon-restart"></use></svg>
                                    Start Over
                                </button>
                                        </li>
                                        <li class="item">
                                            <button @click="playLessonMark(currentLessonInProgress.lesson._id, currentLessonInProgress.lesson.cloudUrl, lessonProgress[currentLessonInProgress.lesson._id].lastPosition)"
                                                class="btn btn--secondary is--reversed">
                                    <svg class="icon-bookmark icon--s"><use xlink:href="#icon-bookmark"></use></svg>
                                    Where I Left Off
                                </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="completeLesson" class="video__state is--reversed" v-if="currentOverlay == 'lesson'">
                            <div class="blur" :style="{ 'background-image': 'url(' + activeCourse.bannerImageUrl + ')' }"></div>
                            <div class="wrapper">
                                <div class="wrapper__inner align--center padding--xxl no--pad-tb">
                                    <div class="progress show--count"><span class="progress__counter">{{ percentComplete }}%</span>
                                        <svg data-progress="0.8" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                            <circle cx="16" cy="16" r="15" class="progress__bg" />
                                            <circle cx="16" cy="16" r="15" class="progress__bar" :style="courseProgressBar" />
                                        </svg>
                                    </div>
                                    <span class="ts--headline">You're doing great, {{ user.firstName }}!</span>
                                    <div class="divider divider--s"></div>
                                    <span class="ts--subtitle">
                            <span class="fontWeight--2">{{ currentLesson().title }}</span>                                    will begin playing in...
                                    <span id="lessonCountdown" class="fontSize--m">{{ transitionTimer }}s</span>
                                    </span>
                                    <br>
                                    <ul class="list list--inline">
                                        <li class="item">
                                            <button @click="replayLesson" class="btn btn--secondary is--reversed" style="width:128px;">
                                    <svg class="icon-restart icon--s"><use xlink:href="#icon-restart"></use></svg>
                                    Replay
                                </button>
                                        </li>
                                        <li @click.stop="playNextLesson" class="item">
                                            <button class="btn btn--secondary is--reversed" style="width:128px;">
                                    Next
                                    <svg class="icon-next icon--s" style="margin-left:8px;"><use xlink:href="#icon-next"></use></svg>
                                </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="completeClass" class="video__state is--reversed" v-if="currentOverlay == 'class'">
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

                        <div class="lessons__sharing" v-if="!currentMasterCourse.unlocked">
                            <div class="well bg--positive align--center margin--xxl no--margin-lr no--margin-t no--border">
                                <span class="ts--title margin--m no--margin-t no--margin-lr color--white">Get instant access for <span class="underlined">${{currentMasterCourse.course.amount}}</span></span>
                                <button @click="purchaseMasterCourse" class="btn btn--cta is--reversed">Purchase Masterclass</button>
                            </div>
                        </div>

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
                                            {{ lessons.length }} Chapters
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
                                <span class="ts--title">Refer a Friend, Earn $25</span>
                                <p class="ts--body">Earn $25 for every friend you refer.</p>
                                <div class="wrapper">
                                    <div class="wrapper__inner padding--m no--pad-l no--pad-tb">
                                        <div class="input input--text" data-tooltip="Click to copy" data-tip-pos="right">
                                            <input type="text" class="input__field not--empty" data-copy="Copied!" readonly id="inputID" :value="shareUrl">
                                            <label for="inputID">Referral URL</label>
                                        </div>
                                    </div>
                                    <div class="wrapper__inner" style="width:190px; transform: translateY(-4px);">

                                        <!-- FACBOOK SHARE -->
                                        <div class="fb-share-button" :data-href="shareUrl" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fselfmademan.com%2F&amp;src=sdkpreparse">Share</a></div>
                                        <!-- /FACEBOOK SHARE -->

                                        <!-- TWITTER SHARE -->
                                        <div class="disp--ib" style="transform:translateY(7px);">
                                            <a href="https://twitter.com/share" class="twitter-share-button" :data-url="shareUrl" data-show-count="false">Tweet</a>
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
                            <li class="item" :class="{'is--active': challengeActive}" @click="tappedOnChallengeTab">
                                <span class="has--badge badge--alert badge--text" data-badge="Special Offer!">Completion Challenge</span>
                            </li>
                        </ul>
                        <!-- /CLASS TABS -->
                    </div>
                    <!-- /CLASS INFO -->

                    <!-- CLASS CONTENT -->
                    <div class="class__tabs">

                        <!-- ABOUT TAB -->
                        <div id="about" class="tab__content dropcap" :class="{'hide': !aboutActive, 'remove': !aboutActive}">

                            <vue-markdown class="ts--body">{{ activeCourse.description }}</vue-markdown>

                            <h3 class="ts--subtitle">What you will learn:</h3>
                            <ul class="list list--bulleted list--checks">
                                <li v-for="bullet in activeCourse.bullets" class="item">
                                    {{ bullet }}
                                </li>
                            </ul>

                            <br>
                            <h3 class="ts--subtitle">About the Instructor:</h3>
                            <div id="instructor" class="well disp--ib no--pad" style="width:100%;">
                                <div class="well__row">
                                    <div class="well__section">
                                        <ul class="list list--inline list--tight">
                                            <li class="item">
                                                <span class="avatar avatar--xl" :style="{ 'background-image': 'url(' + activeCourse.instructor.profileImage + ')' }"></span>
                                            </li>
                                            <li class="item">
                                                <h3 class="ts--title">{{ activeCourse.instructor.name }}</h3>
                                                <span class="ts--subtitle is--secondary">{{ activeCourse.instructor.title }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="well__row padding--m">
                                    <p class="ts--body">{{ activeCourse.instructor.bio }}</p>
                                    <div class="align--right">
                                        <ul class="list list--inline list--social disp--ib">
                                            <li class="item is--emphasis fontSize--s">
                                                Follow:
                                            </li>
                                            <li class="item">
                                                <a href="#">
                                                    <svg class="icon-social-facebook icon--s"><use xlink:href="#icon-social-facebook"></use></svg>
                                                </a>
                                            </li>
                                            <li class="item">
                                                <a href="#">
                                                    <svg class="icon-social-twitter icon--s"><use xlink:href="#icon-social-twitter"></use></svg>
                                                </a>
                                            </li>
                                            <li class="item">
                                                <a href="#">
                                                    <svg class="icon-social-instagram icon--s"><use xlink:href="#icon-social-instagram"></use></svg>
                                                </a>
                                            </li>
                                            <li class="item">
                                                <a href="#">
                                                    <svg class="icon-social-snapchat icon--s"><use xlink:href="#icon-social-snapchat"></use></svg>
                                                </a>
                                            </li>
                                            <li class="item">
                                                <a href="#">
                                                    <svg class="icon-social-website icon--s"><use xlink:href="#icon-social-website"></use></svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h3 class="ts--subtitle">Tagged with:</h3>
                            <ul class="list list--inline list--tight margin--s no--margin-lr no--margin-b">
                                <li v-for="tagName in activeCourse.tags" class="item">
                                    <router-link class="tag" :to="{ name: 'searchresults', query: { terms: tagName }}">{{ tagName }}</router-link>
                                </li>
                            </ul>

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

                        <!-- COMPLETION CHALLENGE TAB -->
                        <div id="completionChallenge" class="tab__content" :class="{'hide': !challengeActive, 'remove': !challengeActive}">

                            <div class="well card">
                                <h3 class="ts--title">Take the Completion Challenge!</h3>
                                <br>
                                <p class="ts--body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien arcu, mattis nec augue
                                    eu, tristique consequat arcu. Donec quis ante posuere, interdum dolor at, fermentum diam.
                                    Maecenas ullamcorper, dolor id accumsan viverra, urna nisl auctor risus, quis bibendum
                                    ipsum leo vel nibh.</p>
                            </div>

                        </div>
                        <!-- /COMPLETION CHALLENGE TAB -->

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
        //-----------------------------------
        // DATA
        //-----------------------------------
        data() {
            return {
                lessons: [],
                reviews: [],
                notes: [],
                currentCourseData: {},
                lessonProgress: {},
                currentLessonInProgress: {},
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
                currentOverlay: '',
                timer: {},
                courseWasReset: false,
                masterCourse: {}
            }
        },
        //-----------------------------------
        // COMPONENTS
        //-----------------------------------
        components: {
            VueMarkdown
        },
        //-----------------------------------
        // LIFECYCLE METHODS
        //-----------------------------------
        created() {
            let _this = this;
            eventBus.$on('updateClassDetails', () => {
                Class.classDetails(_this, _this.$route.params.id, error => {
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
                    if (!this.currentLesson().free) {
                        console.log('not free');
                        this.removedSavedForLater();
                    }
                    _this.currentOverlay = '';
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
                    if (_this.userLoggedIn) {
                        _this.lessonProgress[_this.currentLessonId].completionDate = Date.now();
                        let _nextLesson = this.nextLesson();
                        _this.currentLessonId = _nextLesson._id;
                        _this.updateLastLesson();
                        Class.updateCourseProgress(_this, _this.activeCourse._id, _this.progressPayload, result => {
                        });
                    }
                    _this.isPlaying = false;
                    _this.checkOverlays();
                });
                _this.player.src({
                    type: "application/x-mpegURL",
                    src: "",
                    withCredentials: false
                });
            })

            console.log('momo' + JSON.stringify(this.currentMasterCourse));

        },
        beforeDestroy() {
            clearInterval(this.timer);
            eventBus.$off('updateClassDetails');
            eventBus.$off('closeMenu');
            if (this.userLoggedIn) {
                if (!this.courseWasReset) {
                    this.updateLastLesson();
                    Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                    });
                }
            }
            window.removeEventListener('keyup', event => {
                console.log('removing keyup event listener');
            })
            this.player.dispose();
            this.player = {};
        },
        //-----------------------------------
        // COMPUTED PROPERTIES
        //-----------------------------------
        computed: {
            ...mapGetters([
                'user', 'activeCourse', 'userLoggedIn', 'lastLesson', 'masterClasses'
            ]),
            showUpgrade() {
                if ((this.userLoggedIn) && (this.user.subscriptionType == 'free')) {
                    return true;
                } else {
                    return false;
                }
            },
            shareUrl() {
                return `https://smm.co?ref=${this.user.referralId}`;
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
                    state: this.currentCourseData.state,
                    lastLesson: {
                        lesson: this.tempLastLesson.lesson,
                        progress: this.tempLastLesson.progress
                    }
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
            challengeActive() {
                if (this.currentActiveTab == 'Challenge') return true;
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
            currentLessons() {
                return this.lessons;
            },
            currentMasterCourse() {
                let _masterClasses = this.masterClasses.filter(masterClass => {
                    if (masterClass.course._id == this.activeCourse._id) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(masterClass => { return masterClass; });
                if (_masterClasses.length > 0) {
                    return _masterClasses[0];
                }
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
        //-----------------------------------
        // METHODS
        //-----------------------------------
        methods: {

            //-----------------------------------
            // NOTES
            //-----------------------------------
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

            //-----------------------------------
            // VIDEO/PLAYBACK
            //-----------------------------------
            changeVideoSource(url) {
                if (this.player != undefined) {
                    this.player.src({
                        type: "application/x-mpegURL",
                        src: url,
                        withCredentials: false
                    });
                }
            },
            playLesson(lesson) {
                this.currentOverlay = '';
                this.courseComplete = false;
                if ((!this.userLoggedIn) && (!lesson.free)) {
                    return;
                }
                let _this = this;
                this.currentLessonId = lesson._id;

                if ((this.currentCourseData.state == 0) && (!lesson.free)) {
                    //update course progress
                    Class.updateCourseProgress(this, this.activeCourse._id, { state: 1 }, result => {
                        _this.currentCourseData = result;
                        _this.lessonProgress = result.lessonProgress;
                        _this.popOverIsActive = false;
                    });
                }

                if (!this.lessonProgress[lesson._id]) {
                    this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null };
                }
                this.changeVideoSource(lesson.cloudUrl);
                setTimeout(() => {
                    if (_this.player != undefined) {
                        _this.player.play();
                    }

                }, 150);
            },
            jumpToPosition(note) {
                this.currentOverlay = '';
                this.courseComplete = false;
                if (!this.userLoggedIn) return;
                let _this = this;
                setTimeout(() => {
                    if (_this.player != undefined) {
                        _this.player.currentTime(note.ts);
                        _this.player.play();
                    }

                }, 150);
            },
            previousLesson() {
                //get index of current lesson
                console.log('checking next Lesson');
                let _currentLesson = this.currentLesson();
                let index = this.lessons.map(function (lesson) { return lesson._id; }).indexOf(_currentLesson._id);
                let nextIndex = index - 1;
                if (nextIndex < 0) { //end of lessons
                    return this.lessons[0];
                } else { //still not the end
                    return this.lessons[nextIndex];
                }
            },
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
            nextLesson() {
                //get index of current lesson
                console.log('checking next Lesson');
                let _currentLesson = this.currentLesson();
                let index = this.lessons.map(function (lesson) { return lesson._id; }).indexOf(_currentLesson._id);
                let nextIndex = index + 1;
                if (nextIndex >= (this.lessons.length - 1)) {
                    nextIndex = (this.lessons.length - 1);
                }
                return this.lessons[nextIndex];
            },
            onLastLesson() {
                let _currentLesson = this.currentLesson();
                let index = this.lessons.map(function (lesson) { return lesson._id; }).indexOf(_currentLesson._id);
                let nextIndex = index + 1;
                if (nextIndex >= (this.lessons.length - 1)) { //end of lessons
                    return true;
                } else { //still not the end
                    return false;
                }
            },
            playNextLesson() {
                clearInterval(this.timer);
                this.currentOverlay = '';
                let lesson = this.currentLesson();
                this.playLesson(lesson);
            },
            playLessonMark(id, videoUrl, mark) {
                this.currentOverlay = '';
                this.courseComplete = false;
                if (!this.userLoggedIn) return;
                let _this = this;
                this.currentLessonId = id;
                this.changeVideoSource(videoUrl);
                setTimeout(() => {
                    if (_this.player != undefined) {
                        _this.player.currentTime(mark);
                        _this.player.play();
                    }
                }, 150);
            },
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
            activateTimer() {
                this.transitionTimer = 10;
                let _this = this;
                this.timer = setInterval(() => {
                    _this.transitionTimer = _this.transitionTimer - 1;
                    if (_this.transitionTimer == 0) {
                        clearInterval(_this.timer);
                        _this.playNextLesson();
                    }
                }, 1000);
            },

            //-----------------------------------
            // DATA SOURCE
            //-----------------------------------
            updateDataSource() {
                let _this = this;
                this.$store.dispatch('updateSpinner', true);
                Class.classDetails(this, this.$route.params.id, error => {
                    _this.$router.replace({ name: 'classes' });
                    this.$store.dispatch('updateSpinner', false);
                }, course => {
                    _this.initDetails();
                    this.$store.dispatch('updateSpinner', false);
                });
            },
            purchaseMasterCourse() {
                console.log('will purchase master course');
                Class.purchaseMasterClass(this, this.activeCourse._id).then(response => {
                    console.log('there was success ' + response);
                }).catch(err => {
                    console.log('there was an error ' + err);
                });
            },
            initDetails() {

                this.currentCourseData = {};
                this.lessonProgress = {};

                //check login
                if (this.userLoggedIn) {
                    //set the last lesson
                    if (this.lastLesson != undefined) {
                        this.tempLastLesson = this.lastLesson;
                    }
                    //get course progress
                    Class.getCourseProgress(this, this.activeCourse._id, data => {
                        //console.log(JSON.stringify(data));
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
                        Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                            this.currentCourseData = result;
                            this.lessonProgress = result.lessonProgress;
                            this.currentLessonInProgress = result.lastLesson;
                            if (this.percentComplete == 100) {
                                this.courseComplete = true;
                            }
                            this.checkCourseProgress();
                            this.checkQuery();
                        });
                    })
                    this.updateClassNotes(this.activeCourse._id);
                    //update view count
                    Class.updateViewCount(this, this.activeCourse._id, count => { })
                }

                //set local lessons array to the course lessons
                if (this.activeCourse.lessons != undefined) {
                    this.lessons = this.activeCourse.lessons;
                }

                //set local reviews array to the course reviews
                this.reviews = this.activeCourse.reviews;

                //setup of video
                this.changeVideoSource(this.lessons[0].cloudUrl);

                //last lesson is valid
                this.lastLessonValid = true;
            },

            //-----------------------------------
            // VISUAL
            //-----------------------------------
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
                    this.currentOverlay = '';
                    this.playLesson(this.lastLesson.lesson);
                } else if (action == 'last') {
                    //play last lesson from last progress point
                    this.currentOverlay = '';
                    this.playLessonMark(this.lastLesson.lesson._id, this.lastLesson.lesson.cloudUrl, this.lastLesson.progress.lastPosition);
                }
            },
            convertLessonDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            },
            checkStatus(lesson) {

                if (this.userLoggedIn) {
                    if (lesson == undefined) return {};
                    if (this.lessonProgress == undefined) return {};
                    if (this.lessonProgress[lesson._id] == undefined) return {};
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
            checkOverlays() {
                //check login status
                if (this.userLoggedIn) {
                    let lesson = this.currentLesson();
                    if (lesson == undefined) {
                        this.currentOverlay = '';
                    } else {
                        if (lesson.free) {
                            if (this.user.subscribed) {
                                if (this.onLastLesson()) {
                                    this.currentOverlay = 'class';
                                } else {
                                    this.currentOverlay = 'lesson';
                                    this.activateTimer();
                                }
                            } else {
                                this.currentOverlay = 'preview';
                            }
                        } else {
                            if (this.percentComplete < 100) {
                                this.currentOverlay = 'lesson';
                                this.activateTimer();
                            } else {
                                this.currentOverlay = 'class';
                            }
                        }
                    }
                } else {
                    this.currentOverlay = 'preview';
                }

            },
            checkCourseProgress() {
                if (this.currentLessonInProgress != undefined) {
                    if (this.currentLessonInProgress.progress != undefined) {
                        if ((this.currentLessonInProgress.progress.percentComplete < 100) && (this.currentLessonInProgress.progress.percentComplete != 0)) {
                            this.currentOverlay = 'bookmark'
                        }
                    }
                }
            },

            //-----------------------------------
            // ACTIONS
            //-----------------------------------
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
            tappedOnChallengeTab() {
                if (!this.userLoggedIn) return;
                this.currentActiveTab = 'Challenge'
            },
            tappedOnUnEnroll() {
                this.popOverIsActive = false;
                this.resetClass();
            },
            tappedOnResetProgress() {
                this.popOverIsActive = false;
                //get current lesson
                let lesson = this.currentLesson();
                if (lesson != undefined) {
                    if (this.lessonProgress != undefined) {
                        if (this.lessonProgress[lesson._id] != undefined) {
                            this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null };
                            let _this = this;
                            Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                                _this.currentCourseData = result;
                                _this.lessonProgress = result.lessonProgress;
                                _this.courseComplete = false;
                                _this.popOverIsActive = false;
                            });
                        }
                    }
                }

            },
            tappedOnMarkComplete() {
                this.popOverIsActive = false;
                //get current lesson
                let lesson = this.currentLesson();
                if (lesson != undefined) {
                    if (this.lessonProgress != undefined) {
                        if (this.lessonProgress[lesson._id] != undefined) {
                            this.lessonProgress[lesson._id] = { lastPosition: lesson.duration, percentComplete: 100, completionDate: Date.now() };
                            let _this = this;
                            Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                                _this.currentCourseData = result;
                                _this.lessonProgress = result.lessonProgress;
                                _this.popOverIsActive = false;
                            });
                        }
                    }
                }
            },
            openMenu() {
                if (!this.userLoggedIn) return;
                if (this.popOverIsActive) {
                    this.popOverIsActive = false;
                } else {
                    this.popOverIsActive = true;
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
            updateClassNotes(id) {
                let _this = this;
                Class.classNotes(this, id, notes => {
                    _this.notes = notes;
                })
            },
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
            startOver() {
                this.resetClass();
            },
            replayLesson() {
                clearInterval(this.timer);
                this.currentOverlay = '';
                this.courseComplete = false;
                this.playLesson(this.previousLesson());
            },
            resetClass() {

                this.currentOverlay = '';
                this.courseWasReset = true;

                for (var index = 0; index < this.lessons.length; index++) {
                    let lesson = this.lessons[index];
                    this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null };
                }

                let _this = this;
                User.resetCourseProgress(this, this.activeCourse._id).then(result => {
                    _this.$store.dispatch('updateLastLesson', {});
                    _this.$router.push({ name: 'classes' });
                }).catch(err => {
                    console.log(err);
                });

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

            //-----------------------------------
            // SAVE FOR LATER
            //-----------------------------------
            saveForLater() {
                let courseId = this.activeCourse._id;
                if (courseId != undefined) {
                    Class.addSavedForLater(this, { course: courseId });
                }
            },
            removedSavedForLater() {
                let courseId = this.activeCourse._id;
                if (courseId != undefined) {
                    console.log(courseId);
                    Class.removeSavedForLater(this, courseId);
                }
            },
            showSavedForLater() {
                if ((this.userLoggedIn) && (this.currentCourseData.state != undefined)) {
                    if (this.currentCourseData.state == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
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
