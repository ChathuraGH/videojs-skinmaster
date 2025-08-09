# videojs-bookmark

A Video.js plugin that adds bookmark management UI, keyboard shortcuts, and progress markers, following the style and configuration options of `videojs-markers`.

## Install

Include after Video.js:

```html
<link rel="stylesheet" href="/dist/videojs-bookmark.css" />
<script src="/dist/videojs-bookmark.js"></script>
```

Or via npm:

```bash
npm i videojs-bookmark
```

## Usage

```html
<video id="my-video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
  <source src="movie.mp4" type="video/mp4" />
</video>
<script>
var player = videojs('my-video');
player.bookmark({
  markers: [
    { time: 5, text: 'Intro', overlayText: 'Welcome', color: '#ff4081' },
    { time: 12.3, text: 'Topic A' }
  ],
  markerStyle: { class: 'vjs-bm-marker', width: '6px', backgroundColor: '#ff4081' },
  markerTip: { display: true, text: function(marker) { return marker.text || '' }, time: function(time) { return time.toFixed(1) + 's' } },
  breakOverlay: { display: true, displayTime: 3, text: function(marker) { return marker.overlayText || marker.text || '' } },
  showMarkersOnProgressBar: true,
  hotkeys: { enabled: true, toggleModal: 'p', next: 'n', prev: 'v', add: 'b' }
});
</script>
```

## Options (adopted from videojs-markers)

- `markers`: Array of `{ time: number, text?: string, overlayText?: string, color?: string, class?: string, overlayEnabled?: boolean }`.
- `markerStyle`: Style/class for markers on the progress bar.
- `markerTip`: `{ display?: boolean, text?: (marker)=>string, time?: (seconds)=>string }`.
- `breakOverlay`: `{ display?: boolean, displayTime?: number, text?: (marker)=>string }`.
- `showMarkersOnProgressBar`: boolean to toggle markers.
- `hotkeys`: `{ enabled?: boolean, toggleModal?: string, next?: string, prev?: string, add?: string }`.
- `defaultsForHotkeyAdd`: default values applied when adding by hotkey `{ text?, overlayText?, color?, overlayEnabled? }`.
- Callbacks: `onMarkerAdd(marker)`, `onMarkerUpdate(marker)`, `onMarkerRemove(marker)`, `onMarkerReached(marker)`, `onMarkerClick(marker)`.

## API

- `player.bookmark('open')`, `player.bookmark('close')`, `player.bookmark('toggle')`.
- `player.bookmark('add', marker)`, `player.bookmark('remove', markerOrIndex)`, `player.bookmark('update', index, fields)`.
- `player.bookmark('next')`, `player.bookmark('prev')`.
- `player.bookmark('markers')` returns a shallow copy of markers.

## Keyboard shortcuts

- `p`: toggle panel
- `n`: next bookmark
- `v`: previous bookmark
- `b`: add bookmark at current time (uses `defaultsForHotkeyAdd`)

## Demo

Open `demo/index.html` in a server.