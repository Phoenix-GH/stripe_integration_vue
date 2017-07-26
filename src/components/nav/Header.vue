<template lang="html">
    <div class="page__block">
        <transition name="fadet">
            <div class="loading__overlay" v-if="showSpinner">
                <div class="loader"><span></span></div>
            </div>
        </transition>


        <!-- Alert -->
        <div class="alert2" :class="{'shouldHide': shouldHideAlert}">
            Get unlimited access to every lesson…
            <a href="javascript:;" @click="upgradeAccount">Upgrade Now!</a>
            <svg @click="hideAlert" class="icon-close">
                <use xlink:href="#icon-close"></use>
            </svg>
        </div>

        <!-- ===== MAIN NAVIGATION ===== -->
        <div :class="{alertMargin: !shouldHideAlert, noAlertMargin: shouldHideAlert}">
            <header class="header header__main wrapper">
                <router-link class="logo logo_smm" :to="{ name: 'landing' }">Self Made Man</router-link>
                <div class="main__nav">
                    <nav class="wrapper">
                        <ul class="list list--inline wrapper__inner">
                            <li id="navBrowse" class="item has--icon">
                                <router-link class="link" :to="{ name: 'classes' }">
                                    <svg class="icon-grid color--brand">
                                        <use xlink:href="#icon-grid"></use>
                                    </svg>
                                    <span class="mobile--hide">Classes</span></router-link>
                            </li>
                            <li class="item mobile--hide">
                                <router-link class="link" :to="{ name: 'podcasts' }">Podcast</router-link>
                            </li>
                        </ul>
                        <div class="wrapper__inner align--right">
                            <ul id="userNav" class="list list--inline list--divided">

                                <!-- LOGGED IN NAV -->

                                <!-- Challenges -->
                                <li id="navChallenges" class="item has--icon has--popover is--active">
                                    <a class="link">
                                        <svg class="icon-trophy color--brand"><use xlink:href="#icon-trophy"></use>
                                        </svg><span class="hide--m">Challenges</span>
                                    </a>
                                    <ul class="challenge__box list list--nav list--dropdown">
                                        <li class="item">
                                            <svg class="icon-trophy icon--l color--brand"><use xlink:href="#icon-trophy"></use></svg>
                                            <div class="ts--title is--secondary">
                                                Quick-Start Challenge:
                                            </div>
                                            <div class="ts--headline">
                                                Complete 3 Lessons
                                            </div>
                                        </li>
                                        <li class="item item--bottom">
                                            <ul class="list list--progress">
                                                <li class="is--complete" style="background-image:url('https://images.contentful.com/neuh3uvg7bz8/1re746Kr3e6UgEKSqkWUWo/4dcb1cff3d920e24c405402ac204ebbd/vanessa-thumb.jpg')" data-step="1"></li>
                                                <li data-step="2"></li>
                                                <li data-step="3"></li>
                                            </ul>
                                        </li>
                                        <li class="challenge__explainer">
                                            <a class="link">Details</a>
                                        </li>
                                    </ul>
                                </li>

                                <!-- Classes -->
                                <li id="navClasses" class="item">
                                    <ul class="list list--inline">

                                        <!-- NOTE: Display on 'Paid Account' -->
                                        <li v-if="showClassLinks" id="navClasses" class="item">
                                            <router-link class="link has--badge is--primary" :to="{ name: 'myclasses' }" :data-badge="classesInProgress.length">My Classes</router-link>
                                        </li>
                                        <!-- /NOTE -->

                                        <!-- NOTE: Display on 'All Accounts' -->
                                        <li v-if="userLoggedIn" id="navSaved" class="item">
                                            <router-link class="link has--badge is--secondary" :to="{ name: 'saved' }" :data-badge="savedClasses.length">Saved</router-link>
                                        </li>
                                        <!-- /NOTE -->

                                    </ul>
                                </li>

                                <!-- NOTE: Display on 'All Accounts' -->
                                <li id="navAccount" class="item has--popover" :class="{'is--active': profileMenuVisible}" v-if="userLoggedIn" @click.stop="showProfileMenu">
                                    <div class="avatar avatar--m" :style="{ 'background-image': 'url(' + profileImage + ')' }"></div>
                                    <a class="link link--dropdown"><span class="mobile--hide">{{ user ? user.firstName : "" }}</span></a>
                                    <ul class="list list--nav list--dropdown">
                                        <li class="item show--s hide--s hide--m hide--l hide--xl hide--xxl">
                                            <a class="has--badge is--primary" data-badge="0" href="/my-classes" v-if="showClassLinks">My Classes</a>
                                        </li>
                                        <li class="item show--s hide--s hide--m hide--l hide--xl hide--xxl">
                                            <a class="has--badge" data-badge="0" href="/saved">Saved</a>
                                        </li>
                                        <li class="item">
                                            <router-link :to="{ name: 'account' }">
                                                <svg class="icon-account icon--s">
                                                    <use xlink:href="#icon-account"></use>
                                                </svg>
                                                My Profile</router-link>
                                        </li>
                                        <li class="item">
                                            <router-link :to="{ name: 'billing' }">
                                                <svg class="icon-billing icon--s">
                                                    <use xlink:href="#icon-billing"></use>
                                                </svg>
                                                Billing
                                            </router-link>
                                        </li>
                                        <li class="item">
                                            <router-link :to="{ name: 'referrals' }">
                                                <svg class="icon-reward icon--s">
                                                    <use xlink:href="#icon-reward"></use>
                                                </svg>
                                                Refer a Friend
                                            </router-link>
                                        </li>
                                        <li class="item is--divided" @click="logOut">
                                            <router-link :to="{ name: 'landing' }">
                                                <svg class="icon-lock icon--s">
                                                    <use xlink:href="#icon-lock"></use>
                                                </svg>
                                                Sign Out
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                                <!-- /NOTE -->

                                <!-- NOTE: Display on 'Free Accounts' only -->
                                <li id="navUpgrade" class="item hide--s" v-if="showUpgrade">
                                    <button class="btn btn--primary is--affirmative" @click="upgradeAccount">Upgrade</button>
                                </li>

                                <!-- /NOTE -->
                                <!-- /LOGGED IN NAV -->

                                <!-- LOGGED OUT NAV -->
                                <li id="navLoggedOut" class="item hide--s" v-if="!userLoggedIn">
                                    <ul class="list list--inline">
                                        <li class="item" @click="showLogin">
                                            <a class="link modal--toggle" href="javascript:;">Log In</a>
                                        </li>
                                        <li class="item" @click="showSignup">
                                            <button class="btn btn--primary is--affirmative modal--toggle">Sign Up</button>
                                        </li>
                                    </ul>
                                </li>
                                <li class="item show--s hide--s hide--m hide--l hide--xl hide--xxl" v-if="!userLoggedIn">
                                    <a @click="showLogin" class="link" href="javascript:;">Log In</a>
                                </li>
                                <!-- /LOGGED OUT NAV -->
                            </ul>
                        </div>
                    </nav>
                    <div class="input input--search">
                        <input @keyup.enter="searchPage" v-model="searchTerms" type="text" id="siteSearch" placeholder="Search for classes and podcast episodes…">
                    </div>
                </div>
            </header>
        </div>

        <div class="control__bar fixed--bottom bg--positive show--s hide--s hide--m hide--l hide--xl hide--xxl align--center ts--headline color--white"
            @click="showSignup" v-if="!userLoggedIn">
            Sign Up
        </div>

        <div class="control__bar fixed--bottom bg--positive show--s hide--s hide--m hide--l hide--xl hide--xxl align--center ts--headline color--white"
            @click="upgradeAccount" v-if="showUpgrade">
            Upgrade
        </div>
        <!-- ===== /MAIN NAVIGATION ===== -->

        <!-- ===== SEARCH DROPDOWN ===== -->
        <div id="searchResults" class="search overflow">
            <div class="search__results">
                <div class="container container--fw container--l">
                    <div class="wrapper">
                        <div class="wrapper__inner">
                            <div class="search__helper">
                                <span class="helper__text">{{helperText}}</span>
                                <span class="helper__query">{{helperQuery}}</span>
                                <span class="helper__ellips">...</span>
                            </div>
                        </div>
                        <div class="wrapper__inner align--right">
                            <svg id="closeSearch" class="icon-close" @click="closeOverlay">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="results row">

                        <!-- CLASS RESULTS -->
                        <div class="col col--5-of-12">
                            <div class="results__head">
                                Classes
                                <div class="loader"><span></span></div>
                            </div>
                            <div class="results__list">
                                <!-- EMPTY RESULTS -->
                                <div v-if="topFoundClasses.length == 0" class="well is--empty align--center">
                                    No matching classes...
                                </div>
                                <!-- /EMPTY RESULTS -->

                                <!-- SINGLE RESULT -->
                                <div v-for="course in topFoundClasses" class="result is--class">
                                    <div class="meta" @click="openCourse(course)">
                                        <div class="thumb" :style="{ 'background-image': 'url(' + course.thumbImageUrl + ')' }">
                                            <svg class="icon-play">
                                                <use xlink:href="#icon-play"></use>
                                            </svg>
                                        </div>
                                        <span class="ts--title truncate link">{{ course.title }}</span>
                                        <ul class="list list--inline list--divided">
                                            <li class="item has--icon">
                                                <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + course.instructor.profileImage + ')' }"></span>                                                {{ course.instructor.name }}
                                            </li>
                                            <li class="item has--icon">
                                                <svg class="icon-thumbs-up">
                                                    <use xlink:href="#icon-thumbs-up"></use>
                                                </svg>
                                                {{ course.positiveReviewCount ? course.positiveReviewCount : 0 }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- /SINGLE RESULT -->

                                <div class="well no--border-lr no--border-b no--radius no--pad-lr">
                                    <button @click="searchPage" class="btn btn--secondary btn--block is--link" v-html='classCountText'></button>
                                </div>

                            </div>
                        </div>
                        <!-- /CLASS RESULTS -->

                        <!-- PODCAST RESULTS -->
                        <div class="col col--5-of-12 col--push-1-of-12">
                            <div class="results__head">
                                Podcasts
                                <div class="loader"><span></span></div>
                            </div>

                            <div class="results__list">
                                <!-- EMPTY RESULTS -->
                                <div v-if="topFoundPodcasts.length == 0" class="well is--empty align--center">
                                    No matching podcasts...
                                </div>
                                <!-- /EMPTY RESULTS -->

                                <!-- SINGLE RESULT -->
                                <div v-for="podcast in topFoundPodcasts" class="result is--podcast">
                                    <div class="meta" @click="openPodcast(podcast)">
                                        <div class="thumb" :style="{ 'background-image': 'url(' + podcast.thumbImageUrl + ')' }">
                                            <svg class="icon-podcast">
                                                <use xlink:href="#icon-podcast"></use>
                                            </svg>
                                        </div>
                                        <span class="ts--title truncate link">{{ podcast.title }}</span>
                                        <ul class="list list--inline list--divided">
                                            <li class="item has--icon">
                                                <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + podcast.instructor.profileImage + ')' }"></span>                                                {{ podcast.instructor.name }}
                                            </li>
                                            <li class="item has--icon">
                                                <svg class="icon-date">
                                                    <use xlink:href="#icon-date"></use>
                                                </svg>
                                                {{ podcast.airDate }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- /SINGLE RESULT -->

                                <div class="well no--border-lr no--border-b no--radius no--pad-lr">
                                    <button @click="searchPage" class="btn btn--secondary btn--block" v-html='podcastCountText'></button>
                                </div>

                            </div>

                        </div>
                        <!-- /PODCAST RESULTS -->

                    </div>
                </div>
            </div>
            <div class="search__overlay" @click="closeOverlay"></div>
        </div>
        <!-- ===== /SEARCH DROPDOWN ===== -->

    </div>
</template>

<script>
    import { purgeAll } from '../../store/index';
    import { User, Class } from '../../api';
    import { mapGetters } from 'vuex';

    //import the event bus
    import { eventBus } from '../../main';
    import $ from 'jquery';

    export default {
        created() {
            eventBus.$on('closeMenu', () => {
                this.profileMenuVisible = false;
            })
        },
        data: function () {
            return {
                profileMenuVisible: false,
                searchTerms: "",
                helperText: "",
                helperQuery: "",
                showLoader: true,
                showResultsList: false,
                searchResults: [],
                stripeHandler: {},
                closedAlert: false,
                classSearchCount: 0,
                podcastSearchCount: 0,
                classCountText:'',
                podcastCountText:''
            }
        },
        computed: {
            ...mapGetters([
                'user', 'classesInProgress', 'userLoggedIn', 'showSpinner', 'savedClasses'
            ]),
            showUpgrade() {
                if ((this.userLoggedIn) && (this.user.subscriptionType == 'free')) {
                    return true;
                } else {
                    return false;
                }
            },
            showClassLinks() {
                if ((this.userLoggedIn) && (this.user.subscriptionType != 'free')) {
                    return true;
                } else {
                    return false;
                }
            },
            profileImage() {
                if ((this.userLoggedIn) && (this.user.profileImageUrl)) {
                    return this.user.profileImageUrl;
                } else {
                    return "http://www.renurban.com/sites/default/files/pictures/picture-36-1450346274.jpg";
                }
            },
            willShowLoader() {
                return this.showLoader;
            },
            willShowResults() {
                return this.showResultsList;
            },
            updateSearchResults() {
                return this.searchResults;
            },
            shouldHideAlert() {
                if (this.closedAlert) return true;
                if (this.userLoggedIn && (this.user.subscriptionType != 'free')) return true;
                if (!this.userLoggedIn) return true;
                return false;
            },
            topFoundClasses() {
                let _classes = this.searchResults.filter(result => {
                    if (result.type == 'Class') {
                        return true;
                    } else {
                        return false;
                    }
                }).map(result => { return result; });
                if (_classes.length > 1) {
                    let top2 = [_classes[0], _classes[1]]
                    return top2
                } else {
                    return _classes;
                }
            },
            topFoundPodcasts() {
                let _podcasts = this.searchResults.filter(result => {
                    if (result.type == 'Podcast') {
                        return true;
                    } else {
                        return false;
                    }
                }).map(result => { return result; });
                if (_podcasts.length > 1) {
                    let top2 = [_podcasts[0], _podcasts[1]]
                    return top2
                } else {
                    return _podcasts;
                }
            }
        },
        watch: {
            searchTerms(val) {
                if (val.length > 0) {
                    $('body').addClass('is--searching');
                    $('html').css({ 'overflow-y': 'hidden' });
                    this.helperText = "Searching for ";
                    this.helperQuery = ` ${val} `;
                    let _this = this;
                    Class.searchClasses(this, val, result => {
                        if (result.status == 'success') {
                            _this.searchResults = result.data;

                            //update counts
                            let classCount = result.data.filter(obj => {
                                if (obj.type == 'Class') {
                                    return true;
                                } else {
                                    return false;
                                }
                            }).map(obj => { return obj; });
                            _this.classSearchCount = classCount.length;
                            _this.classCountText = "More Results ("+ classCount.length+")";

                            let podcastCount = result.data.filter(obj => {
                                if (obj.type == 'Podcast') {
                                    return true;
                                } else {
                                    return false;
                                }
                            }).map(obj => { return obj; });
                            _this.podcastSearchCount = podcastCount.length;
                            _this.podcastCountText = "More Results ("+ podcastCount.length+")"
                            //update results
                            _this.foundResults();


                        } else {
                            _this.searchResults = [];
                            _this.noResultsFound();
                        }
                    })
                } else {
                    this.closeOverlay();
                }
            }
        },
        methods: {
            showProfileMenu() {
                if (this.profileMenuVisible) {
                    this.profileMenuVisible = false;
                } else {
                    this.profileMenuVisible = true;
                }
            },
            showLogin() {
                purgeAll();
                this.$store.dispatch('updateHasModal', true);
                this.$store.dispatch('updateActiveModal', 'login');

            },
            showSignup() {
                purgeAll();
                this.$store.dispatch('updateHasModal', true);
                this.$store.dispatch('updateActiveModal', 'signup');
            },
            logOut() {
                User.logout(this);
                purgeAll();
                this.$router.push({ name: 'home' });
            },
            closeOverlay() {
                $('body').removeClass('is--searching found--results');
                $('html').css({ 'overflow-y': 'auto' });
                $('#searchResults .results__list').fadeOut();
                $('#searchResults .loader').fadeIn();
                $('#siteSearch').val('');
                this.searchTerms = "";
            },
            foundResults() {
                this.helperText = "Press 'Enter' to search for ";
                $('body').addClass('found--results');
                $('#searchResults .results__list').fadeIn();
                $('#searchResults .loader').fadeOut();
            },
            noResultsFound() {
                this.helperText = "No results found ";
                $('body').addClass('found--results');
                $('#searchResults .results__list').fadeIn();
                $('#searchResults .loader').fadeOut();
            },
            searchPage() {
                let terms = this.searchTerms;
                eventBus.$emit('updateSearchTerms', terms);
                this.closeOverlay();
                this.$router.push({ name: 'searchresults', query: { terms: terms } });
            },
            openCourse(course) {
                this.closeOverlay();
                this.$store.dispatch('updateActiveCourse', course);
                this.$router.push({ name: 'singleclass', params: { id: course._id } });
            },
            openPodcast(podcast) {
                this.closeOverlay();
                this.$router.push({ name: 'singlepodcast', params: { id: podcast._id } });
            },
            hideAlert() {
                this.closedAlert = true;
            },
            upgradeAccount() {
                this.$router.push({ name: 'upgradeaccount' });
            }
        }
    }

</script>

<style scoped>
    .fadet-enter-active,
    .fadet-leave-active {
        transition: opacity .7s
    }

    .fadet-enter,
    .fadet-leave-to
    /* .fade-leave-active in <2.1.8 */

    {
        opacity: 0
    }

    .shouldHide {
        display: none;
    }

    .alertMargin {
        margin-top: 48px;
        transition: 200ms linear all
    }

    .noAlertMargin {
        margin-top: 0px;
        transition: 200ms linear all
    }

    .alert2 {
        width: 100%;
        height: 48px;
        line-height: 48px;
        top: 0;
        color: #FFFFFF;
        text-align: left;
        padding-left: 16px;
        padding-right: 20%;
        box-sizing: border-box;
        white-space: nowrap;
        overflow-x: auto;
        background-color: #0086FF;
        position: fixed;
        z-index: 999;
    }

    .alert2 .icon-close {
        width: 18px;
        height: 18px;
        right: 16px;
        top: 14px;
        opacity: 0.6;
        position: fixed;
        z-index: 1;
        -webkit-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
    }

    .alert2 .icon-close:hover {
        cursor: pointer;
        opacity: 1;
    }

    .alert2::after {
        content: '';
        height: 48px;
        width: 40%;
        display: block;
        top: 0;
        right: 0;
        z-index: 0;
        background: -webkit-linear-gradient(left, rgba(0, 134, 255, 0) 0%, #0086ff 100%);
        background: linear-gradient(to right, rgba(0, 134, 255, 0) 0%, #0086ff 100%);
        pointer-events: none;
    }

    .alert2 a {
        color: #FFFFFF;
        margin-left: 16px;
        font-weight: 600;
        -webkit-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
    }

    @media (min-width: 30em) {
        .alert2 {
            text-align: center;
            padding-right: 0;
        }
        .alert2::after {
            display: none;
        }
    }
</style>
