<template>
  <div>
    <video-player :options="videoOptions" @player-state-changed="playerStateChanged" ref="myPlayer"></video-player>
    <div>
      <button type="button" @click="changeVideo">Open Logan</button>
    </div>
    <div>
      <button type="button" @click="changeVideo2">Open Wick</button>
    </div>
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
        }
      }
    },
    computed: {
      player() {
        return this.$refs.myPlayer.player;
      }
    },
    methods: {
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