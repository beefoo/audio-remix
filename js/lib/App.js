class App {
  constructor(options = {}) {
    const defaults = {
      data: 'data/clips_play.json',
      filedir: 'clips/',
    };
    const q = StringUtil.queryParams();
    this.options = _.extend({}, defaults, options, q);
  }

  init() {
    this.initialized = true;
    this.$el = $('#app');

    const dataReady = this.loadData();

    $.when(dataReady).then(() => {
      this.loadUI();
      this.loadListeners();
    });
  }

  loadData() {
    const promise = $.Deferred();

    $.getJSON(this.options.data, (data) => {
      const columns = data.itemHeadings;
      this.data = _.map(data.items, (row, index) => _.object(columns, row));
      this.data = _.sortBy(this.data, (item) => item.title);
      promise.resolve();
    });

    return promise;
  }

  loadListeners() {
    this.audioManager = new AudioManager();
  }

  loadUI() {
    let html = '';
    html += '<div class="clips">';
    _.each(this.data, (clip) => {
      const $clip = $('<div class="clip"></div>');
      const filename = this.options.filedir + clip.filename;
      const ext = _.last(clip.filename.split('.'));
      html += '<div class="clip">';
      html +=   `<button class="item-details" title="${clip.title} (${clip['start time']})">`;
      html +=     `<div class="title">${clip.title} (${clip['start time']})</div>`;
      html +=   '</button>';
      html +=   `<button class="item-play ${clip['file type']}" data-src="${filename}">`;
      if (clip['file type'] === 'video') {
        html +=   `<video src="${filename}"></video>`;
      }
      html +=   '</button>';
      html +=   '<div class="links">';
      html +=     `<a href="${clip.url}" target="_blank" title="View detail page"><img src="img/noun-information-button-446237.svg" /></a>`;
      html +=     `<a href="${filename}" download="${clip.filename}" title="Download clip"><img src="img/noun-download-445253.svg" /></a>`;
      html +=     `<a href="${clip.assetUrl}" download="${clip.id}.${ext}" title="Download full source"><img src="img/noun-file-445252.svg" /></a>`;
      html +=   '</div>'
      html += '</div>';
    });

    html += '</div>';
    const $clips = $(html);
    this.$el.append($clips);
  }
}
