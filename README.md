# VideoJS SkinMaster Plugin

The ultimate skin management plugin for Video.js with 30+ professionally designed skins, live preview, and intuitive controls.

## 🎨 Features

- **30+ Professional Skins** - Carefully curated collection of the best VideoJS skins
- **Live Preview Grid** - Visual skin selector with thumbnails and descriptions
- **Instant Switching** - Apply skins instantly without page reload
- **Keyboard Shortcuts** - Full hotkey support for power users
- **Settings Management** - Customizable preferences with localStorage persistence
- **Responsive Design** - Fully responsive modal and skin previews
- **Search & Filter** - Find skins quickly with search functionality
- **Accessibility Support** - Full keyboard navigation and screen reader support

## 🚀 Quick Start

### 1. Include Required Files

```html
<!-- Video.js CSS -->
<link href="https://vjs.zencdn.net/8.8.0/video-js.css" rel="stylesheet">

<!-- SkinMaster Plugin CSS -->
<link href="videojs-skinmaster.css" rel="stylesheet">

<!-- Video.js JavaScript -->
<script src="https://vjs.zencdn.net/8.8.0/video.min.js"></script>

<!-- Skins Collection -->
<script src="videojs-skins-list.js"></script>

<!-- SkinMaster Plugin -->
<script src="videojs-skinmaster.js"></script>
```

### 2. Initialize Plugin

```javascript
// Create Video.js player
const player = videojs('my-video');

// Initialize SkinMaster plugin
player.skinMaster({
  defaultSkinIndex: 0,
  showSkinButton: true,
  hotkeys: {
    toggleModal: 'KeyS',
    activateDeactivate: 'KeyT',
    nextSkin: 'ArrowRight',
    previousSkin: 'ArrowLeft'
  }
});
```

### 3. Start Using

- Click the **Skins** button in the player controls
- Press **S** to open the skin selector modal
- Browse and click any skin to apply it instantly
- Use arrow keys to cycle through skins

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `S` | Toggle skin selector modal |
| `T` | Toggle current skin on/off |
| `→` | Apply next skin |
| `←` | Apply previous skin |
| `ESC` | Close modal |

## 🎯 API Reference

### Plugin Options

```javascript
player.skinMaster({
  defaultSkinIndex: 0,        // Default skin to apply (index)
  showSkinButton: true,       // Show skin button in control bar
  hotkeys: {
    toggleModal: 'KeyS',      // Toggle modal hotkey
    activateDeactivate: 'KeyT', // Toggle skin hotkey
    nextSkin: 'ArrowRight',   // Next skin hotkey
    previousSkin: 'ArrowLeft' // Previous skin hotkey
  },
  storage: {
    enabled: true,            // Enable localStorage
    key: 'videojs-skinmaster' // Storage key
  }
});
```

### Public Methods

```javascript
// Apply specific skin by index
player.skinMaster.applySkin(5);

// Apply next skin
player.skinMaster.nextSkin();

// Apply previous skin
player.skinMaster.previousSkin();

// Remove current skin
player.skinMaster.removeSkin();

// Toggle modal
player.skinMaster.toggleModal();

// Get current skin info
const currentSkin = player.skinMaster.getCurrentSkin();

// Get current skin index
const index = player.skinMaster.getCurrentSkinIndex();

// Get all available skins
const allSkins = player.skinMaster.getAvailableSkins();
```

### Events

```javascript
// Listen for skin changes
player.on('skinChanged', (event, data) => {
  console.log('Skin changed to:', data.skin.name);
  console.log('Skin index:', data.index);
});
```

## 🎨 Available Skins

### Platform Inspired
- **YouTube Style** - Modern red-themed design matching YouTube
- **Netflix Dark** - Professional Netflix-inspired theme with red branding
- **Apple TV** - Apple TV inspired design with system blue accents
- **iPlayer** - BBC iPlayer style with orange accents
- **Twitch Player** - Twitch-inspired streaming platform design

### Design Systems
- **Material Design** - Google Material Design with elevation shadows
- **Material You** - Android 12+ Material You with dynamic theming
- **Windows 11 Fluent** - Microsoft Fluent Design with blur effects
- **macOS Big Sur** - macOS inspired with translucent elements

### Themes & Styles
- **Dark Neon** - Cyberpunk-inspired with neon green accents
- **Retro 80s** - Nostalgic 80s design with synthwave aesthetics
- **Cyberpunk 2077** - Futuristic theme with neon yellow accents
- **Glassmorphism** - Modern design with blur effects and transparency
- **Minimalist White** - Clean light theme for professional use
- **Minimalist Gray** - Professional gray tones

### Creative & Artistic
- **Gradient Sunset** - Beautiful sunset gradients with pink accents
- **Nature Green** - Organic green theme inspired by forests
- **Ocean Blue** - Deep ocean blues with aquatic gradients
- **Gaming Console** - Gaming-inspired with futuristic elements
- **PlayStation 5** - PS5 console inspired design

### Professional
- **Sublime** - Clean and elegant design with cyan accents
- **Sublime Inspired** - Enhanced Sublime with improved gradients
- **Default Enhanced** - Improved version of the default VideoJS skin
- **Vimuse Professional** - Premium commercial skin with blue accents

## 📁 Project Structure

```
videojs-skinmaster/
├── videojs-skinmaster.js          # Main plugin file
├── videojs-skinmaster.css         # Plugin styles
├── videojs-skins-list.js          # Complete skins collection
├── videojs-skins-list-local.js    # Local archive version
├── demo.html                      # Interactive demo
└── videojs-skins-archive/         # Individual skin files
    └── skins/
        ├── youtube-style/
        ├── netflix-dark/
        ├── material-design/
        └── ... (30+ more skins)
```

## 🔧 Customization

### Adding Custom Skins

```javascript
// Add to the skins list
window.videoJSSkinsList.push({
  index: 31,
  name: "My Custom Skin",
  short_name: "Custom",
  description: "My awesome custom skin",
  skin: `
    .video-js.vjs-custom-skin {
      /* Your CSS here */
    }
  `,
  preview_images: ["path/to/preview.png"],
  features: ["Custom feature 1", "Custom feature 2"],
  license: "MIT"
});
```

### Custom Hotkeys

```javascript
player.skinMaster({
  hotkeys: {
    toggleModal: 'KeyM',      // Change to 'M' key
    nextSkin: 'KeyN',         // Change to 'N' key
    previousSkin: 'KeyP'      // Change to 'P' key
  }
});
```

## 📱 Responsive Design

The plugin is fully responsive and works seamlessly across all devices:

- **Desktop** - Full-featured grid layout with hover effects
- **Tablet** - Optimized grid spacing and touch-friendly controls
- **Mobile** - Single-column layout with thumb-friendly interface

## ♿ Accessibility

- Full keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus indicators for all interactive elements
- ARIA labels and descriptions

## 🌐 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-skin`)
3. Commit your changes (`git commit -am 'Add new skin'`)
4. Push to the branch (`git push origin feature/new-skin`)
5. Create a Pull Request

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [demo page](demo.html) for examples
2. Review the API documentation above
3. Search existing issues
4. Create a new issue with detailed information

## 📝 Changelog

### v1.0.0
- Initial release
- 30+ professional skins
- Live preview modal
- Keyboard shortcuts
- localStorage persistence
- Responsive design
- Full API support

## 🙏 Credits

This plugin includes skins inspired by or derived from:
- VideoJS community themes
- Popular video platform designs
- Modern design systems
- Open source skin projects

Special thanks to all the designers and developers who contributed to the VideoJS ecosystem.

---

**Made with ❤️ for the VideoJS community**