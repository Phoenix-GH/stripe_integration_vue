<template lang="html">
    <div>
        <!-- BANNER -->
        <div class="banner bg--black bg--wood jagged jagged--fog">
            <div class="banner__content container container--fw is--reversed">
                <div class="wrapper">
                    <div class="wrapper__inner">
                        <h1 class="ts--headline">The Self Made Man Podcast</h1>
                        <p class="ts--title is--secondary">Listen to the #1 Ranked Self-Help Podcast With Over 2.5 Million downloads.</p>
                    </div>
                    <div class="wrapper__inner" style="width:300px;">
                        <div class="sub__providers">
                            <span class="fontSize--xs color--white is--emphasis">Subscribe for Free On:</span>
                            <ul class="list list--inline padding--s no--pad-lr no--pad-b margin--s no--margin-lr no--margin-b border--1 border--solid border--lightest no--border-lr no--border-b">
                                <li class="item">
                                    <a href="http://www.stitcher.com/podcast/mikedillard/self-made-man" target="_blank">
                                        <img src="../../assets/img/logo-stitcher.png" alt="Subscribe on Stitcher" height="16px">
                                    </a>
                                </li>
                                <li class="item" style="transform:translateY(-3px);">
                                    <a href="https://itunes.apple.com/us/podcast/self-made-man/id982006298" target="_blank">
                                        <img src="../../assets/img/logo-itunes.png" alt="Subscribe on iTunes" height="16px">
                                    </a>
                                </li>
                                <li class="item">
                                    <a href="https://open.spotify.com/show/0uXeh6eiLltvfDfZHD6kyc" target="_blank">
                                        <img src="../../assets/img/logo-spotify.png" alt="Subscribe on Spotify" height="16px">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /BANNER -->



        <!-- CLASS LIST -->
        <div class="content__section row container container--fw">

            <div class="row grid">

                <!-- SINGLE CLASS -->
                <div v-for="podcast in currentPodcasts" class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                    <a @click="openPodcast(podcast)" class="class__thumb" href="javascript:;">
                        <img :src="podcast.thumbImageUrl" alt="">
                        <span class="btn__play btn--s btn--secondary is--podcast"></span>
                    </a>
                    <div class="class__info">
                        <a class="link">{{ podcast.title }}</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" :style="{ 'background-image': 'url(' + podcast.instructor.profileImage + ')' }"></span>{{
                                    podcast.instructor.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- /SINGLE CLASS -->

                    <!-- PAGINATION LOADER -->
                    <!--
                    NOTE: Infinite scroll pagination. The page should load up to 12 episodes at a time and the below loader div should only display while content is loading.
                -->
                <div v-if="showLoading" id="paginationLoader" class="padding--m align--center">
                    <div class="loader loader--l color--fog"><span></span></div>
                </div>
                <!-- /PAGINATION LOADER -->

            </div>

        </div>
        <!-- /CLASS LIST -->
    </div>
</template>

<script>
import { Class, User } from '../../api';
import { uploadToS3 } from '../../api/uploader';
import { eventBus } from '../../main';
import { timeSince } from '../../helpers/util';

export default {
    data: function () {
        return {
            statusMessage: 'Please select a file',
            image: '',
            message: '',
            embedString: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/309041947&amp;color=fed04c&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
            podcasts: [],
            isLoading: false
        }
    },
    created() {
        eventBus.$on('uploadProgress', (data) => {
            console.log("upload progress " + data.percentCompleted + "%");
        });
        this.updatePodcasts();
    },
    computed: {
        currentPodcasts() {
            return this.podcasts;
        },
        showLoading() {
            return this.isLoading;
        }
    },
    methods: {
        podcastTime(podcast) {
            let airDate = podcast.airDate;
            console.log(airDate);
            let date = new Date(airDate);
            console.log(date);
            if (airDate != undefined) {
                return `${timeSince(date)} ago`;
            } else {
                return '';
            }

        },
        updatePodcasts() {
            let _this = this;
            this.isLoading = true;
            Class.listPodcasts(this, podcasts => {
                _this.podcasts = podcasts;
                _this.isLoading = false;
                console.log(_this.podcasts);
            })
        },
        openPodcast(podcast) {
            console.log('opening podcast ' + podcast._id);
            this.$store.dispatch('updateActivePodcast', podcast);
            this.$router.push({ name: 'singlepodcast', params: { id: podcast._id } });
        }
    }
};

</script>

<style lang="css" scoped>

</style>
