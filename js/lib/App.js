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
      promise.resolve();
    });

    return promise;
  }

  loadListeners() {

  }

  loadUI() {
    const $table = $('<table class="clips"></table>');
    const { options } = this;

    _.each(this.data, (clip) => {
      const $tr = $('<tr></tr>');
      $tr.append(`<td><a href="${clip.url}" target="_blank">${clip.title}</a></td>`);
      $tr.append(`<td>(${clip['start time']})</td>`);
      const filename = options.filedir + clip.filename;
      const ext = _.last(clip.filename.split('.'));
      if (clip['file type'] === 'video') {
        $tr.append(`<td><video src="${filename}" controls></video></td>`);
      } else {
        $tr.append(`<td><audio src="${filename}" controls /></td>`);
      }
      $tr.append(`<td><a href="${filename}" download="${clip.filename}">Download clip</a></td>`);
      $tr.append(`<td><a href="${clip.assetUrl}" download="${clip.id}.${ext}">Download full</a></td>`);
      $table.append($tr);
    });

    this.$el.append($table);
  }
}
