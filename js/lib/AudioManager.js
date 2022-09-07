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

  getPlayer(url) {
    if (_.has(this.players, url)) {
      return this.players[url];
    }
    return this.loadPlayer(url);
  }

  loadListeners() {
    $('.app').on('click', '.item-play.audio', (e) => this.play(e));
    $('.app').on('click', '.loop-audio', (e) => this.loop(e));
  }

  loadPlayer(url, autoplay = true) {
    let player;

    if (_.has(this.players, url)) {
      player = this.players[url];
      if (autoplay) {
        player.seek(0);
        player.play();
      }
    } else {
      player = new Howl({
        src: [url],
        autoplay,
        onend: () => this.onPlayerEnd(url),
      });
      this.players[url] = player;
    }

    return player;
  }

  loop(event) {
    const $el = $(event.currentTarget);
    $el.toggleClass('active');
    const isActive = $el.hasClass('active');
    const url = $el.attr('data-src');
    const player = this.loadPlayer(url, false);
    player.loop(isActive);
  }

  onPlayerEnd(url) {
    const player = this.players[url];
    if (!player.loop()) {
      const $el = $(`.item-play[data-src="${url}"]`);
      $el.removeClass('active');
    }
  }

  play(event) {
    const $el = $(event.currentTarget);
    const url = $el.attr('data-src');
    $el.addClass('active');
    this.loadPlayer(url, true);
  }
}
