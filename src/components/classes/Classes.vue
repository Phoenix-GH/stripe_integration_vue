<template>
    <div>

        <!-- BANNER -->
        <div class="banner banner--m go go--bottom" :style="{ 'background-image': 'url(' + updateFeaturedClass.bannerImageUrl + ')' }">
            <div class="banner__content container container--fw container--l is--reversed">
                <div class="wrapper">
                    <div class="banner__text wrapper__inner">
                        <a id="mobilePlay" class="btn__play" href="javascript:;" @click="updateCurrentClass(updateFeaturedClass)">Watch</a>
                        <span class="banner__featured ts--title is--secondary">Featured in &mdash; {{ topicList }}</span>
                        <a class="banner__title ts--display link" @click="updateCurrentClass(updateFeaturedClass)">{{ updateFeaturedClass.title }}</a>
                        <div class="divider divider--s"></div>
                        <ul class="list list--inline list--divided list--box">
                            <li class="item has--icon">
                                <span class="avatar avatar--m" :style="{ 'background-image': 'url(' + updateFeaturedClass.instructor.profileImage + ')' }"></span>
                                <a class="link link--secondary" href="javascript:;">{{ updateFeaturedClass.instructor.name }}</a>
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up color--white">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="javascript:;">{{ updateFeaturedClass.positiveReviewCount }}</a>
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-users color--white">
                                    <use xlink:href="#icon-users"></use>
                                </svg>
                                {{ updateFeaturedClass.studentCount }}
                            </li>
                        </ul>
                    </div>
                    <div class="banner__play wrapper__inner align--right">
                        <a @click="updateCurrentClass(updateFeaturedClass)" class="btn__play btn--l" href="javascript:;">Watch</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- /BANNER -->

        <!-- CATEGORIES NAV -->
        <div id="categoryTabs" class="bg--white">
            <ul class="tab__group bg--white">
                <li class="item" :class="{'is--active': selectedCategory == 'mindset'}" @click="catClicked('mindset')">
                    <svg class="icon-mindset icon--m">
                        <use xlink:href="#icon-mindset"></use>
                    </svg>
                    <span class="tab__title">Mindset<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'productivity'}" @click="catClicked('productivity')">
                    <svg class="icon-productivity icon--m">
                        <use xlink:href="#icon-productivity"></use>
                    </svg>
                    <span class="tab__title">Productivity<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'entrepreneurship'}" @click="catClicked('entrepreneurship')">
                    <svg class="icon-entrepreneurship icon--m">
                        <use xlink:href="#icon-entrepreneurship"></use>
                    </svg>
                    <span class="tab__title">Entrepreneurship<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'money'}" @click="catClicked('money')">
                    <svg class="icon-money icon--m">
                        <use xlink:href="#icon-money"></use>
                    </svg>
                    <span class="tab__title">Money<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'giving'}" @click="catClicked('giving')">
                    <svg class="icon-giving icon--m">
                        <use xlink:href="#icon-giving"></use>
                    </svg>
                    <span class="tab__title">Giving
                        <span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span>
                    </span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'fitness'}" @click="catClicked('fitness')">
                    <svg class="icon-health-fitness icon--m">
                        <use xlink:href="#icon-health-fitness"></use>
                    </svg>
                    <span class="tab__title">Health &amp; Fitness<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'defense'}" @click="catClicked('defense')">
                    <svg class="icon-defense icon--m">
                        <use xlink:href="#icon-defense"></use>
                    </svg>
                    <span class="tab__title">Defense<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'lifestyle'}" @click="catClicked('lifestyle')">
                    <svg class="icon-lifestyle icon--m">
                        <use xlink:href="#icon-lifestyle"></use>
                    </svg>
                    <span class="tab__title">Lifestyle<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'relationships'}" @click="catClicked('relationships')">
                    <svg class="icon-relationships icon--m">
                        <use xlink:href="#icon-relationships"></use>
                    </svg>
                    <span class="tab__title">Relationships<span class="tab__close"><svg class="icon-close icon--xs"><use xlink:href="#icon-close"></use></svg></span></span>
                </li>
            </ul>
        </div>
        <!-- /CATEGORIES NAV -->

        <!-- CATEGORIES NAV (MOBILE)-->
        <div id="categoryDropdown">
            <div class="input input--dropdown" data-name="categorySelector">
                <!-- <label>Categories</label> -->
                <span class="input__field">Make a Selection</span>
                <ul class="dropdown__list">
                    <li class="item">All</li>
                    <li class="item">Mindset</li>
                    <li class="item">Productivity</li>
                    <li class="item">Entrepreneurship</li>
                    <li class="item">Money</li>
                    <li class="item">Giving</li>
                    <li class="item">Health &amp; Fitness</li>
                    <li class="item">Defense</li>
                    <li class="item">Lifestyle</li>
                    <li class="item">Relationships</li>
                </ul>
            </div>
        </div>
        <!-- /CATEGORIES NAV (MOBILE)-->

        <!-- CLASS LIST -->
        <div class="content__section row container container--fw">

            <div class="wrapper heading">
                <div class="wrapper__inner fontSize--m">
                    Sort by:
                    <span class="link link--dropdown has--dropdown is--inline">
                {{ currentSort }}
                <ul class="list list--nav">
                    <li class="item" @click="sortClasses('newest')">
                        <a>Newest First</a>
                    </li>
                    <li class="item" @click="sortClasses('highest')">
                        <a>Highest Rated</a>
                    </li>
                    <li class="item" @click="sortClasses('popular')">
                        <a>Most Popular</a>
                    </li>
                </ul>
            </span>
                </div>
                <div class="wrapper__inner align--right" v-if="selectedCategory.length > 0">
                    <button @click="followTopic" v-if="!followingTopic" class="btn btn--secondary">Follow</button>
                    <button @click="unFollowTopic" v-if="followingTopic" class="btn btn--secondary">Following</button>
                </div>
            </div>

            <div class="row grid">

                <!-- SINGLE CLASS -->
                <div v-for="course in currentResults" class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2" data-progress="0">
                    <a class="class__thumb" @click="updateCurrentClass(course)">
                        <img :src="course.thumbImageUrl" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap"><svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>{{ readableCourseDuration(course.duration) }}</span>
                    </a>
                    <div class="class__info">
                        <a class="link" @click.stop="updateCurrentClass(course)">{{ course.title }}</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + course.instructor.profileImage + ')' }"></span>{{
                                course.instructor.name }}
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary">{{ courseReviewCount(course) }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

            </div>

        </div>
        <!-- /CLASS LIST -->
    </div>
