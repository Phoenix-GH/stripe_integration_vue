<template>
    <div>

        <!-- NEW -->
        <div class="flex__layout">
            <div class="class__container is--theater-mode">
                <div class="video__container">

                    <!-- BANNER -->
                    <div class="banner banner--m go go--bottom" :style="{ 'background-image': 'url(' + activePodcast.bannerImageUrl + ')' }">
                        <div class="banner__content container container--fw container--l is--reversed">
                            <div class="wrapper">
                                <div class="banner__text wrapper__inner">
                                    <div class="row">
                                        <div class="col col--7-of-12">
                                            <iframe width="100%" height="120" scrolling="no" frameborder="no" :src="embedCode"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /BANNER -->

                </div>
                <div class="class__lessons is--podcast">

                    <div class="lessons__layout">

                        <ol class="lessons__list" style="list-style:none;">
                            <li class="heading wrapper">
                                <div class="wrapper__inner">
                                    <ul class="list list--inline">
                                        <li class="item hide remove"></li>
                                        <li class="item">
                                            Episode Resources
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div class="is--md">
                                    <!-- Sidebar Content -->
                                    <vue-markdown :source="activePodcast.sidebar"></vue-markdown>
                                </div>
                            </li>
                        </ol>

                        <div class="lessons__sharing">
                            <div class="well">
                                <div class="sub__providers">
                                    <span class="fontSize--xs color--black is--emphasis">Share this episode:</span>
                                    <ul class="list list--inline padding--s no--pad-lr no--pad-b margin--s no--margin-lr no--margin-b border--1 border--solid border--lightest no--border-lr no--border-b">
                                        <li class="item">
                                            <div class="fb-share-button" :data-href="shareUrl" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fselfmademan.com%2F&amp;src=sdkpreparse">Share</a></div>
                                        </li>
                                        <li class="item">
                                            <div class="disp--ib">
                                                <a href="https://twitter.com/share" class="twitter-share-button" data-show-count="false" :data-url="shareUrl">Tweet</a>
                                            </div>
                                        </li>
                                        <li class="item">
                                            <a class="btn btn--share is--email" href="mailto:support@smm.co">Email</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="class__info is--podcast">

                    <!-- CLASS INFO -->
                    <div class="bar">

                        <div class="wrapper">

                            <!-- INFO BAR LEFT -->
                            <div class="wrapper__inner">
                                <h1 class="class__title ts--headline">
                                    {{ activePodcast.title }}
                                </h1>
                                <ul class="class__meta list list--inline list--divided">
                                    <li class="item has--icon">
                                        <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + activePodcast.instructor.profileImage + ')' }"></span>                                        with {{ activePodcast.instructor.name }}
                                    </li>
                                    <li class="item has--icon">
                                        <svg class="icon-play-count">
                                            <use xlink:href="#icon-play-count"></use>
                                        </svg>
                                        {{ activePodcast.viewCount }}
                                    </li>
                                </ul>
                            </div>
                            <!-- /INFO BAR LEFT -->

                        </div>

                        <!-- CLASS TABS -->
                        <ul class="class__tabs list list--tabs fontSize--m">
                            <li @click="tappedOnAboutTab" class="item" :class="{'is--active': aboutActive}">
                                About this Episode
                            </li>
                            <!-- <li @click="tappedOnNotesTab" class="item" :class="{'is--active': notesActive}">
                                Episode Notes
                            </li>
                            <li @click="tappedOnTranscriptTab" class="item" :class="{'is--active': transcriptActive}">
                                Transcript
                            </li> -->
                            <li @click="tappedOnCommentsTab" class="item has--badge" data-badge="0" :class="{'is--active': commentsActive}">
                                Comments
                            </li>
                        </ul>
                        <!-- /CLASS TABS -->
                    </div>
                    <!-- /CLASS INFO -->

                    <!-- CLASS CONTENT -->
                    <div class="class__tabs">

                        <!-- ABOUT TAB -->
                        <div id="about" class="tab__content dropcap is--md" :class="{'hide': !aboutActive, 'remove': !aboutActive}">
                            <vue-markdown :source="activePodcast.description"></vue-markdown>
                        </div>

                        <!-- /ABOUT TAB -->

                        <!-- EPISODE NOTES TAB -->
                        <div id="episodeNotes" class="tab__content is--md" :class="{'hide': !notesActive, 'remove': !notesActive}">
                            <vue-markdown :source="activePodcast.episodenotes"></vue-markdown>
                        </div>
                        <!-- /EPISODE NOTES TAB -->

                        <!-- TRANSCRIPT TAB -->
                        <div id="transcript" class="tab__content is--md" :class="{'hide': !transcriptActive, 'remove': !transcriptActive}">
                            <vue-markdown :source="activePodcast.transcript"></vue-markdown>
                        </div>
                        <!-- /TRANSCRIPT TAB -->

                        <!-- COMMENTS TAB -->
                        <div id="comments" class="tab__content is--md" :class="{'hide': !commentsActive, 'remove': !commentsActive}">
                            <div class="fb-comments" :data-href="$router.path" data-numposts="10"></div>
                        </div>
                        <!-- /COMMENTS TAB -->

                    </div>
                    <!-- /CLASS CONTENT -->

                </div>
            </div>
        </div>
        <!--/NEW -->

    </div>
</template>

<script>
    import { timeSince } from '../../helpers/util';
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
            twttr.widgets.load();
            if (window.FB) {
                window.FB.XFBML.parse();
            }
            this.$store.dispatch('updateRemovePadding', true);
            var element = document.getElementById("topdoc");
            element.scrollIntoView({ block: "end", behavior: "smooth" });
            console.log("updating active podcast" + this.activePodcast._id);
            this.updatePodcast();

        },
        beforeDestroy() {
            this.$store.dispatch('updateRemovePadding', false);
        },
        computed: {
            ...mapGetters([
                'user', 'userLoggedIn', 'activePodcast'
            ]),
            embedCode() {
                return `${this.activePodcast.podcastUrl}`
            },
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
            },
            shareUrl() {
                return `https://smm.co?ref=${this.user.referralId}`;
            }
        },
        methods: {
            podcastTime(podcast) {
                let airDate = podcast.airDate;
                if (airDate != undefined) {
                    let date = new Date(airDate);
                    return `${timeSince(date)} ago`;
                } else {
                    return '';
                }
            },
            updatePodcast() {
                let _this = this;
                this.$store.dispatch('updateSpinner', true);
                Class.podcastDetail(this, this.$route.params.id, podcast => {
                    _this.$store.dispatch('updateActivePodcast', podcast);
                    _this.$store.dispatch('updateSpinner', false);
                    Class.updateViewCount(_this, podcast._id, count => { console.log('updated count ' + count) })
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