<template>
  <div class="content" ref="content">
    <video id="videoPlayer"></video>
  </div>
</template>

<script>
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
    this.socket.on('reset', () => {
      console.log('Received reset command');
      this.reset();
    });
  },

  mounted() {
    this.videoPlayer = document.getElementById("videoPlayer");

    // Show/hide player when player started/finished the playback
    this.videoPlayer.addEventListener('play', (event) => {
      this.hideImage();
      this.showPlayer(true);
    });

    this.videoPlayer.addEventListener('ended', (event) => {
      this.reset();
    });

    this.videoPlayer.addEventListener('error', (event) => {
      let error = {node: config.node, error: event};
      console.error("Got error", error);
      this.socket.emit('error', error);

      this.reset();
    });

    // Load initial content
    this.reset();
  },

  methods: {
    playVideo(filename, loop = false) {
      let source = "/videos/" + filename;

      this.videoPlayer.src = source;
      this.videoPlayer.loop = loop;
      this.videoPlayer.load();
      this.videoPlayer.play();
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
.content {
  width: 100%;
  height: 100%;
  background-size: cover;
}

#videoPlayer {
  width: 100vw;
  height: 100vh;
}

</style>
