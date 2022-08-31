class VideoManager {
  constructor(options = {}) {
    const defaults = {};
    this.options = _.extend({}, defaults, options);
    this.init();
  }

  init() {
    this.constructor.loadUI();
    this.loadListeners();
  }

  loadListeners() {
    $('.app').on('click', 'video', (e) => this.constructor.play(e));
  }

  static loadUI() {
    $('video').each((index, el) => {
      el.addEventListener('canplay', (event) => {
        const $el = $(el);
        const width = $el.width();
        $el.css('margin-left', `-${(width / 2)}px`);
      });
    });
  }

  static play(event) {
    const $video = $(event.currentTarget);
    const video = $video[0];
    video.currentTime = 0;
    video.play();
  }
}
