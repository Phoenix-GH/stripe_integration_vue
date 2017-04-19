<template>
    <div>

        <!-- BANNER -->
        <div class="banner banner--video bg--black bg--wood">
            <video-player class="player" :options="updatedPlayerOptions" @ready="playerReadied" @timeupdate="onPlayerTimeUpdate($event)"
                @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)">
            </video-player>
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
                            <h1 class="ts--headline">{{ activeCourse.title }}</h1>
                            <ul class="class__meta list list--inline list--divided">
                                <li class="item has--icon">
                                    <!-- NOTE: Instructors name should open the 'About Class' tab and scroll to the instructor card -->
                                    <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + activeCourse.instructor.profileImage + ')' }"></span>with
                                    <a class="link link--secondary">{{ activeCourse.instructor.name }}</a>
                                </li>
                                <li class="item has--icon">
                                    <!-- NOTE: Feedback link should open the 'Reviews' tab. -->
                                    <svg class="icon-thumbs-up">
                                        <use xlink:href="#icon-thumbs-up"></use>
                                    </svg>
                                    <a class="link link--secondary">{{ activeCourse.positiveReviewCount }} Positive</a>
                                </li>
                                <li class="item has--icon">
                                    <svg class="icon-users">
                                        <use xlink:href="#icon-users"></use>
                                    </svg>
                                    {{ activeCourse.studentCount }} Students
                                </li>
                                <li class="item has--icon">
                                    <svg class="icon-show">
                                        <use xlink:href="#icon-show"></use>
                                    </svg>
                                    {{ currentViewCount }} Views
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
                                    <span class="has--badge" :data-badge="activeCourse.reviews.length">Reviews</span>
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

                                    <div class="progress show--count"><span class="progress__counter">{{ percentComplete }}%</span>
                                        <svg data-progress="0.8" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                            <circle cx="16" cy="16" r="15" class="progress__bg" />
                                            <circle cx="16" cy="16" r="15" class="progress__bar" :style="courseProgressBar" />
                                        </svg>
                                    </div>

                                </li>
                                <li class="item">
                                    <button class="btn btn--secondary modal--toggle" @click="addReview">Write a Review</button>
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
                                <li v-for="tagName in activeCourse.tags" class="item">
                                    <router-link class="tag" :to="{ name: 'searchresults', query: { terms: tagName }}">{{ tagName }}</router-link>
                                </li>
                            </ul>
                            <span class="divider divider--s"></span>
                            <p class="ts--body">{{ activeCourse.description }}</p>

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
                                        <span class="ts--susbtitle is--secondary">{{ activeCourse.instructor.title }}</span>
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

                            <h3 v-if="selectedNotes.length > 0" class="ts--subtitle">{{ selectedLesson.title }}</h3>
                            <div class="input input--textarea input--m">
                                <textarea v-model="noteDraft" class="input__field" :class="{'not--empty': noteDraft.length > 0}" maxlength="500" required>{{ noteDraft }}</textarea>
                                <label for="reviewText ">Add a note...</label>
                                <span class="input__counter "><span>0</span>/500</span>
                            </div>
                            <button @click="addNoteToLesson" class="btn btn--cta btn--block ">Add Note</button>

                            <!-- LESSON NOTES -->
                            <div v-if="selectedNotes.length > 0" class="lesson__notes">

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
                        <div id="notes" class="tab__content" :class="{'hide': !reviewsActive, 'remove': !reviewsActive}">

                            <!-- EMPTY STATE -->
                            <!-- NOTE: Only displayed if there are no notes saved -->
                            <div class="well is--empty align--center" v-if="reviews.length == 0">
                                <span class="ts--subtitle">No one has reviewed this class yet...</span>
                                <span class="divider divider--s"></span>
                                <button class="btn btn--cta modal--toggle" data-target="#modalReviewClass">Be the first to review it</button>
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
                    <div class="sidebar col col--5-of-12 col--push-1-of-12 bg--fog">

                        <div class="flex__group">
                            <div class="flex__col">
                                <!-- LESSONS LIST -->
                                <ol class="lessons__list">

                                    <!-- LIST HEAD -->
                                    <li class="heading wrapper">
                                        <div class="wrapper__inner">{{ lessons.length }} Lessons</div>
                                        <div class="wrapper__inner align--right">
                                            <svg class="icon-time icon--s color--accent">
                                                <use xlink:href="#icon-time"></use>
                                            </svg>
                                            {{ totalTime }}
                                        </div>
                                    </li>
                                    <!-- /LIST HEAD -->

                                    <!-- LESSON -->
                                    <li v-for="lesson in lessons" @click.stop="playLesson(lesson)" class="lesson wrapper" :class="checkStatus(lesson)">
                                        <div class="lesson__title wrapper__inner" :data-tooltip="tooltipString(lesson)" data-tip-pos="left">
                                            <span class="lesson__btn">
                                                <div class="circularProgress">
                                                    <div class="circularProgress__overlay">

                                                    </div>
                                                </div>
                                                <div class="progress" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                                                        <circle cx="16" cy="16" r="15" class="progress__bg" />
                                                        <transition>
                                                        <circle cx="16" cy="16" r="15" class="progress__bar" :style="offsetCalc(lesson)" />
                                                        </transition>
                                                    </svg>
                                                </div>
                                            </span> {{ lesson.title }}
                                        </div>
                                        <div class="lesson__time wrapper__inner align--right">
                                            <ul class="list list--inline list--tight">
                                                <li @click.stop="playLessonMark(lesson._id, lesson.cloudUrl, lessonProgress[lesson._id].lastPosition)" class="item" v-if="lessonProgress[lesson._id].lastPosition > 0">
                                                    <svg class="icon-bookmark icon--s">
                                                        <use xlink:href="#icon-bookmark"></use>
                                                    </svg>
                                                    <span class="link link--secondary">{{ convertLessonDuration(lessonProgress[lesson._id].lastPosition) }}</span>
                                                </li>
                                                <li class="item">
                                                    {{ convertLessonDuration(lesson.duration) }}
                                                </li>
                                            </ul>

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
    import { Class, User } from '../../api';
    import { mapGetters } from 'vuex';
    import { convertSecondsToReadableFormat } from '../../helpers/util';
    import { eventBus } from '../../main';

    export default {

        data() {
            return {
                playerOptions: {
                    // videojs and plugin options
                    sources: [{
                        withCredentials: false,
                        type: "application/x-mpegURL",
                        src: "https://d9iiow8rnlprs.cloudfront.net/johnwick2/encoded-Tue-Jan-2017-04-35-07/encoded-Tue-Jan-2017-04-35-07.m3u8"
                    }],
                    flash: { hls: { withCredentials: false } },
                    html5: { hls: { withCredentials: false } },
                    playbackRates: [0.5, 1, 1.5, 2],
                    poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg"
                },
                lessons: [],
                reviews: [],
                notes: [],
                currentCourseData: {},
                lessonProgress: {},
                currentLessonId: "",
                popOverIsActive: true,
                currentActiveTab: 'About',
                player: {},
                noteDraft: "",
                currentTime: 0.0,
                tempLastLesson: {}
            }
        },
        created() {
            eventBus.$on('updateClassDetails', () => {
                this.initDetails();
            })
        },
        mounted() {
            this.initDetails();
        },
        beforeDestroy() {
            eventBus.$off('updateClassDetails');
            this.updateLastLesson();
        },
        computed: {
            ...mapGetters([
                'user', 'activeCourse', 'userLoggedIn', 'lastLesson'
            ]),
            currentViewCount() {
                return `${this.activeCourse.viewCount}`;
            },
            updatedPlayerOptions() {
                return this.playerOptions;
            },
            totalTime() {
                return convertSecondsToReadableFormat(this.lessons.map(lesson => {
                    return (lesson.duration != undefined) ? lesson.duration : 0;
                }).reduce((a, b) => a + b, 0));
            },
            progressPayload() {
                let payload = {
                    lessonProgress: this.lessonProgress,
                    progress: this.percentComplete
                }
                return payload;
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
            },
            percentComplete() {
                let numberCompleted = 0;
                let numberOfLessons = this.lessons.length;
                Object.keys(this.lessonProgress).forEach(key => {
                    if (this.lessonProgress[key].isComplete) numberCompleted++;
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
                console.log(_notes);
                return _notes;
            }
        },
        methods: {
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
                this.tempLastLesson = this.lastLesson;

                //set local lessons array to the course lessons
                this.lessons = this.activeCourse.lessons;

                //set local reviews array to the course reviews
                this.reviews = this.activeCourse.reviews;

                //get updated notes
                if (this.userLoggedIn) {
                    this.updateClassNotes(this.activeCourse._id);
                }

                let _this = this;

                //update view count
                Class.updateViewCount(this, this.activeCourse._id, count => {
                    Class.classDetails(_this, _this.activeCourse._id);
                })


                Class.getCourseProgress(this, this.activeCourse._id, data => {
                    _this.currentCourseData = data;
                    _this.lessonProgress = data.lessonProgress;
                    _this.currentLessonId = _this.lessons[0]._id;
                    if (!_this.lessonProgress[_this.currentLessonId]) {
                        _this.lessonProgress[_this.currentLessonId] = { lastPosition: 0, percentComplete: 0, completionDate: null, isComplete: false };
                    }
                    for (var index = 0; index < _this.lessons.length; index++) {
                        let lesson = _this.lessons[index];
                        if (!_this.lessonProgress[lesson._id]) {
                            _this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null, isComplete: false };
                        }
                    }
                    console.log(_this.lessonProgress);
                    _this.checkQuery();
                })

                //setup of video
                this.playerOptions.poster = this.activeCourse.bannerImageUrl;
                this.playerOptions.sources[0].src = this.lessons[0].cloudUrl;
            },
            //player events
            playerReadied(player) {
                this.player = player;
                var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
                player.tech_.hls.xhr.beforeRequest = function (options) {
                    return options
                }
            },
            onPlayerPlay(event) {
                console.log('started playing');
                this.updateLastLesson();
            },
            onPlayerPause(event) {
                console.log('player paused')
                if (this.userLoggedIn) {
                    this.updateLastLesson();
                    Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                    });
                }
            },
            onPlayerEnded(event) {
                this.lessonProgress[this.currentLessonId].isComplete = true;
                this.lessonProgress[this.currentLessonId].completionDate = Date.now();
                if (this.userLoggedIn) {
                    this.updateLastLesson();
                    Class.updateCourseProgress(this, this.activeCourse._id, this.progressPayload, result => {
                    });
                }
            },
            onPlayerTimeUpdate(playerCurrentState) {
                const currentTime = playerCurrentState.currentTime();
                if (currentTime > 0) {
                    this.currentTime = currentTime;
                    if (this.lessonProgress[this.currentLessonId] != undefined) {
                        if (this.lessonProgress[this.currentLessonId].lastPosition <= currentTime) {
                            this.lessonProgress[this.currentLessonId].lastPosition = currentTime;
                            this.lessonProgress[this.currentLessonId].percentComplete = Math.round((currentTime / this.player.duration()) * 100);
                        }
                    }
                }
            },
            convertLessonDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            },
            //this is to determine the icon state to the left of the lesson
            checkStatus(lesson) {
                if (this.userLoggedIn) {
                    let lessonProgress = this.lessonProgress[lesson._id];
                    if (lessonProgress != undefined) {
                        if (lessonProgress.isComplete) {
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
                let lessonProgress = this.lessonProgress[lesson._id];
                if (lessonProgress != undefined) {
                    if (lessonProgress.isComplete) {
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
                let lessonProgress = this.lessonProgress[lesson._id];
                if (lessonProgress != undefined) {
                    if (lessonProgress.isComplete) {
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

                //check if user is logged in
                if (!this.userLoggedIn) {
                    return;
                }

                let _this = this;
                this.currentLessonId = lesson._id;
                if (!this.lessonProgress[lesson._id]) {
                    this.lessonProgress[lesson._id] = { lastPosition: 0, percentComplete: 0, completionDate: null, isComplete: false };
                }
                this.playerOptions.sources[0].src = lesson.cloudUrl;
                setTimeout(() => {
                    _this.player.play();
                }, 200);
            },
            //this will jump to the position in the current lesson from a note
            jumpToPosition(note) {
                if (!this.userLoggedIn) return;
                let _this = this;
                let currentLesson = this.currentLesson();
                setTimeout(() => {
                    _this.player.currentTime(note.ts);
                    _this.player.play();
                }, 1000);
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
                console.log('this is the mark ' + mark);
                if (!this.userLoggedIn) return;
                let _this = this;
                this.currentLessonId = id;
                this.playerOptions.sources[0].src = videoUrl;
                setTimeout(() => {
                    _this.player.currentTime(mark);
                    _this.player.play();
                }, 3000);
            },
            //this will determine the playback state of the lesson
            playbackState(lesson) {

                let lessonProgress = this.lessonProgress[lesson._id];
                if (lessonProgress != undefined) {
                    if (lessonProgress.isComplete) {
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
                    if (lessonProgress.isComplete) {
                        return '100%';
                    } else {
                        return `${lessonProgress.percentComplete}%`;
                    }
                } else {
                    return 'Not Started';
                }
            },
            updateLastLesson() {
                this.tempLastLesson.course = this.activeCourse;
                this.tempLastLesson.lesson = this.currentLesson();
                this.tempLastLesson.progress = this.lessonProgress[this.currentLessonId];
                this.$store.dispatch('updateLastLesson', this.tempLastLesson);
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
            addReview() {
                if (!userLoggedIn) return;
                this.$store.dispatch('updateHasModal', true);
                this.$store.dispatch('updateActiveModal', 'review');
            }
        }
    }

</script>

<style lang="css" scoped>
    .textAreaNotes {
        width: auto;
        height: 100px;
    }
</style>