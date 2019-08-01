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
      zoomLevels: [512, 1024, 2048, 4096],
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
      this.instance.player.play();
    },
    zoomOut() {
      let view = this.instance.views.getView("zoomview");
      this.instance.zoom.zoomOut();
    },
    zoomINt() {
      let view = this.instance.views.getView("zoomview");
      this.instance.zoom.zoomIn();
    },
    segment(id) {
      this.instance.segments.add({
        startTime: 0,
        endTime: 1000.5,
        label: "0 to 300 seconds",
        color: "#666",
        id: id
      });
    },
    removeSegment(id) {
      this.instance.segments.removeById(id);
    },
    addPoint(id = "doug") {
      this.instance.points.add({
        time: 3.5,
        labelText: "Test point",
        color: "#666",
        id: id
      });
    },
    removePoint(id) {
      this.instance.points.removeById(id);
    },
    markStart() {
      //console.log(this.instance.player.getCurrentTime());
      this.set("segmentStart", this.instance.player.getCurrentTime());
    },
    markEnd() {
      this.set("segmentEnd", this.instance.player.getCurrentTime());
      this.instance.segments.add({
        startTime: this.segmentStart,
        endTime: this.segmentEnd,
        label: "0 to 300 seconds",
        color: "#666"
      });
    }
  }
});
