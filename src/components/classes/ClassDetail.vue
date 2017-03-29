<template>

    <div>

        <!-- BANNER -->
        <div class="banner banner--video bg--black bg--wood">
            <video-player class="player" :options="videoOptions" @player-state-changed="playerStateChanged" ref="myPlayer"></video-player>
        </div>
        <!-- /BANNER -->

        <!-- CLASS CONTENT -->
        <div class="content__section no--pad">

            <!-- INFO BAR -->
            <div class="bar padding--m no--pad">
                <div class="container container--fw">
                    <div class="wrapper">

                        <!-- INFO BAR LEFT -->
                        <div class="wrapper__inner padding--l no--pad-lr no--pad-b">

                            <!-- CLASS INFO -->
                            <h1 class="ts--headline">How to Save America, One Story at a Time</h1>
                            <ul class="class__meta list list--inline list--divided">
                                <li class="item has--icon">
                                    <!-- NOTE: Instructors name should open the 'About Class' tab and scroll to the instructor card -->
                                    <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-mike.jpg');"></span>                                    with <a class="link link--secondary" href="#">Mike Rowe</a>
                                </li>
                                <li class="item has--icon">
                                    <!-- NOTE: Feedback link should open the 'Reviews' tab. -->
                                    <svg class="icon-thumbs-up">
                                        <use xlink:href="#icon-thumbs-up"></use>
                                    </svg>
                                    <a class="link link--secondary" href="#">1.2K Positive</a>
                                </li>
                                <li class="item has--icon">
                                    <svg class="icon-users">
                                        <use xlink:href="#icon-users"></use>
                                    </svg>
                                    3.1K Students
                                </li>
                                <li class="item has--icon">
                                    <svg class="icon-show">
                                        <use xlink:href="#icon-show"></use>
                                    </svg>
                                    42.K Views
                                </li>
                            </ul>
                            <!-- /CLASS INFO -->

                            <!-- CLASS TABS -->
                            <ul class="class__tabs list list--tabs fontSize--m">
                                <li class="item" :class="{'is--active': aboutActive}" @click="tappedOnAboutTab">
                                    About Class
                                </li>
                                <li class="item" :class="{'is--active': notesActive}" @click="tappedOnNotesTab">
                                    My Notes
                                </li>
                                <li class="item" :class="{'is--active': reviewsActive}" @click="tappedOnReviewsTab">
                                    <span class="has--badge" data-badge="36">Reviews</span>
                                </li>
                            </ul>
                            <!-- /CLASS TABS -->

                        </div>
                        <!-- /INFO BAR LEFT -->

                        <!-- INFO BAR RIGHT - FREE USER -->
                        <!-- NOTE: This should only be displayed for a free user -->
                        <div class="wrapper__inner align--center hide remove">
                            <span class="ts--subtitle margin--s no--margin-t no--margin-lr">Get instant on-demand access to all our classes!</span>
                            <button class="btn btn--cta">Upgrade to Premium</button>
                        </div>
                        <!-- /INFO BAR RIGHT - ENROLLED USER -->

                        <!-- INFO BAR RIGHT - ENROLLED USER -->
                        <!-- NOTE: This should only be displayed for a paid, enrolled user -->
                        <div class="wrapper__inner align--right">
                            <ul class="class__actions list list--inline">
                                <li class="item has--popover" :class="{'is--active': popOverShouldClose}" @click.stop="openMenu">
                                    <svg class="icon-more color--black no--margin">
                                        <use xlink:href="#icon-more"></use>
                                    </svg>
                                    </a>
                                    <ul class="list list--nav">
                                        <li class="item" @click="tappedOnUnEnroll">
                                            <a>Un-Enroll</a>
                                        </li>
                                        <li class="item" @click="tappedOnResetProgress">
                                            <a>Reset Progress</a>
                                        </li>
                                        <li class="item" @click="tappedOnMarkComplete">
                                            <a>Mark Complete</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="item">
                                    <div class="progress show--count">
                                        <svg data-progress="0.8" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                            <circle cx="16" cy="16" r="15" class="progress__bg" />
                                            <circle cx="16" cy="16" r="15" class="progress__bar" />
                                        </svg>
                                    </div>
                                </li>
                                <li class="item">
                                    <button class="btn btn--secondary modal--toggle" data-target="#modalReviewClass">Write a Review</button>
                                </li>
                            </ul>
                        </div>
                        <!-- /INFO BAR RIGHT - ENROLLED USER -->

                    </div>
                </div>
            </div>
            <!-- /INFO BAR -->

            <!-- CONTENT -->
            <div class="content__section has--sidebar sidebar--r">
                <div class="container container--fw row row--full-height">
                    <div id="classContent" class="col col--6-of-12 no--pad-l">

                        <!-- ABOUT TAB -->
                        <div id="about" class="tab__content" :class="{'hide': !aboutActive, 'remove': !aboutActive}">
                            <h3 class="ts--subtitle">Tagged with:</h3>
                            <ul class="list list--inline list--tight margin--s no--margin-lr no--margin-b">
                                <li class="item">
                                    <a class="tag" href="#">Money</a>
                                </li>
                                <li class="item">
                                    <a class="tag" href="#">Coaching</a>
                                </li>
                                <li class="item">
                                    <a class="tag" href="#">Financial Strategy</a>
                                </li>
                                <li class="item">
                                    <a class="tag" href="#">Lifestyle Design</a>
                                </li>
                            </ul>
                            <span class="divider divider--s"></span>
                            <p class="ts--body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tortor sapien, pulvinar non
                                convallis at, elementum in nibh. Phasellus vel turpis nulla. Suspendisse malesuada neque
                                sit amet ante bibendum, nec varius eros eleifend. Curabitur magna libero, rhoncus sit amet
                                ante tincidunt, iaculis facilisis est. Mauris id consequat arcu, non tristique sapien. Maecenas
                                sodales turpis vel ipsum venenatis consequat. Donec cursus varius scelerisque. Cras porta
                                pretium nunc, eget iaculis ante viverra in.</p>

                            <h3 class="ts--subtitle">What you will learn:</h3>
                            <ul class="list list--bulleted list--checks">
                                <li class="item">
                                    This is a cool bullet point
                                </li>
                                <li class="item">
                                    This is a cool bullet point
                                </li>
                                <li class="item">
                                    This is a cool bullet point
                                </li>
                            </ul>
                            <br>
                            <h3 class="ts--subtitle">About the Instructor</h3>
                            <p class="ts--body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tortor sapien, pulvinar non
                                convallis at, elementum in nibh. Phasellus vel turpis nulla. Suspendisse malesuada neque
                                sit amet ante bibendum.</p>
                            <span class="divider divider--s"></span>
                            <div class="well disp--ib">
                                <ul class="list list--inline">
                                    <li class="item">
                                        <span class="avatar avatar--xxl" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-mike.jpg');"></span>
                                    </li>
                                    <li class="item">
                                        <h3 class="ts--title">Mike Rowe</h3>
                                        <span class="ts--susbtitle is--secondary">Story-teller, Author and Philanthropist.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- /ABOUT TAB -->

                        <!-- NOTES TAB -->
                        <div id="notes" class="tab__content" :class="{'hide': !notesActive, 'remove': !notesActive}">

                            <!-- EMPTY STATE -->
                            <!-- NOTE: Only displayed if there are no notes saved -->
                            <div class="well is--empty align--center">
                                You haven't saved any notes yet.
                            </div>
                            <!-- /EMPTY STATE -->

                            <!-- LESSON NOTES -->
                            <div class="lesson__notes">
                                <h3 class="ts--subtitle">Lesson 1 &mdash; Introduction</h3>
                                <ul class="list">

                                    <!-- SINGLE NOTES -->
                                    <li class="item well" style="overflow:visible;">
                                        <div class="well__title wrapper">
                                            <div class="wrapper__inner color--black">
                                                <svg class="icon-time icon--s">
                                                    <use xlink:href="#icon-time"></use>
                                                </svg>
                                                02:41
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
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tortor sapien, pulvinar non convallis at, elementum in
                                        nibh.
                                    </li>
                                    <!-- /SINGLE NOTES -->

                                    <!-- SINGLE NOTES -->
                                    <li class="item well" style="overflow:visible;">
                                        <div class="well__title wrapper">
                                            <div class="wrapper__inner color--black">
                                                <svg class="icon-time icon--s">
                                                    <use xlink:href="#icon-time"></use>
                                                </svg>
                                                02:41
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
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tortor sapien, pulvinar non convallis at, elementum in
                                        nibh.
                                    </li>
                                    <!-- /SINGLE NOTES -->

                                </ul>
                            </div>
                            <!-- /LESSON NOTES -->

                            <!-- LESSON NOTES -->
                            <div class="lesson__notes">
                                <h3 class="ts--subtitle">Lesson 4 &mdash; Lorem Ipsum Dolor Sit Amet</h3>
                                <ul class="list">

                                    <!-- SINGLE NOTES -->
                                    <li class="item well" style="overflow:visible;">
                                        <div class="well__title wrapper">
                                            <div class="wrapper__inner color--black">
                                                <svg class="icon-time icon--s">
                                                    <use xlink:href="#icon-time"></use>
                                                </svg>
                                                02:41
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
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tortor sapien, pulvinar non convallis at, elementum in
                                        nibh.
                                    </li>
                                    <!-- /SINGLE NOTES -->

                                </ul>
                            </div>
                            <!-- /LESSON NOTES -->

                        </div>
                        <!-- /NOTES TAB -->

                        <!-- REVIEWS TAB -->
                        <div id="notes" class="tab__content" :class="{'hide': !reviewsActive, 'remove': !reviewsActive}">

                            <!-- EMPTY STATE -->
                            <!-- NOTE: Only displayed if there are no notes saved -->
                            <div class="well is--empty align--center">
                                <span class="ts--subtitle">No one has reviewed this class yet...</span>
                                <span class="divider divider--s"></span>
                                <button class="btn btn--cta modal--toggle" data-target="#modalReviewClass">Be the first to review it</button>
                            </div>
                            <!-- /EMPTY STATE -->

                            <!-- REVIEWS LIST -->
                            <ul class="reviews">

                                <!-- REVIEW -->
                                <li class="review is--positive">
                                    <div class="well">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tortor sapien, pulvinar non convallis at, elementum in
                                        nibh.
                                    </div>
                                    <ul class="review__meta list list--inline list--divided">
                                        <li class="item">
                                            <span class="avatar avatar-xs" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/avatar-2.jpg');"></span>                                            Will D.
                                        </li>
                                        <li class="item">
                                            <svg class="icon-thumbs-up-fill">
                                                <use xlink:href="#icon-thumbs-up-fill"></use>
                                            </svg>
                                        </li>
                                        <li class="item">
                                            <svg class="icon-progress">
                                                <use xlink:href="#icon-progress"></use>
                                            </svg>
                                            100% Completed
                                        </li>
                                    </ul>
                                </li>
                                <!-- /REVIEW -->

                                <!-- REVIEW -->
                                <li class="review is--negative">
                                    <div class="well">
                                        I pity the fool who takes this class!
                                    </div>
                                    <ul class="review__meta list list--inline list--divided">
                                        <li class="item">
                                            <span class="avatar avatar-xs" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/avatar-4.jpg');"></span>                                            Mister T.
                                        </li>
                                        <li class="item">
                                            <svg class="icon-thumbs-down">
                                                <use xlink:href="#icon-thumbs-down"></use>
                                            </svg>
                                        </li>
                                        <li class="item">
                                            <svg class="icon-progress">
                                                <use xlink:href="#icon-progress"></use>
                                            </svg>
                                            36% Completed
                                        </li>
                                    </ul>
                                </li>
                                <!-- /REVIEW -->

                                <!-- REVIEW -->
                                <li class="review is--positive">
                                    <div class="well">
                                        The guy above me has no idea what he's talking about. He didn't even complete the whole class. I, however, completed it fully
                                        and now I only date models.
                                    </div>
                                    <ul class="review__meta list list--inline list--divided">
                                        <li class="item">
                                            <span class="avatar avatar-xs" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/avatar-3.jpg');"></span>                                            Senisa S.
                                        </li>
                                        <li class="item">
                                            <svg class="icon-thumbs-up-fill">
                                                <use xlink:href="#icon-thumbs-up-fill"></use>
                                            </svg>
                                        </li>
                                        <li class="item">
                                            <svg class="icon-progress">
                                                <use xlink:href="#icon-progress"></use>
                                            </svg>
                                            100% Completed
                                        </li>
                                    </ul>
                                </li>
                                <!-- /REVIEW -->

                            </ul>

                        </div>
                        <!-- /REVIEWS TAB -->

                    </div>
                    <div class="sidebar col col--5-of-12 col--push-1-of-12 bg--fog">

                        <div class="flex__group">
                            <div class="flex__col">
                                <!-- LESSONS LIST -->
                                <ol class="lessons__list">

                                    <!-- LIST HEAD -->
                                    <li class="heading wrapper">
                                        <div class="wrapper__inner">10 Lessons</div>
                                        <div class="wrapper__inner align--right">
                                            <svg class="icon-time icon--s color--accent">
                                                <use xlink:href="#icon-time"></use>
                                            </svg>
                                            2h 53m
                                        </div>
                                    </li>
                                    <!-- /LIST HEAD -->

                                    <!-- LESSON -->
                                    <!--
                                NOTE: Lessons have 2 modifiers: status and progress. Status takes the form of the classes: '.is--complete', '.is--playing', '.is--locked'. Progress for each lesson should be updated while the video is playing and the class on 'circularProgress' is changed from '--0' to '--100'
                            -->
                                    <li class="lesson wrapper is--complete">
                                        <div class="lesson__title wrapper__inner" data-tooltip="2d Ago" data-tip-pos="left">
                                            <span class="lesson__btn">
                                        <!-- <div class="circularProgress --100"><div class="circularProgress__overlay"></div></div> -->
                                        <div class="progress">
                                            <svg data-progress="1" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                <circle cx="16" cy="16" r="15" class="progress__bar" />
                                            </svg>
                                        </div>
                                    </span> 1. This is a Completed Lesson
                                        </div>
                                        <div class="lesson__time wrapper__inner align--right">
                                            24m 17s
                                        </div>
                                    </li>
                                    <!-- /LESSON -->

                                    <!-- LESSON -->
                                    <li class="lesson wrapper is--complete">
                                        <div class="lesson__title wrapper__inner" data-tooltip="Today" data-tip-pos="left">
                                            <span class="lesson__btn">
                                        <div class="progress">
                                            <svg data-progress="1" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                <circle cx="16" cy="16" r="15" class="progress__bar" />
                                            </svg>
                                        </div>
                                    </span> 2. Another Completed Lesson
                                        </div>
                                        <div class="lesson__time wrapper__inner align--right">
                                            24m 17s
                                        </div>
                                    </li>
                                    <!-- /LESSON -->

                                    <!-- LESSON -->
                                    <li class="lesson wrapper">
                                        <div class="lesson__title wrapper__inner" data-tooltip="56% Complete" data-tip-pos="left">
                                            <span class="lesson__btn">
                                        <div class="progress">
                                            <svg data-progress="0.56" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                <circle cx="16" cy="16" r="15" class="progress__bar" />
                                            </svg>
                                        </div>
                                    </span> 3. Partially Completed, Saved Place
                                        </div>
                                        <div class="lesson__time wrapper__inner align--right">
                                            <ul class="list list--inline list--tight">
                                                <li class="item">
                                                    <svg class="icon-bookmark icon--s">
                                                        <use xlink:href="#icon-bookmark"></use>
                                                    </svg>
                                                    <span class="link link--secondary">13m 34s</span>
                                                </li>
                                                <li class="item">
                                                    24m 17s
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <!-- /LESSON -->

                                    <!-- LESSON -->
                                    <li class="lesson wrapper is--playing">
                                        <div class="lesson__title wrapper__inner" data-tooltip="Now Playing" data-tip-pos="left">
                                            <span class="lesson__btn">
                                        <div class="progress">
                                            <svg data-progress="0.8" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                <circle cx="16" cy="16" r="15" class="progress__bar" />
                                            </svg>
                                        </div>
                                    </span> 4. Currently Playing Lesson
                                        </div>
                                        <div class="lesson__time wrapper__inner align--right">
                                            24m 17s
                                        </div>
                                    </li>
                                    <!-- /LESSON -->

                                    <!-- LESSON -->
                                    <li class="lesson wrapper">
                                        <div class="lesson__title wrapper__inner" data-tooltip="Not Started" data-tip-pos="left">
                                            <span class="lesson__btn">
                                        <div class="progress">
                                            <svg data-progress="0" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                <circle cx="16" cy="16" r="15" class="progress__bar" />
                                            </svg>
                                        </div>
                                    </span> 5. Zero Percent Complete
                                        </div>
                                        <div class="lesson__time wrapper__inner align--right">
                                            24m 17s
                                        </div>
                                    </li>
                                    <!-- /LESSON -->

                                    <!-- LESSON -->
                                    <li class="lesson wrapper is--locked">
                                        <div class="lesson__title wrapper__inner" data-tooltip="Sign in to Unlock" data-tip-pos="left">
                                            <span class="lesson__btn">
                                        <div class="progress">
                                            <svg data-progress="0" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                <circle cx="16" cy="16" r="15" class="progress__bar" />
                                            </svg>
                                        </div>
                                    </span> 6. A Locked Episode
                                        </div>
                                        <div class="lesson__time wrapper__inner align--right">
                                            24m 17s
                                        </div>
                                    </li>
                                    <!-- /LESSON -->

                                </ol>
                                <!-- /LESSONS LIST -->
                            </div>
                            <div class="flex__col bg--accent">

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- CONTENT -->

        </div>
        <!-- /CLASS CONTENT -->

    </div>

