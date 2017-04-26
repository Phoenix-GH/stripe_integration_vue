<template>
    <div>
        <!-- BANNER -->
        <div class="banner banner--m go go--bottom" :style="{ 'background-image': 'url(' + activePodcast.bannerImageUrl + ')' }">
            <div class="banner__content container container--fw container--l is--reversed">
                <div class="wrapper">
                    <div class="banner__text wrapper__inner">
                        <iframe width="640" height="120" scrolling="yes" frameborder="no" :src="activePodcast.podcastUrl"></iframe>
                    </div>
                </div>
            </div>
        </div>
        <!-- /BANNER -->

        <!-- PODCAST EPISODE CONTENT -->
        <div class="content__section no--pad">

            <!-- INFO BAR -->
            <div class="bar padding--m no--pad">
                <div class="container container--fw">
                    <div class="wrapper">

                        <!-- INFO BAR LEFT -->
                        <div class="wrapper__inner padding--l no--pad-lr no--pad-b">

                            <!-- EPISODE INFO -->
                            <h1 class="ts--headline">{{ activePodcast.title }}</h1>
                            <ul class="class__meta list list--inline list--divided">
                                <li class="item has--icon">
                                    <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + activePodcast.instructor.profileImage + ')' }"></span>                                    with {{ activePodcast.instructor.name }}
                                </li>
                                <li class="item has--icon">
                                    <svg class="icon-thumbs-up">
                                        <use xlink:href="#icon-thumbs-up"></use>
                                    </svg>
                                    January 17, 2017
                                </li>
                                <li class="item has--icon">
                                    <svg class="icon-play-count">
                                        <use xlink:href="#icon-play-count"></use>
                                    </svg>
                                    42.K Plays
                                </li>
                            </ul>
                            <!-- /EPISODE INFO -->

                            <!-- EPISODE TABS -->
                            <ul class="class__tabs list list--tabs fontSize--m">
                                <li @click="tappedOnAboutTab" class="item" :class="{'is--active': aboutActive}">
                                    About this Episode
                                </li>
                                <li @click="tappedOnNotesTab" class="item" :class="{'is--active': notesActive}">
                                    Episode Notes
                                </li>
                                <li @click="tappedOnTranscriptTab" class="item" :class="{'is--active': transcriptActive}">
                                    Transcript
                                </li>
                                <li @click="tappedOnCommentsTab" class="item has--badge" data-badge="0" :class="{'is--active': commentsActive}">
                                    Comments
                                </li>
                            </ul>
                            <!-- /EPISODE TABS -->

                        </div>
                        <!-- /INFO BAR LEFT -->

                        <!-- INFO BAR RIGHT -->
                        <div class="wrapper__inner align--right">
                            <div class="sub__providers">
                                <span class="fontSize--xs color--black is--emphasis">Subscribe On:</span>
                                <ul class="list list--inline padding--s no--pad-lr no--pad-b margin--s no--margin-lr no--margin-b border--1 border--solid border--lightest no--border-lr no--border-b">
                                    <li class="item">
                                        <a href="http://www.stitcher.com/podcast/mikedillard/self-made-man" target="_blank">
                                            <img src="../../assets/img/logo-stitcher-c.png" alt="Subscribe on Stitcher" height="16px">
                                        </a>
                                    </li>
                                    <li class="item" style="transform:translateY(-3px);">
                                        <a href="https://itunes.apple.com/us/podcast/self-made-man/id982006298" target="_blank">
                                            <img src="../../assets/img/logo-itunes-c.png" alt="Subscribe on iTunes" height="16px">
                                        </a>
                                    </li>
                                    <li class="item">
                                        <a href="https://open.spotify.com/show/0uXeh6eiLltvfDfZHD6kyc" target="_blank">
                                            <img src="../../assets/img/logo-spotify-c.png" alt="Subscribe on Spotify" height="16px">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- /INFO BAR RIGHT -->

                    </div>
                </div>
            </div>
            <!-- /INFO BAR -->

            <!-- CONTENT -->
            <div class="content__section has--sidebar sidebar--r">
                <div class="container container--fw row row--full-height">
                    <div id="episodeContent" class="col col--6-of-12 no--pad-l">

                        <!-- ABOUT TAB -->
                        <div id="about" class="tab__content dropcap" :class="{'hide': !aboutActive, 'remove': !aboutActive}">
                            <vue-markdown :source="activePodcast.description"></vue-markdown>
                        </div>

                        <!-- /ABOUT TAB -->

                        <!-- EPISODE NOTES TAB -->
                        <div id="episodeNotes" class="tab__content" :class="{'hide': !notesActive, 'remove': !notesActive}">
                            <vue-markdown :source="activePodcast.episodenotes"></vue-markdown>
                        </div>
                        <!-- /EPISODE NOTES TAB -->

                        <!-- TRANSCRIPT TAB -->
                        <div id="transcript" class="tab__content" :class="{'hide': !transcriptActive, 'remove': !transcriptActive}">
                            <vue-markdown :source="activePodcast.transcript"></vue-markdown>
                        </div>
                        <!-- /TRANSCRIPT TAB -->

                        <!-- COMMENTS TAB -->
                        <div id="comments" class="tab__content" :class="{'hide': !commentsActive, 'remove': !commentsActive}">
                            <div class="fb-comments" :data-href="$router.path" data-numposts="10"></div>
                        </div>
                        <!-- /COMMENTS TAB -->

                    </div>
                    <div class="sidebar col col--5-of-12 col--push-1-of-12 bg--fog">
                        <vue-markdown :source="activePodcast.sidebar"></vue-markdown>
                    </div>
                </div>
            </div>
            <!-- CONTENT -->

        </div>
        <!-- /PODCAST EPISODE CONTENT -->

    </div>
