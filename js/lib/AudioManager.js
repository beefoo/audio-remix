class AudioManager {
  constructor(options = {}) {
    const defaults = {};
    this.options = _.extend({}, defaults, options);
    this.init();
  }

  init() {
    this.firstPlay = true;
    this.players = {};
    this.loadListeners();
  }

  loadListeners() {
    $('.app').on('click', '.item-play.audio', (e) => this.play(e));
  }

  loadPlayer(url) {
    const player = new Howl({
      src: [url],
      autoplay: true,
      onend: () => this.onPlayerEnd(url),
    });
    this.players[url] = player;
  }

  onPlayerEnd(url) {
    const player = this.players[url];
    const $el = $(`.item-play[data-src="${url}"]`);
    $el.removeClass('active');
  }

  play(event) {
    const $el = $(event.currentTarget);
    const url = $el.attr('data-src');
    $el.addClass('active');

    let player;
    if (_.has(this.players, url)) {
      player = this.players[url];
      player.seek(0);
      player.play();
    } else {
      this.loadPlayer(url);
    }
  }
}
