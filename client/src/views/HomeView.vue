<template>
  <div class="content" ref="content">
    <video id="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import io from "socket.io-client";

import config from '@/config.js'

export default {
  data() {
    return {
      videoPlayer: null,
    };
  },

  created() {
    // Connect to server
    this.socket = io(config.serverUrl, {transports: ["websocket"]});
    this.socket.on("connect", () => {
      console.log("Connected to server");

      // Present yourself to server
      this.socket.emit('join', config.node);
    });

    // Handle play command
    this.socket.on('play_video', (args) => {
      console.log('Received play_video command:', args);
      let videoName = args.name;
      let loop = args.loop || false;
      this.playVideo(videoName, loop);
    });

    // Handle reset command
    this.socket.on('reset', (args) => {
      console.log('Received reset command:', args);
      this.reset();
    });
  },

  mounted() {
    this.player = videojs(
        "videoPlayer",
        {controls: false, errorDisplay: false},
        () => {
          this.videoPlayer = document.getElementById("videoPlayer");
          this.reset();
          console.log(this.player.tag);
        });

    // Show/hide player when player started/finished the playback
    this.player.on('play', () => {
      this.hideImage();
      this.showPlayer(true);
    });

    this.player.on('ended', () => {
      this.reset();
    });

    this.player.on('error', () => {
      let error = {node: config.node, error: this.player.error()};
      console.error("Got error", error);
      this.socket.emit('error', error);
    });
  },

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },

  methods: {
    playVideo(filename, loop = false) {
      let source = "/videos/" + filename;

      this.player.src(source);
      this.player.loop(loop);
      this.player.play();
    },

    showImage(filename) {
      this.showPlayer(false);

      let source = "/images/" + filename;
      this.$refs.content.style.backgroundImage = `url(${source})`;
    },

    showPlayer(value) {
      this.videoPlayer.style.visibility = value ? "visible" : "hidden";
    },

    hideImage() {
      this.$refs.content.style.backgroundImage = null;
    },

    reset() {
      this.hideImage();
      this.showPlayer(false);
      this.player.reset();

      // Select default behaviour
      switch (config.initial) {
        case "blank":
          break;

        case "standby_image":
          this.showImage(config.initialContent);
          break;

        case "standby_video":
          this.playVideo(config.initialContent, true);
          break;
      }
    }
  }
}
</script>

<style>
@import 'video.js/dist/video-js.css';

.content {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.video-js {
  width: 100vw;
  height: 100vh;
}

</style>