</template>

<script>
    import { Class, User } from '../../api';
    import { mapGetters } from 'vuex';
    import VueMarkdown from 'vue-markdown';

    export default {
        data() {
            return {
                currentActiveTab: 'About'
            }
        },
        components: {
            VueMarkdown
        },
        mounted() {
            this.updatePodcast();
        },
        computed: {
            ...mapGetters([
                'user', 'userLoggedIn', 'activePodcast'
            ]),
            currentViewCount() {
                return `${this.activePodcast.viewCount}`;
            },
            notesActive() {
                if (this.currentActiveTab == 'Notes') return true;
                return false;
            },
            aboutActive() {
                if (this.currentActiveTab == 'About') return true;
                return false;
            },
            transcriptActive() {
                if (this.currentActiveTab == 'Transcript') return true;
                return false;
            },
            commentsActive() {
                if (this.currentActiveTab == 'Comments') return true;
                return false;
            },
            showLoading() {
                return this.isLoading;
            }
        },
        methods: {
            updatePodcast() {
                let _this = this;
                this.$store.dispatch('updateSpinner', true);
                Class.podcastDetail(this, this.$route.params.id, podcast => {
                    _this.$store.dispatch('updateActivePodcast', podcast);
                    _this.$store.dispatch('updateSpinner', false);
                }, error => {
                    _this.$store.dispatch('updateSpinner', false);
                    _this.$router.replace({ name: 'podcasts' });
                });
            },
            //methods for handling tab changing
            tappedOnAboutTab() {
                this.currentActiveTab = 'About'
            },
            tappedOnNotesTab() {
                this.currentActiveTab = 'Notes'
            },
            tappedOnTranscriptTab() {
                this.currentActiveTab = 'Transcript'
            },
            tappedOnCommentsTab() {
                this.currentActiveTab = 'Comments'
                if (window.FB) {
                    window.FB.XFBML.parse();
                }
            },
        }
    }

</script>

<style scoped>
    .middle {
        position: absolute;
    }
</style>