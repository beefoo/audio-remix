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
    $('.app').on('click', '.loop-video', (e) => this.constructor.loop(e));
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

  static loop(event) {
    const $button = $(event.currentTarget);
    $button.toggleClass('active');
    const isActive = $button.hasClass('active');
    const src = $button.attr('data-src');
    const $video = $(`video[src="${src}"]`);
    const video = $video[0];
    video.loop = isActive;
  }

  static play(event) {
    const $video = $(event.currentTarget);
    const video = $video[0];
    video.currentTime = 0;
    video.play();
  }
}
