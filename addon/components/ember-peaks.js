import Component from "@ember/component";
import layout from "../templates/components/ember-peaks";
import Peaks from "peaks.js";

export default Component.extend({
  layout,

  instance: null,

  ready: false,

  didInsertElement() {
    let sec = 0;
    let counter = setInterval(() => {
      this.set("seconds", ++sec);
    }, 1000);

    const options = {
      container: document.querySelector("#peaks-container"),
      mediaElement: document.querySelector("audio"),
      //zoomLevels: [512, 1024, 2048, 4096],
      height: 400,
      dataUri: {
        json: this.json
      }
    };
    this.instance = Peaks.init(options, (err, peaks) => {
      // Do something when the waveform is displayed and ready
      clearInterval(counter);
      this.set("ready", true);
    });

    this.instance.player.onplay = () => {
      alert("Wha Hey");
    };
  },

  actions: {
    play() {
      alert("ply");
      this.instance.player.play();
    }
  }
});
