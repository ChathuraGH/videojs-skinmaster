/*! @name videojs-skinmaster @version 1.0.0 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsSkinmaster = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var version = "1.0.0";

  const skinsList = window.videoJSSkinsList || []; // Default configuration

  const defaults = {
    defaultSkinIndex: 0,
    showSkinButton: true,
    hotkeys: {
      toggleModal: 'KeyS',
      activateDeactivate: 'KeyT',
      nextSkin: 'ArrowRight',
      previousSkin: 'ArrowLeft'
    },
    storage: {
      enabled: true,
      key: 'videojs-skinmaster'
    }
  }; // Plugin state

  let currentSkinIndex = 0;
  let isModalOpen = false;
  let appliedStyleElement = null;
  let settings = {}; // Storage utilities

  const Storage = {
    get: function (key) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  }; // Load saved settings

  function loadSettings() {
    if (defaults.storage.enabled) {
      const saved = Storage.get(defaults.storage.key);

      if (saved) {
        settings = _extends({}, defaults, saved);
        currentSkinIndex = settings.defaultSkinIndex || 0;
      } else {
        settings = _extends({}, defaults);
      }
    } else {
      settings = _extends({}, defaults);
    }
  } // Save settings


  function saveSettings() {
    if (defaults.storage.enabled) {
      settings.defaultSkinIndex = currentSkinIndex;
      Storage.set(defaults.storage.key, settings);
    }
  } // Apply skin to player


  function applySkin(player, skinIndex) {
    if (skinIndex < 0 || skinIndex >= skinsList.length) return false;
    const skin = skinsList[skinIndex];

    try {
      // Remove previous skin
      removeSkin(player); // Create and inject new style element with skin CSS

      appliedStyleElement = document.createElement('style');
      appliedStyleElement.type = 'text/css';
      appliedStyleElement.setAttribute('data-skinmaster', 'active');
      appliedStyleElement.setAttribute('data-skin-name', skin.short_name); // Inject the skin CSS directly without relying on classes

      appliedStyleElement.innerHTML = skin.skin;
      document.head.appendChild(appliedStyleElement); // Add skin class to player element for targeting

      const playerEl = player.el();

      if (playerEl && playerEl.classList) {
        // Extract skin class name from CSS
        const skinClassName = skin.skin.match(/\.video-js\.([^\s{,.]+)/);

        if (skinClassName && skinClassName[1]) {
          console.log('Adding skin class:', skinClassName[1]);
          playerEl.classList.add(skinClassName[1]);
        } else {
          console.warn('Could not extract skin class from CSS for skin:', skin.name);
        }
      }
    } catch (error) {
      console.error('Error applying skin:', error);
      return false;
    }

    currentSkinIndex = skinIndex;
    saveSettings(); // Trigger event

    player.trigger('skinChanged', {
      skin: skin,
      index: skinIndex
    });
    return true;
  } // Remove current skin


  function removeSkin(player) {
    try {
      // Remove injected style element
      if (appliedStyleElement && appliedStyleElement.parentNode) {
        appliedStyleElement.parentNode.removeChild(appliedStyleElement);
        appliedStyleElement = null;
      } // Remove only custom skin classes from player, preserve essential VideoJS classes


      const playerEl = player.el();

      if (playerEl && playerEl.classList) {
        console.log('Player classes before removal:', Array.from(playerEl.classList)); // List of custom skin classes to remove (not essential VideoJS classes)

        const customSkinClasses = ['vjs-yt-style', 'vjs-sublime-skin', 'vjs-iplayer-skin', 'vjs-sublime-inspired', 'vjs-netflix-dark', 'vjs-material', 'vjs-nuevo', 'vjs-vimuse', 'vjs-dark-neon', 'vjs-glassmorphism', 'vjs-retro', 'vjs-apple-tv', 'vjs-gaming', 'vjs-spotify', 'vjs-discord', 'vjs-tiktok', 'vjs-twitch', 'vjs-fluent', 'vjs-big-sur', 'vjs-ubuntu', 'vjs-material-you', 'vjs-ps5', 'vjs-minimal-white', 'vjs-sunset', 'vjs-cyberpunk', 'vjs-nature', 'vjs-ocean']; // Remove only custom skin classes, preserve all VideoJS system classes

        customSkinClasses.forEach(className => {
          if (playerEl.classList.contains(className)) {
            console.log('Removing custom skin class:', className);
            playerEl.classList.remove(className);
          }
        });
        console.log('Player classes after removal:', Array.from(playerEl.classList));
      }
    } catch (error) {
      console.error('Error removing skin:', error);
    }
  } // Create modal HTML


  function createModal() {
    return `
      <div id="skinmaster-modal" class="skinmaster-modal" style="display: none;">
        <div class="skinmaster-modal-content">
          <div class="skinmaster-modal-header">
            <h2>VideoJS SkinMaster</h2>
            <button class="skinmaster-close">&times;</button>
          </div>
          
          <div class="skinmaster-tabs">
            <button class="skinmaster-tab active" data-tab="skins">Skins</button>
            <button class="skinmaster-tab" data-tab="settings">Settings</button>
          </div>
          
          <div class="skinmaster-tab-content">
            <div id="skinmaster-skins-tab" class="skinmaster-tab-panel active">
              <div class="skinmaster-search">
                <input type="text" id="skinmaster-search" placeholder="Search skins...">
              </div>
              <div class="skinmaster-grid" id="skinmaster-grid">
                ${generateSkinsGrid()}
              </div>
            </div>
            
            <div id="skinmaster-settings-tab" class="skinmaster-tab-panel">
              <div class="skinmaster-settings">
                <div class="skinmaster-setting">
                  <label for="default-skin">Default Skin:</label>
                  <select id="default-skin">
                    ${generateSkinOptions()}
                  </select>
                </div>
                
                <div class="skinmaster-setting">
                  <label>Hotkeys:</label>
                  <div class="skinmaster-hotkeys">
                    <div class="skinmaster-hotkey">
                      <span>Toggle Modal:</span>
                      <input type="text" id="hotkey-modal" value="${settings.hotkeys.toggleModal}" placeholder="Press a key...">
                    </div>
                    <div class="skinmaster-hotkey">
                      <span>Toggle Skin:</span>
                      <input type="text" id="hotkey-toggle" value="${settings.hotkeys.activateDeactivate}" placeholder="Press a key...">
                    </div>
                    <div class="skinmaster-hotkey">
                      <span>Next Skin:</span>
                      <input type="text" id="hotkey-next" value="${settings.hotkeys.nextSkin}" placeholder="Press a key...">
                    </div>
                    <div class="skinmaster-hotkey">
                      <span>Previous Skin:</span>
                      <input type="text" id="hotkey-prev" value="${settings.hotkeys.previousSkin}" placeholder="Press a key...">
                    </div>
                  </div>
                </div>
                
                <div class="skinmaster-setting">
                  <label>
                    <input type="checkbox" id="enable-storage" ${settings.storage.enabled ? 'checked' : ''}>
                    Save preferences in localStorage
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } // Generate skins grid HTML


  function generateSkinsGrid() {
    return skinsList.map((skin, index) => `
      <div class="skinmaster-skin-item ${index === currentSkinIndex ? 'active' : ''}"
           data-index="${index}">
        <div class="skinmaster-skin-preview">
          <img src="${skin.preview_images[0] || 'https://images.placeholders.dev/?width=400&height=240&text=' + encodeURIComponent(skin.short_name) + '&bgColor=%23333333&textColor=%23ffffff'}" 
               alt="${skin.name}" 
               loading="lazy"
               onerror="this.src='https://images.placeholders.dev/?width=400&height=240&text=' + encodeURIComponent('${skin.short_name}') + '&bgColor=%23333333&textColor=%23ffffff'">
          <div class="skinmaster-skin-overlay">
            <div class="skinmaster-skin-name">${skin.short_name}</div>
            <div class="skinmaster-skin-description">${skin.description}</div>
          </div>
        </div>
        <div class="skinmaster-skin-info">
          <div class="skinmaster-skin-title">${skin.name}</div>
          <div class="skinmaster-skin-desc">${skin.description}</div>
        </div>
      </div>
    `).join('');
  } // Generate select options for default skin


  function generateSkinOptions() {
    return skinsList.map((skin, index) => `<option value="${index}" ${index === settings.defaultSkinIndex ? 'selected' : ''}>${skin.name}</option>`).join('');
  } // Setup modal events


  function setupModalEvents(player) {
    const modal = document.getElementById('skinmaster-modal');
    const closeBtn = modal.querySelector('.skinmaster-close');
    const tabs = modal.querySelectorAll('.skinmaster-tab');
    const skinItems = modal.querySelectorAll('.skinmaster-skin-item');
    const searchInput = modal.querySelector('#skinmaster-search');
    const defaultSkinSelect = modal.querySelector('#default-skin');
    const storageCheckbox = modal.querySelector('#enable-storage'); // Hotkey inputs

    const hotkeyModalInput = modal.querySelector('#hotkey-modal');
    const hotkeyToggleInput = modal.querySelector('#hotkey-toggle');
    const hotkeyNextInput = modal.querySelector('#hotkey-next');
    const hotkeyPrevInput = modal.querySelector('#hotkey-prev'); // Close modal

    closeBtn.addEventListener('click', () => toggleModal()); // Click outside to close

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        toggleModal();
      }
    }); // Tab switching

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab; // Update tab buttons

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active'); // Update tab panels

        modal.querySelectorAll('.skinmaster-tab-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        modal.querySelector(`#skinmaster-${tabName}-tab`).classList.add('active');
      });
    }); // Skin selection

    skinItems.forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        applySkin(player, index); // Update active state

        skinItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    }); // Search functionality

    searchInput.addEventListener('input', e => {
      const query = e.target.value.toLowerCase();
      skinItems.forEach(item => {
        const index = parseInt(item.dataset.index);
        const skin = skinsList[index];
        const matches = skin.name.toLowerCase().includes(query) || skin.short_name.toLowerCase().includes(query) || skin.description.toLowerCase().includes(query) || skin.features.some(f => f.toLowerCase().includes(query));
        item.style.display = matches ? 'block' : 'none';
      });
    }); // Settings

    defaultSkinSelect.addEventListener('change', e => {
      settings.defaultSkinIndex = parseInt(e.target.value);
      saveSettings();
    });
    storageCheckbox.addEventListener('change', e => {
      settings.storage.enabled = e.target.checked;
      saveSettings();
    }); // Hotkey capture functionality

    function setupHotkeyCapture(input, settingKey) {
      input.addEventListener('keydown', e => {
        e.preventDefault();
        e.stopPropagation(); // Clear the input first

        input.value = ''; // Capture the key

        const keyCode = e.code;
        input.value = keyCode; // Update settings

        settings.hotkeys[settingKey] = keyCode;
        saveSettings(); // Blur the input

        input.blur();
      });
      input.addEventListener('focus', e => {
        e.target.value = '';
        e.target.placeholder = 'Press any key...';
      });
      input.addEventListener('blur', e => {
        if (!e.target.value) {
          e.target.value = settings.hotkeys[settingKey];
        }

        e.target.placeholder = 'Press a key...';
      });
    } // Setup hotkey capture for all inputs


    setupHotkeyCapture(hotkeyModalInput, 'toggleModal');
    setupHotkeyCapture(hotkeyToggleInput, 'activateDeactivate');
    setupHotkeyCapture(hotkeyNextInput, 'nextSkin');
    setupHotkeyCapture(hotkeyPrevInput, 'previousSkin');
  } // Toggle modal


  function toggleModal(player) {
    const modal = document.getElementById('skinmaster-modal');
    if (!modal) return;
    isModalOpen = !isModalOpen;
    modal.style.display = isModalOpen ? 'flex' : 'none';

    if (isModalOpen) {
      // Update grid with current state
      const skinItems = modal.querySelectorAll('.skinmaster-skin-item');
      skinItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSkinIndex);
      }); // Focus search input

      const searchInput = modal.querySelector('#skinmaster-search');

      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  } // Setup hotkeys


  function setupHotkeys(player) {
    document.addEventListener('keydown', e => {
      // Skip if typing in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.code) {
        case settings.hotkeys.toggleModal:
          e.preventDefault();
          toggleModal();
          break;

        case settings.hotkeys.activateDeactivate:
          e.preventDefault();

          if (appliedStyleElement) {
            removeSkin(player);
          } else if (currentSkinIndex >= 0) {
            applySkin(player, currentSkinIndex);
          }

          break;

        case settings.hotkeys.nextSkin:
          if (!isModalOpen) {
            e.preventDefault();
            const nextIndex = (currentSkinIndex + 1) % skinsList.length;
            applySkin(player, nextIndex);
          }

          break;

        case settings.hotkeys.previousSkin:
          if (!isModalOpen) {
            e.preventDefault();
            const prevIndex = currentSkinIndex > 0 ? currentSkinIndex - 1 : skinsList.length - 1;
            applySkin(player, prevIndex);
          }

          break;
      }
    });
  } // Create control bar button


  function createSkinButton(player) {
    const Button = videojs__default['default'].getComponent('Button');

    class SkinMasterButton extends Button {
      constructor(player, options) {
        super(player, options);
        this.controlText('Open Skin Manager');
      }

      createEl() {
        const el = super.createEl('button', {
          className: 'vjs-skinmaster-button vjs-control vjs-button',
          innerHTML: `
            <span aria-hidden="true" class="vjs-icon-chapters"></span>
            <span class="vjs-control-text">Skins</span>
          `,
          title: 'Open Skin Manager (S)'
        });
        return el;
      }

      handleClick() {
        toggleModal(this.player());
      }

    }

    videojs__default['default'].registerComponent('SkinMasterButton', SkinMasterButton);
    return SkinMasterButton;
  }
  /**
   * Function to invoke when the player is ready.
   *
   * This is a great place for your plugin to initialize itself. When this
   * function is called, the player will have its DOM and child components
   * in place.
   *
   * @function onPlayerReady
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */


  const onPlayerReady = (player, options = {}) => {
    player.addClass('vjs-videojs-skinmaster'); // const player = this;
    // Merge options with defaults

    const opts = _extends({}, defaults, options); // Load settings


    loadSettings(); // Initialize modal with proper container handling

    if (!document.getElementById('skinmaster-modal')) {
      // Determine the correct container for the modal
      const getModalContainer = () => {
        // Check if player is in fullscreen
        if (player.isFullscreen()) {
          return player.el() || document.body;
        }

        return document.body;
      }; // Create modal in appropriate container


      getModalContainer().insertAdjacentHTML('beforeend', createModal());
      setupModalEvents(player); // Listen for fullscreen changes to reposition modal if needed

      player.on('fullscreenchange', () => {
        const modal = document.getElementById('skinmaster-modal');

        if (modal) {
          const currentContainer = modal.parentNode;
          const newContainer = getModalContainer(); // Move modal to correct container if needed

          if (currentContainer !== newContainer) {
            currentContainer.removeChild(modal);
            newContainer.appendChild(modal);
          }
        }
      });
    } // Setup hotkeys


    setupHotkeys(player); // Add control bar button

    if (opts.showSkinButton) {
      createSkinButton();
      player.ready(() => {
        player.controlBar.addChild('SkinMasterButton', {}, player.controlBar.children().length - 1);
      });
    } // Apply default skin


    if (settings.defaultSkinIndex >= 0 && settings.defaultSkinIndex < skinsList.length) {
      player.ready(() => {
        applySkin(player, settings.defaultSkinIndex);
      });
    } // Cleanup on dispose


    player.on('dispose', () => {
      removeSkin(player);
      const modal = document.getElementById('skinmaster-modal');

      if (modal) {
        modal.remove();
      }
    }); // Public API

    player.skinMaster = {
      applySkin: index => applySkin(player, index),
      removeSkin: () => removeSkin(player),
      toggleModal: () => toggleModal(),
      getCurrentSkin: () => skinsList[currentSkinIndex],
      getCurrentSkinIndex: () => currentSkinIndex,
      getAvailableSkins: () => skinsList,
      nextSkin: () => {
        const nextIndex = (currentSkinIndex + 1) % skinsList.length;
        return applySkin(player, nextIndex);
      },
      previousSkin: () => {
        const prevIndex = currentSkinIndex > 0 ? currentSkinIndex - 1 : skinsList.length - 1;
        return applySkin(player, prevIndex);
      }
    };
    return player;
  };
  /**
   * A video.js plugin.
   *
   * In the plugin function, the value of `this` is a video.js `Player`
   * instance. You cannot rely on the player being in a "ready" state here,
   * depending on how the plugin is invoked. This may or may not be important
   * to you; if not, remove the wait for "ready"!
   *
   * @function skinMaster
   * @param    {Object} [options={}]
   *           An object of options left to the plugin author to define.
   */


  const skinMaster = function (options = {}) {
    this.ready(() => {
      onPlayerReady(this, videojs__default['default'].mergeOptions(defaults, options));
    });
  }; // Register the plugin with video.js.


  videojs__default['default'].registerPlugin('skinMaster', skinMaster); // Include the version number.

  skinMaster.VERSION = version;

  return skinMaster;

})));