</template>

<script>
    export default {
        data() {
            return {
                videoOptions: {
                    source: {
                        type: "application/x-mpegURL",
                        src: "https://d9iiow8rnlprs.cloudfront.net/johnwick2/encoded-Tue-Jan-2017-04-35-07/encoded-Tue-Jan-2017-04-35-07.m3u8"
                    },
                    playbackRates: [0.5, 1, 1.5, 2],
                    poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
                    autoplay: false
                },
                lessons: [],
                course: {

                },
                courseProgress: 0,
                lessonProgress: {

                },
                popOverIsActive: true,
                currentActiveTab: 'About'
            }
        },
        computed: {
            player() {
                return this.$refs.myPlayer.player;
            },
            popOverShouldClose() {
                return !this.popOverIsActive;
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
            }
        },
        methods: {
            //methods for handling tab changing
            tappedOnAboutTab() {
                console.log("tapped on about");
                this.currentActiveTab = 'About'
            },
            tappedOnNotesTab() {
                console.log("tapped on notes");
                this.currentActiveTab = 'Notes'
            },
            tappedOnReviewsTab() {
                console.log("tapped on reviews");
                this.currentActiveTab = 'Reviews'
            },
            //methods for handling popovermenu selections
            tappedOnUnEnroll() {
                console.log("tapped on unenroll");
                this.popOverIsActive = false;
            },
            tappedOnResetProgress() {
                console.log("tapped on reset progress");
                this.popOverIsActive = false;
            },
            tappedOnMarkComplete() {
                console.log("tapped on mark complete");
                this.popOverIsActive = false;
            },
            //open popover openMenu
            openMenu() {
                console.log("open menu selected");
                if (this.popOverIsActive) {
                    this.popOverIsActive = false;
                } else {
                    this.popOverIsActive = true;
                }
            },
            changeVideo() {
                let _this = this;
                this.videoOptions.source.src = "https://d9iiow8rnlprs.cloudfront.net/logan/758294637291.m3u8";
                setTimeout(() => {
                    _this.player.currentTime(20);
                    _this.player.play();
                }, 100);
            },
            changeVideo2() {
                let _this = this;
                this.videoOptions.source.src = "https://d9iiow8rnlprs.cloudfront.net/johnwick2/encoded-Tue-Jan-2017-04-35-07/encoded-Tue-Jan-2017-04-35-07.m3u8";
                setTimeout(() => {
                    _this.player.currentTime(20);
                    _this.player.play();
                }, 100);
            },
            playerStateChanged(playerCurrentState) {
                console.log(Math.round((playerCurrentState.currentTime / this.player.duration()) * 100));
            }
        }
    }

</script>

<style lang="css">

</style>