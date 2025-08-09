(function(window, videojs) {
  'use strict';

  var defaults = {
    markers: [],
    markerStyle: { class: 'vjs-bm-marker', width: '4px', backgroundColor: '#ff4081' },
    markerTip: { display: true, text: function(marker){ return marker.text || ''; }, time: function(seconds){ return formatTime(seconds); } },
    breakOverlay: { display: true, displayTime: 3, text: function(marker){ return marker.overlayText || marker.text || ''; } },
    showMarkersOnProgressBar: true,
    hotkeys: { enabled: true, toggleModal: 'p', next: 'n', prev: 'v', add: 'b' },
    defaultsForHotkeyAdd: { text: 'Bookmark', overlayText: '', color: '#3a86ff', overlayEnabled: false },
    onMarkerAdd: null,
    onMarkerUpdate: null,
    onMarkerRemove: null,
    onMarkerReached: null,
    onMarkerClick: null
  };

  function formatTime(seconds) {
    var s = Math.max(0, Math.floor(seconds));
    var hh = Math.floor(s / 3600);
    var mm = Math.floor((s % 3600) / 60);
    var ss = s % 60;
    var parts = [];
    if (hh > 0) parts.push(String(hh));
    parts.push((hh > 0 ? String(mm).padStart(2, '0') : String(mm)));
    parts.push(String(ss).padStart(2, '0'));
    return parts.join(':');
  }

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

  var Plugin = videojs.getPlugin('plugin');

  function createEl(tag, className, attrs) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function(k){ el.setAttribute(k, attrs[k]); });
    }
    return el;
  }

  class BookmarkPlugin extends Plugin {
    constructor(player, options) {
      super(player);
      this.player = player;
      this.options = videojs.mergeOptions(defaults, options || {});
      this.state = {
        markers: (this.options.markers || []).slice().sort(function(a,b){ return a.time - b.time; }),
        showMarkersOnProgressBar: !!this.options.showMarkersOnProgressBar,
        hotkeys: Object.assign({}, this.options.hotkeys),
        keymap: Object.assign({}, this.options.hotkeys),
        dialogOpen: false
      };

      this.storageKey = 'videojs-bookmark:' + (player.id ? player.id() : 'default');
      this.restoreState();

      this.initControlButton();
      this.initModal();
      this.initProgressMarkers();
      this.bindPlayerEvents();
      this.bindHotkeys();
    }

    restoreState() {
      try {
        var raw = window.localStorage.getItem(this.storageKey);
        if (!raw) return;
        var saved = JSON.parse(raw);
        if (saved && typeof saved === 'object') {
          if (Array.isArray(saved.markers)) this.state.markers = saved.markers.sort(function(a,b){ return a.time - b.time; });
          if (typeof saved.showMarkersOnProgressBar === 'boolean') this.state.showMarkersOnProgressBar = saved.showMarkersOnProgressBar;
          if (saved.hotkeys) this.state.hotkeys = Object.assign({}, this.state.hotkeys, saved.hotkeys);
          if (saved.keymap) this.state.keymap = Object.assign({}, this.state.keymap, saved.keymap);
        }
      } catch (e) {}
    }

    persistState() {
      try {
        window.localStorage.setItem(this.storageKey, JSON.stringify({
          markers: this.state.markers,
          showMarkersOnProgressBar: this.state.showMarkersOnProgressBar,
          hotkeys: this.state.hotkeys,
          keymap: this.state.keymap
        }));
      } catch (e) {}
    }

    // Control bar button
    initControlButton() {
      var ControlBar = this.player.getChild('controlBar');
      if (!ControlBar) return;
      var Button = videojs.getComponent('Button');
      var self = this;
      var BookmarkButton = videojs.extend(Button, {
        constructor: function() {
          Button.apply(this, arguments);
          this.controlText('Bookmarks');
          this.addClass('vjs-bookmark-button');
        },
        handleClick: function() { self.toggleModal(); }
      });
      videojs.registerComponent('BookmarkButton', BookmarkButton);
      ControlBar.addChild('BookmarkButton', {}, ControlBar.children().length - 1);
    }

    // Modal UI
    initModal() {
      var root = this.player.el();
      this.modal = createEl('div', 'vjs-bm-modal');
      var header = createEl('div', 'vjs-bm-modal-header');
      var title = createEl('div', 'vjs-bm-modal-title');
      title.textContent = 'Bookmarks';
      var closeBtn = createEl('button', 'vjs-bm-close');
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.textContent = '×';
      header.appendChild(title);
      header.appendChild(closeBtn);

      var body = createEl('div', 'vjs-bm-modal-body');
      var tabsWrap = createEl('div', 'vjs-bm-tabs');
      var tabsHeader = createEl('div', 'vjs-bm-tab-headers');
      var tabBtn1 = createEl('button'); tabBtn1.textContent = 'Bookmarks'; tabBtn1.classList.add('vjs-bm-active');
      var tabBtn2 = createEl('button'); tabBtn2.textContent = 'Settings';
      tabsHeader.appendChild(tabBtn1);
      tabsHeader.appendChild(tabBtn2);

      var tab1 = createEl('div', 'vjs-bm-tab vjs-bm-active');
      var tab2 = createEl('div', 'vjs-bm-tab');

      // Tab 1 content
      var toolbar = createEl('div', 'vjs-bm-toolbar');
      var addBtn = createEl('button', 'vjs-bm-btn'); addBtn.textContent = 'Add bookmark';
      var getTimeBtn = createEl('button', 'vjs-bm-btn secondary'); getTimeBtn.textContent = 'Get current time';
      toolbar.appendChild(addBtn);
      toolbar.appendChild(getTimeBtn);
      var list = createEl('ul', 'vjs-bm-list');
      var gapsContainer = createEl('div'); // will hold gaps between list items
      tab1.appendChild(toolbar);
      tab1.appendChild(gapsContainer);
      tab1.appendChild(list);

      // Tab 2 content - settings
      var settings = this.buildSettingsContent();
      tab2.appendChild(settings);

      tabsWrap.appendChild(tabsHeader);
      tabsWrap.appendChild(tab1);
      tabsWrap.appendChild(tab2);
      body.appendChild(tabsWrap);

      this.modal.appendChild(header);
      this.modal.appendChild(body);
      root.appendChild(this.modal);

      // Dialogs (add/edit)
      this.dialogBackdrop = createEl('div', 'vjs-bm-dialog-backdrop');
      this.dialog = createEl('div', 'vjs-bm-dialog');
      this.dialogBackdrop.appendChild(this.dialog);
      this.modal.appendChild(this.dialogBackdrop);

      // Events
      closeBtn.addEventListener('click', this.closeModal.bind(this));
      tabBtn1.addEventListener('click', function(){ tabBtn1.classList.add('vjs-bm-active'); tabBtn2.classList.remove('vjs-bm-active'); tab1.classList.add('vjs-bm-active'); tab2.classList.remove('vjs-bm-active'); });
      tabBtn2.addEventListener('click', function(){ tabBtn2.classList.add('vjs-bm-active'); tabBtn1.classList.remove('vjs-bm-active'); tab2.classList.add('vjs-bm-active'); tab1.classList.remove('vjs-bm-active'); });
      addBtn.addEventListener('click', this.openAddDialog.bind(this));
      getTimeBtn.addEventListener('click', () => { this.lastCapturedTime = this.player.currentTime(); this.openAddDialog(this.lastCapturedTime); });

      // Dragging
      this.makeDraggable(this.modal, header);

      // Render initial list
      this.listEl = list;
      this.gapsEl = gapsContainer;
      this.renderList();
    }

    buildSettingsContent() {
      var wrap = createEl('div');
      // Show markers toggle
      var field1 = createEl('div', 'vjs-bm-field');
      var chk = createEl('input'); chk.type = 'checkbox'; chk.checked = this.state.showMarkersOnProgressBar; chk.id = 'bm-show-markers';
      var lbl = createEl('label'); lbl.textContent = 'Show bookmarks on progress bar'; lbl.htmlFor = chk.id;
      field1.appendChild(lbl); field1.appendChild(chk);

      chk.addEventListener('change', () => { this.state.showMarkersOnProgressBar = chk.checked; this.persistState(); this.renderProgressMarkers(); });

      // Hotkeys enable
      var field2 = createEl('div', 'vjs-bm-field');
      var chk2 = createEl('input'); chk2.type = 'checkbox'; chk2.checked = !!(this.state.hotkeys && this.state.hotkeys.enabled !== false); chk2.id = 'bm-hotkeys-enabled';
      var lbl2 = createEl('label'); lbl2.textContent = 'Enable hotkeys'; lbl2.htmlFor = chk2.id;
      field2.appendChild(lbl2); field2.appendChild(chk2);
      chk2.addEventListener('change', () => { this.state.hotkeys.enabled = chk2.checked; this.persistState(); });

      // Hotkeys mapping
      var mappingWrap = createEl('div', 'vjs-bm-field');
      var mapLbl = createEl('label'); mapLbl.textContent = 'Hotkeys mapping (focus input and press a key)'; mappingWrap.appendChild(mapLbl);
      var actions = [ ['toggleModal','Toggle modal'], ['next','Next bookmark'], ['prev','Previous bookmark'], ['add','Add bookmark'] ];
      actions.forEach(([key, label]) => {
        var row = createEl('div', 'vjs-bm-field-row');
        var rlbl = createEl('label'); rlbl.textContent = label; rlbl.style.minWidth = '160px';
        var inp = createEl('input'); inp.type = 'text'; inp.value = this.state.keymap[key] || ''; inp.readOnly = true; inp.style.width = '100px'; inp.tabIndex = 0;
        inp.addEventListener('keydown', (e) => { e.preventDefault(); var k = e.key.length === 1 ? e.key.toLowerCase() : e.key; this.state.keymap[key] = k; inp.value = k; this.persistState(); });
        row.appendChild(rlbl); row.appendChild(inp);
        mappingWrap.appendChild(row);
      });

      // Defaults for add by hotkey
      var defaultsWrap = createEl('div', 'vjs-bm-field');
      var dLbl = createEl('label'); dLbl.textContent = 'Defaults for hotkey add'; defaultsWrap.appendChild(dLbl);
      var textRow = createEl('div', 'vjs-bm-field-row');
      var textInput = createEl('input'); textInput.type = 'text'; textInput.value = this.options.defaultsForHotkeyAdd.text || '';
      var textLabel = createEl('label'); textLabel.textContent = 'Text'; textLabel.style.minWidth = '120px';
      textRow.appendChild(textLabel); textRow.appendChild(textInput);
      var ovRow = createEl('div', 'vjs-bm-field-row');
      var ovInput = createEl('input'); ovInput.type = 'text'; ovInput.value = this.options.defaultsForHotkeyAdd.overlayText || '';
      var ovLabel = createEl('label'); ovLabel.textContent = 'Overlay text'; ovLabel.style.minWidth = '120px';
      ovRow.appendChild(ovLabel); ovRow.appendChild(ovInput);
      var colorRow = createEl('div', 'vjs-bm-field-row');
      var colorInput = createEl('input'); colorInput.type = 'color'; colorInput.value = this.options.defaultsForHotkeyAdd.color || '#3a86ff';
      var colorLabel = createEl('label'); colorLabel.textContent = 'Color'; colorLabel.style.minWidth = '120px';
      colorRow.appendChild(colorLabel); colorRow.appendChild(colorInput);
      var chkRow = createEl('div', 'vjs-bm-field-row');
      var chkInput = createEl('input'); chkInput.type = 'checkbox'; chkInput.checked = !!this.options.defaultsForHotkeyAdd.overlayEnabled;
      var chkLabel = createEl('label'); chkLabel.textContent = 'Overlay enabled'; chkLabel.style.minWidth = '120px';
      chkRow.appendChild(chkLabel); chkRow.appendChild(chkInput);

      [textInput, ovInput, colorInput, chkInput].forEach(() => {});
      textInput.addEventListener('input', () => { this.options.defaultsForHotkeyAdd.text = textInput.value; });
      ovInput.addEventListener('input', () => { this.options.defaultsForHotkeyAdd.overlayText = ovInput.value; });
      colorInput.addEventListener('input', () => { this.options.defaultsForHotkeyAdd.color = colorInput.value; });
      chkInput.addEventListener('change', () => { this.options.defaultsForHotkeyAdd.overlayEnabled = chkInput.checked; });

      wrap.appendChild(field1);
      wrap.appendChild(field2);
      wrap.appendChild(mappingWrap);
      wrap.appendChild(defaultsWrap);
      wrap.appendChild(textRow);
      wrap.appendChild(ovRow);
      wrap.appendChild(colorRow);
      wrap.appendChild(chkRow);

      return wrap;
    }

    openModal() {
      if (!this.modal) return;
      this.modal.classList.add('vjs-bm-open');
      this.state.dialogOpen = true;
    }
    closeModal() {
      if (!this.modal) return;
      this.modal.classList.remove('vjs-bm-open');
      this.dialogBackdrop.classList.remove('vjs-bm-open');
      this.state.dialogOpen = false;
    }
    toggleModal() { this.state.dialogOpen ? this.closeModal() : this.openModal(); }

    openAddDialog(initialTime) {
      this.openDialog('Add bookmark', {
        time: typeof initialTime === 'number' ? initialTime : this.player.currentTime(),
        text: '',
        overlayEnabled: false,
        overlayText: ''
      }, (values) => {
        var marker = {
          time: parseFloat(values.time) || 0,
          text: values.text || '',
          overlayEnabled: !!values.overlayEnabled,
          overlayText: values.overlayText || '',
          color: values.color || '#3a86ff'
        };
        this.addMarker(marker);
      }, true);
    }

    openEditDialog(index, marker) {
      this.openDialog('Edit bookmark', marker, (values) => {
        var update = {
          time: parseFloat(values.time) || marker.time,
          text: values.text,
          overlayText: values.overlayText,
          color: values.color
        };
        this.updateMarker(index, update);
      }, false);
    }

    openDialog(title, values, onSubmit, includeOverlayToggle) {
      this.dialog.innerHTML = '';
      var h = createEl('div', 'vjs-bm-modal-title'); h.textContent = title; this.dialog.appendChild(h);

      var timeField = createEl('div', 'vjs-bm-field');
      var timeLbl = createEl('label'); timeLbl.textContent = 'Time (seconds)';
      var timeInput = createEl('input'); timeInput.type = 'number'; timeInput.step = '0.1'; timeInput.value = String(values.time || 0);
      timeField.appendChild(timeLbl); timeField.appendChild(timeInput);

      var textField = createEl('div', 'vjs-bm-field');
      var textLbl = createEl('label'); textLbl.textContent = 'Text';
      var textInput = createEl('input'); textInput.type = 'text'; textInput.value = values.text || '';
      textField.appendChild(textLbl); textField.appendChild(textInput);

      var overlayToggleField = createEl('div', 'vjs-bm-field');
      var overlayToggleLbl = createEl('label'); overlayToggleLbl.textContent = 'Overlay enabled';
      var overlayToggle = createEl('input'); overlayToggle.type = 'checkbox'; overlayToggle.checked = !!values.overlayEnabled;
      overlayToggleField.appendChild(overlayToggleLbl); overlayToggleField.appendChild(overlayToggle);

      var overlayTextField = createEl('div', 'vjs-bm-field');
      var overlayTextLbl = createEl('label'); overlayTextLbl.textContent = 'Overlay text';
      var overlayTextInput = createEl('input'); overlayTextInput.type = 'text'; overlayTextInput.value = values.overlayText || '';
      overlayTextField.appendChild(overlayTextLbl); overlayTextField.appendChild(overlayTextInput);

      var colorField = createEl('div', 'vjs-bm-field');
      var colorLbl = createEl('label'); colorLbl.textContent = 'Color';
      var colorInput = createEl('input'); colorInput.type = 'color'; colorInput.value = values.color || '#3a86ff';
      colorField.appendChild(colorLbl); colorField.appendChild(colorInput);

      var actions = createEl('div', 'vjs-bm-actions');
      var cancelBtn = createEl('button', 'vjs-bm-btn secondary'); cancelBtn.textContent = 'Close';
      var saveBtn = createEl('button', 'vjs-bm-btn'); saveBtn.textContent = 'Save';
      actions.appendChild(cancelBtn); actions.appendChild(saveBtn);

      this.dialog.appendChild(timeField);
      this.dialog.appendChild(textField);
      if (includeOverlayToggle) this.dialog.appendChild(overlayToggleField);
      this.dialog.appendChild(overlayTextField);
      this.dialog.appendChild(colorField);
      this.dialog.appendChild(actions);

      this.dialogBackdrop.classList.add('vjs-bm-open');

      cancelBtn.addEventListener('click', () => { this.dialogBackdrop.classList.remove('vjs-bm-open'); });
      saveBtn.addEventListener('click', () => {
        this.dialogBackdrop.classList.remove('vjs-bm-open');
        onSubmit({ time: timeInput.value, text: textInput.value, overlayEnabled: overlayToggle.checked, overlayText: overlayTextInput.value, color: colorInput.value });
      });
    }

    makeDraggable(el, handle) {
      var isDown = false; var startX=0, startY=0, startLeft=0, startTop=0;
      handle.addEventListener('mousedown', (e) => {
        isDown = true; startX = e.clientX; startY = e.clientY;
        var rect = el.getBoundingClientRect();
        startLeft = rect.left; startTop = rect.top;
        e.preventDefault();
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        var dx = e.clientX - startX; var dy = e.clientY - startY;
        el.style.left = clamp(startLeft + dx, 0, window.innerWidth - 40) + 'px';
        el.style.top = clamp(startTop + dy, 0, window.innerHeight - 40) + 'px';
        el.style.right = 'auto'; el.style.bottom = 'auto'; el.style.width = el.offsetWidth + 'px'; el.style.height = el.offsetHeight + 'px';
      });
      window.addEventListener('mouseup', () => { isDown = false; });
    }

    // Progress markers rendering
    initProgressMarkers() {
      var progressControl = this.player.controlBar && this.player.controlBar.progressControl;
      if (!progressControl) return;
      var seekBar = progressControl.seekBar || progressControl;
      this.markerContainer = createEl('div');
      this.markerContainer.style.position = 'absolute';
      this.markerContainer.style.left = '0';
      this.markerContainer.style.right = '0';
      this.markerContainer.style.top = '0';
      this.markerContainer.style.bottom = '0';
      this.markerContainer.style.pointerEvents = 'none';
      var el = seekBar.el ? seekBar.el() : seekBar;
      el.style.position = 'relative';
      el.appendChild(this.markerContainer);
      this.renderProgressMarkers();
    }

    renderProgressMarkers() {
      if (!this.markerContainer) return;
      this.markerContainer.innerHTML = '';
      if (!this.state.showMarkersOnProgressBar) return;
      var duration = Math.max(1, this.player.duration() || 0);
      this.state.markers.forEach((m, idx) => {
        var marker = createEl('div', this.options.markerStyle.class || 'vjs-bm-marker');
        marker.style.left = (m.time / duration * 100) + '%';
        marker.style.width = this.options.markerStyle.width || '4px';
        marker.style.backgroundColor = m.color || this.options.markerStyle.backgroundColor || '#ff4081';
        marker.style.pointerEvents = 'auto';
        marker.style.position = 'absolute';
        marker.style.transform = 'translateX(-50%)';
        if (this.options.markerTip && this.options.markerTip.display) {
          var tip = createEl('div', 'vjs-bm-marker-tip');
          var textFn = this.options.markerTip.text || function(mm){ return mm.text || ''; };
          var timeFn = this.options.markerTip.time || function(sec){ return formatTime(sec); };
          tip.textContent = (textFn(m) || '') + (m.time != null ? (' ' + timeFn(m.time)) : '');
          marker.appendChild(tip);
        }
        marker.addEventListener('click', (e) => { e.stopPropagation(); this.player.currentTime(m.time); if (typeof this.options.onMarkerClick === 'function') this.options.onMarkerClick(m); });
        this.markerContainer.appendChild(marker);
      });
    }

    bindPlayerEvents() {
      // Update current gap progress and overlay
      this.player.on('timeupdate', () => {
        this.updateGapsProgress();
        this.maybeShowOverlay();
        this.checkMarkerReached();
      });
      this.player.on('durationchange', () => { this.renderProgressMarkers(); });
    }

    bindHotkeys() {
      document.addEventListener('keydown', (e) => {
        if (!this.state.hotkeys || this.state.hotkeys.enabled === false) return;
        var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        var map = this.state.keymap || {};
        if (key === map.toggleModal) { e.preventDefault(); this.toggleModal(); }
        else if (key === map.next) { e.preventDefault(); this.nextMarker(); }
        else if (key === map.prev) { e.preventDefault(); this.prevMarker(); }
        else if (key === map.add) { e.preventDefault(); var t = this.player.currentTime(); var d = this.options.defaultsForHotkeyAdd || {}; this.addMarker({ time: t, text: d.text || 'Bookmark', overlayText: d.overlayText || '', color: d.color || '#3a86ff', overlayEnabled: !!d.overlayEnabled }); }
      });
    }

    // Overlay behavior (adopted from videojs-markers breakOverlay)
    maybeShowOverlay() {
      if (!this.options.breakOverlay || this.options.breakOverlay.display === false) return;
      var current = this.player.currentTime();
      var active = this.state.markers.find((m) => Math.abs((m.time || 0) - current) < 0.25 && (m.overlayEnabled || m.overlayEnabled === undefined));
      if (!active) return;
      if (this._overlayTimeout) return; // already showing
      var textFn = this.options.breakOverlay.text || function(mm){ return mm.overlayText || mm.text || ''; };
      var overlay = createEl('div');
      overlay.style.position = 'absolute'; overlay.style.left = '50%'; overlay.style.top = '30%'; overlay.style.transform = 'translate(-50%, -50%)';
      overlay.style.background = 'rgba(0,0,0,0.75)'; overlay.style.color = '#fff'; overlay.style.padding = '8px 12px'; overlay.style.borderRadius = '6px'; overlay.style.zIndex = '9999';
      overlay.textContent = textFn(active);
      this.player.el().appendChild(overlay);
      this._overlayTimeout = window.setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        this._overlayTimeout = null;
      }, (this.options.breakOverlay.displayTime || 3) * 1000);
    }

    checkMarkerReached() {
      if (typeof this.options.onMarkerReached !== 'function') return;
      var current = this.player.currentTime();
      var idx = this.state.markers.findIndex((m) => Math.abs((m.time || 0) - current) < 0.25);
      if (idx >= 0 && this._lastReachedIndex !== idx) {
        this._lastReachedIndex = idx;
        this.options.onMarkerReached(this.state.markers[idx]);
      }
    }

    // List rendering and interactions
    renderList() {
      if (!this.listEl) return;
      this.listEl.innerHTML = '';
      var markers = this.state.markers;
      markers.forEach((m, idx) => {
        var item = createEl('li', 'vjs-bm-item');
        var left = createEl('div', 'vjs-bm-item-left');
        var color = createEl('span', 'vjs-bm-color'); color.style.background = m.color || '#999';
        var time = createEl('span', 'vjs-bm-time'); time.textContent = formatTime(m.time || 0);
        var text = createEl('span', 'vjs-bm-text'); text.textContent = m.text || '';
        left.appendChild(color); left.appendChild(time); left.appendChild(text);
        var actions = createEl('div', 'vjs-bm-item-actions');
        var edit = createEl('button', 'vjs-bm-btn secondary'); edit.textContent = 'Edit';
        var remove = createEl('button', 'vjs-bm-btn secondary'); remove.textContent = 'Remove';
        actions.appendChild(edit); actions.appendChild(remove);
        item.appendChild(left); item.appendChild(actions);
        this.listEl.appendChild(item);

        left.addEventListener('click', () => { this.player.currentTime(m.time || 0); if (!this.player.paused()) this.player.play(); });
        edit.addEventListener('click', () => { this.openEditDialog(idx, m); });
        remove.addEventListener('click', () => { this.removeMarker(idx); });
      });

      this.renderGaps();
    }

    renderGaps() {
      if (!this.gapsEl) return;
      this.gapsEl.innerHTML = '';
      var ms = this.state.markers;
      if (ms.length < 2) return;
      for (var i = 0; i < ms.length - 1; i++) {
        var gap = createEl('div', 'vjs-bm-progress-gap');
        var dot = createEl('div', 'vjs-bm-progress-dot'); gap.appendChild(dot);
        gap.dataset.start = String(ms[i].time);
        gap.dataset.end = String(ms[i+1].time);
        this.gapsEl.appendChild(gap);
      }
      this.updateGapsProgress();
    }

    updateGapsProgress() {
      if (!this.gapsEl) return;
      var current = this.player.currentTime();
      Array.prototype.forEach.call(this.gapsEl.children, (gap) => {
        var start = parseFloat(gap.dataset.start); var end = parseFloat(gap.dataset.end);
        var pct = 0;
        if (current <= start) pct = 0; else if (current >= end) pct = 100; else pct = (current - start) / (end - start) * 100;
        var dot = gap.firstChild; if (dot) dot.style.left = pct + '%';
      });
    }

    // Marker operations
    addMarker(marker) {
      var m = Object.assign({}, marker);
      if (typeof m.time !== 'number' || isNaN(m.time)) m.time = this.player.currentTime();
      this.state.markers.push(m);
      this.state.markers.sort(function(a,b){ return a.time - b.time; });
      this.persistState();
      this.renderList();
      this.renderProgressMarkers();
      if (typeof this.options.onMarkerAdd === 'function') this.options.onMarkerAdd(m);
    }

    updateMarker(index, fields) {
      if (index < 0 || index >= this.state.markers.length) return;
      var m = this.state.markers[index];
      Object.assign(m, fields || {});
      this.state.markers.sort(function(a,b){ return a.time - b.time; });
      this.persistState();
      this.renderList();
      this.renderProgressMarkers();
      if (typeof this.options.onMarkerUpdate === 'function') this.options.onMarkerUpdate(m);
    }

    removeMarker(indexOrMarker) {
      var idx = -1;
      if (typeof indexOrMarker === 'number') idx = indexOrMarker;
      else idx = this.state.markers.indexOf(indexOrMarker);
      if (idx < 0) return;
      var removed = this.state.markers.splice(idx, 1)[0];
      this.persistState();
      this.renderList();
      this.renderProgressMarkers();
      if (typeof this.options.onMarkerRemove === 'function') this.options.onMarkerRemove(removed);
    }

    nextMarker() {
      var current = this.player.currentTime();
      for (var i = 0; i < this.state.markers.length; i++) {
        if ((this.state.markers[i].time || 0) > current + 0.05) { this.player.currentTime(this.state.markers[i].time); return; }
      }
      if (this.state.markers.length > 0) this.player.currentTime(this.state.markers[0].time || 0);
    }

    prevMarker() {
      var current = this.player.currentTime();
      for (var i = this.state.markers.length - 1; i >= 0; i--) {
        if ((this.state.markers[i].time || 0) < current - 0.05) { this.player.currentTime(this.state.markers[i].time); return; }
      }
      if (this.state.markers.length > 0) this.player.currentTime(this.state.markers[this.state.markers.length - 1].time || 0);
    }

    // Public API
    open() { this.openModal(); }
    close() { this.closeModal(); }
    toggle() { this.toggleModal(); }
    add(marker) { this.addMarker(marker); }
    remove(markerOrIndex) { this.removeMarker(markerOrIndex); }
    update(index, fields) { this.updateMarker(index, fields); }
    next() { this.nextMarker(); }
    prev() { this.prevMarker(); }
    markers() { return this.state.markers.slice(); }
  }

  // Register plugin function
  videojs.registerPlugin('bookmark', function(optionsOrMethod) {
    if (!this._bookmarkPluginInstance) {
      this._bookmarkPluginInstance = new BookmarkPlugin(this, optionsOrMethod || {});
    } else if (typeof optionsOrMethod === 'string') {
      var inst = this._bookmarkPluginInstance;
      var args = Array.prototype.slice.call(arguments, 1);
      if (typeof inst[optionsOrMethod] === 'function') {
        return inst[optionsOrMethod].apply(inst, args);
      }
    }
    return this._bookmarkPluginInstance;
  });

})(window, window.videojs);