</template>

<script>
    import { Class, User } from '../../api';
    import { mapGetters } from 'vuex';
    import { eventBus } from '../../main';
    import { convertSecondsToReadableFormat } from '../../helpers/util';

    export default {
        data: function () {
            return {
                currentSort: 'Newest First',
                currentResults: [],
                selectedCategory: '',
            }
        },
        computed: {
            ...mapGetters([
                'user', 'savedClasses', 'classesInProgress', 'classes', 'userLoggedIn', 'featuredClasses', 'classesByTopic'
            ]),
            showFollow() {
                return (this.selectedCategory.length > 0) ? true : false;
            },
            updateFeaturedClass() {
                if (this.featuredClasses.length > 0) {
                    return this.featuredClasses[0];
                }
            },
            topicList() {
                if (this.featuredClasses.length > 0) {
                    let course = this.featuredClasses[0];
                    let str = course.topics.join(" ");
                    return str;
                }
            },
            currentResults() {
                return this.currentResults;
            },
            followingTopic() {
                if (!this.userLoggedIn) return false;
                let filteredTopic = this.user.followedTopics.filter(topic => {
                    if (topic == this.toTitleCase(this.selectedCategory)) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(topic => { return topic; });
                if (filteredTopic.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            courseReviewCount(course) {
                if (course.positiveReviewCount == null) {
                    return "No reviews yet.";
                } else {
                    return `${course.positiveReviewCount}`;
                }
            },
            toTitleCase(str) {
                return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            },
            followTopic() {
                let _selectedCategory = this.toTitleCase(this.selectedCategory);
                let _userTopics = this.user.followedTopics;
                let topicSet = new Set(_userTopics);
                topicSet.add(_selectedCategory);
                let newArray = Array.from(topicSet);
                User.updateUser(this, { followedTopics: newArray });
            },
            unFollowTopic() {
                let _selectedCategory = this.toTitleCase(this.selectedCategory);
                let _userTopics = this.user.followedTopics;
                let topicSet = new Set(_userTopics);
                topicSet.delete(_selectedCategory);
                let newArray = Array.from(topicSet);
                User.updateUser(this, { followedTopics: newArray });
            },
            sortByNewest() {
                Class.recentClasses(this, (data) => {
                    this.currentResults = data;
                });
            },
            sortByViewCount() {
                Class.mostPopular(this, (data) => {
                    this.currentResults = data;
                });
            },
            sortByRating() {
                Class.highestRated(this, (data) => {
                    this.currentResults = data;
                });
            },
            catClicked(topic) {

                //highlight or clear topic selection
                this.selectedCategory = this.selectedCategory == topic ? this.selectedCategory = "" : this.selectedCategory = topic;
                if (this.selectedCategory.length > 0) {
                    //if there is an existing topic cached, use that
                    let searchTopic = this.toTitleCase(topic);
                    //filter this.classes into current results
                    let _filterClasses = this.classes.filter(fClass => {
                        if (fClass.topics.indexOf(searchTopic) > -1) {
                            //In the array!
                            return true;
                        } else {
                            //Not in the array
                            return false;
                        }
                    }).map(fClass => { return fClass; });
                    this.currentResults = _filterClasses;
                } else {
                    this.currentResults = this.classes;
                }

            },
            sortClasses(search) {
                switch (search) {
                    case 'newest':
                        this.currentSort = 'Newest First';
                        this.sortByNewest();
                        break;
                    case 'popular':
                        this.currentSort = 'Most Popular';
                        this.sortByViewCount();
                        break;
                    case 'highest':
                        this.currentSort = 'Highest Rated';
                        this.sortByRating();
                        break;
                    default:
                        this.currentSort = 'Newest First';
                }
            },
            updateCurrentClass(course) {
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
            readableCourseDuration(duration) {
                return convertSecondsToReadableFormat(duration);
            }
        },
        created() {
            this.currentResults = this.classes;
            eventBus.$on('topicChanged', (data) => {
                this.catClicked(data.topic);
            })
            let _this = this;
            Class.recentClasses(this, (data) => {
                _this.currentResults = data;
            });
            Class.featuredClasses(this);
            let cat = this.$route.query.topic;
            if (cat != undefined) {
                if (cat.length > 0) {
                    this.catClicked(cat);
                }
            }

            if (this.userLoggedIn) {
                Class.inProgress(this);
                Class.masterClasses(this);
                Class.completed(this);
            }

        }
    }

</script>

<style lang="css">

</style>