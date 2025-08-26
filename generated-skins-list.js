/* Generated VideoJS Skins List - 10 Brand New Skins */

const generatedVideoJSSkinsList = [
  {
    index: 1,
    source_url: "https://github.com/generated/videojs-aurora-skin",
    skin: `
/* Aurora Borealis Skin */
.video-js.vjs-aurora {
  font-family: "Inter", "Segoe UI", sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  position: relative;
  overflow: hidden;
}

.vjs-aurora::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 30% 20%, rgba(0, 255, 163, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(255, 0, 128, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 20% 70%, rgba(0, 128, 255, 0.25) 0%, transparent 50%);
  animation: aurora 15s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes aurora {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.vjs-aurora .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(30, 60, 114, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 255, 163, 0.3);
  z-index: 10;
}

.vjs-aurora .vjs-big-play-button {
  background: radial-gradient(circle, rgba(0, 255, 163, 0.2) 0%, rgba(30, 60, 114, 0.8) 100%);
  border: 2px solid #00ffa3;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 255, 163, 0.5);
  transition: all 0.4s ease;
}

.vjs-aurora .vjs-big-play-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 50px rgba(0, 255, 163, 0.8);
}

.vjs-aurora .vjs-play-progress {
  background: linear-gradient(90deg, #00ffa3 0%, #ff0080 100%);
  box-shadow: 0 0 10px rgba(0, 255, 163, 0.6);
}

.vjs-aurora .vjs-button:hover {
  color: #00ffa3;
  text-shadow: 0 0 10px rgba(0, 255, 163, 0.8);
}
    `,
    skin_import: `@import url("./skins/aurora/style.css");`,
    name: "Aurora Borealis",
    short_name: "Aurora",
    description: "Stunning Northern Lights inspired skin with animated aurora effects and ethereal gradients",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Aurora+Borealis&bgColor=%231e3c72&textColor=%2300ffa3"],
    demo_url: "#",
    features: ["Animated aurora effects", "Gradient backgrounds", "Ethereal glow", "Smooth transitions"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 2,
    source_url: "https://github.com/generated/videojs-synthwave-skin",
    skin: `
/* Synthwave Retro Skin */
.video-js.vjs-synthwave {
  font-family: "Orbitron", "Courier New", monospace;
  color: #ff00ff;
  background: linear-gradient(180deg, #0f0f23 0%, #1a0033 100%);
  position: relative;
}

.vjs-synthwave::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: 
    linear-gradient(90deg, transparent 0%, #ff00ff 2%, transparent 4%),
    linear-gradient(90deg, transparent 20%, #00ffff 22%, transparent 24%),
    linear-gradient(90deg, transparent 40%, #ff00ff 42%, transparent 44%);
  background-size: 100px 2px, 150px 2px, 200px 2px;
  background-position: 0 100%, 0 95%, 0 90%;
  background-repeat: repeat-x;
  animation: synthGrid 3s linear infinite;
  opacity: 0.3;
  pointer-events: none;
}

@keyframes synthGrid {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}

.vjs-synthwave .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(26, 0, 51, 0.95) 100%);
  border-top: 2px solid #ff00ff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
}

.vjs-synthwave .vjs-big-play-button {
  background: radial-gradient(circle, rgba(255, 0, 255, 0.2) 0%, rgba(15, 15, 35, 0.9) 100%);
  border: 3px solid #ff00ff;
  border-radius: 8px;
  color: #00ffff;
  text-shadow: 0 0 15px #00ffff;
  box-shadow: 
    0 0 20px rgba(255, 0, 255, 0.6),
    inset 0 0 20px rgba(0, 255, 255, 0.2);
}

.vjs-synthwave .vjs-play-progress {
  background: linear-gradient(90deg, #ff00ff 0%, #00ffff 50%, #ff1493 100%);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.8);
  height: 6px;
}

.vjs-synthwave .vjs-button {
  color: #ff00ff;
  text-shadow: 0 0 8px #ff00ff;
  transition: all 0.3s ease;
}

.vjs-synthwave .vjs-button:hover {
  color: #00ffff;
  text-shadow: 0 0 12px #00ffff;
  transform: scale(1.1);
}
    `,
    skin_import: `@import url("./skins/synthwave/style.css");`,
    name: "Synthwave Retro",
    short_name: "Synthwave",
    description: "80s synthwave inspired design with neon colors, grid animations and retro-futuristic aesthetics",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Synthwave+Retro&bgColor=%231a0033&textColor=%23ff00ff"],
    demo_url: "#",
    features: ["Retro 80s design", "Neon glow effects", "Animated grid", "Synthwave colors"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 3,
    source_url: "https://github.com/generated/videojs-forest-skin",
    skin: `
/* Forest Green Skin */
.video-js.vjs-forest {
  font-family: "Nunito", "Segoe UI", sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #134e5e 0%, #71b280 100%);
}

.vjs-forest .vjs-poster {
  filter: sepia(20%) saturate(1.2) brightness(0.9);
}

.vjs-forest .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(19, 78, 94, 0.9) 100%);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(113, 178, 128, 0.4);
}

.vjs-forest .vjs-big-play-button {
  background: rgba(19, 78, 94, 0.8);
  border: 3px solid #71b280;
  border-radius: 50%;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(113, 178, 128, 0.3);
}

.vjs-forest .vjs-big-play-button:hover {
  background: rgba(113, 178, 128, 0.3);
  transform: scale(1.05);
  box-shadow: 0 6px 30px rgba(113, 178, 128, 0.5);
}

.vjs-forest .vjs-play-progress {
  background: linear-gradient(90deg, #71b280 0%, #52a05a 100%);
  box-shadow: 0 0 8px rgba(113, 178, 128, 0.6);
}

.vjs-forest .vjs-volume-level {
  background: linear-gradient(90deg, #71b280 0%, #52a05a 100%);
}

.vjs-forest .vjs-button {
  color: #ffffff;
  transition: all 0.3s ease;
}

.vjs-forest .vjs-button:hover {
  color: #71b280;
  text-shadow: 0 0 8px rgba(113, 178, 128, 0.8);
}

.vjs-forest .vjs-menu-button-popup .vjs-menu {
  background: rgba(19, 78, 94, 0.95);
  border: 1px solid rgba(113, 178, 128, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.vjs-forest .vjs-menu li:hover {
  background: rgba(113, 178, 128, 0.2);
}
    `,
    skin_import: `@import url("./skins/forest/style.css");`,
    name: "Forest Green",
    short_name: "Forest",
    description: "Nature-inspired skin with calming green gradients and organic feel for a peaceful viewing experience",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Forest+Green&bgColor=%23134e5e&textColor=%2371b280"],
    demo_url: "#",
    features: ["Nature-inspired", "Calming greens", "Organic gradients", "Peaceful design"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 4,
    source_url: "https://github.com/generated/videojs-golden-skin",
    skin: `
/* Golden Luxury Skin */
.video-js.vjs-golden {
  font-family: "Playfair Display", "Georgia", serif;
  color: #ffffff;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b00 100%);
  position: relative;
}

.vjs-golden::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.vjs-golden .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(45, 27, 0, 0.95) 100%);
  border-top: 2px solid #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

.vjs-golden .vjs-big-play-button {
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(45, 27, 0, 0.9) 100%);
  border: 3px solid #ffd700;
  border-radius: 8px;
  color: #ffd700;
  transition: all 0.4s ease;
  box-shadow: 
    0 4px 20px rgba(255, 215, 0, 0.4),
    inset 0 0 20px rgba(255, 215, 0, 0.1);
}

.vjs-golden .vjs-big-play-button:hover {
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(45, 27, 0, 0.8) 100%);
  transform: scale(1.05);
  box-shadow: 
    0 6px 30px rgba(255, 215, 0, 0.6),
    inset 0 0 30px rgba(255, 215, 0, 0.2);
}

.vjs-golden .vjs-play-progress {
  background: linear-gradient(90deg, #ffd700 0%, #ffed4a 50%, #ffd700 100%);
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.8);
  position: relative;
}

.vjs-golden .vjs-play-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: goldShimmer 2s ease-in-out infinite;
}

@keyframes goldShimmer {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.vjs-golden .vjs-button {
  color: #ffd700;
  transition: all 0.3s ease;
}

.vjs-golden .vjs-button:hover {
  color: #ffed4a;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}
    `,
    skin_import: `@import url("./skins/golden/style.css");`,
    name: "Golden Luxury",
    short_name: "Golden",
    description: "Luxurious golden theme with shimmer effects and elegant typography for premium content",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Golden+Luxury&bgColor=%232d1b00&textColor=%23ffd700"],
    demo_url: "#",
    features: ["Luxury design", "Gold shimmer effects", "Elegant typography", "Premium feel"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 5,
    source_url: "https://github.com/generated/videojs-space-skin",
    skin: `
/* Deep Space Skin */
.video-js.vjs-space {
  font-family: "Exo 2", "Arial", sans-serif;
  color: #ffffff;
  background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  position: relative;
  overflow: hidden;
}

.vjs-space::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #ffffff, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: starfield 20s linear infinite;
  pointer-events: none;
  opacity: 0.8;
}

@keyframes starfield {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

.vjs-space .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(15, 15, 35, 0.95) 100%);
  border-top: 1px solid rgba(100, 149, 237, 0.5);
  box-shadow: 0 0 20px rgba(100, 149, 237, 0.3);
  backdrop-filter: blur(10px);
}

.vjs-space .vjs-big-play-button {
  background: radial-gradient(circle, rgba(100, 149, 237, 0.2) 0%, rgba(15, 15, 35, 0.9) 100%);
  border: 2px solid #6495ed;
  border-radius: 50%;
  color: #6495ed;
  transition: all 0.4s ease;
  box-shadow: 
    0 0 30px rgba(100, 149, 237, 0.5),
    inset 0 0 20px rgba(100, 149, 237, 0.1);
}

.vjs-space .vjs-big-play-button:hover {
  border-color: #87ceeb;
  color: #87ceeb;
  transform: scale(1.1);
  box-shadow: 
    0 0 50px rgba(135, 206, 235, 0.7),
    inset 0 0 30px rgba(135, 206, 235, 0.2);
}

.vjs-space .vjs-play-progress {
  background: linear-gradient(90deg, #6495ed 0%, #87ceeb 50%, #4169e1 100%);
  box-shadow: 0 0 15px rgba(100, 149, 237, 0.8);
}

.vjs-space .vjs-button {
  color: #87ceeb;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px rgba(135, 206, 235, 0.5);
}

.vjs-space .vjs-button:hover {
  color: #ffffff;
  text-shadow: 0 0 12px rgba(135, 206, 235, 0.9);
}
    `,
    skin_import: `@import url("./skins/space/style.css");`,
    name: "Deep Space",
    short_name: "Space",
    description: "Cosmic theme with animated starfield, celestial colors and interstellar ambiance",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Deep+Space&bgColor=%231a1a2e&textColor=%236495ed"],
    demo_url: "#",
    features: ["Animated starfield", "Cosmic colors", "Space ambiance", "Celestial design"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 6,
    source_url: "https://github.com/generated/videojs-coral-skin",
    skin: `
/* Coral Reef Skin */
.video-js.vjs-coral {
  font-family: "Poppins", "Helvetica Neue", sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #ff7f7f 0%, #ff9999 50%, #ffb3b3 100%);
  position: relative;
}

.vjs-coral::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 160, 122, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 218, 185, 0.25) 0%, transparent 50%);
  animation: coralWave 12s ease-in-out infinite;
  pointer-events: none;
}

@keyframes coralWave {
  0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.9; transform: scale(1.05) rotate(2deg); }
}

.vjs-coral .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(255, 127, 127, 0.9) 100%);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.vjs-coral .vjs-big-play-button {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 127, 127, 0.8) 100%);
  border: 3px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(255, 127, 127, 0.4);
}

.vjs-coral .vjs-big-play-button:hover {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 160, 122, 0.9) 100%);
  transform: scale(1.08);
  box-shadow: 0 6px 30px rgba(255, 160, 122, 0.6);
}

.vjs-coral .vjs-play-progress {
  background: linear-gradient(90deg, #ffffff 0%, #ffe4e1 50%, #ffd0c4 100%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.vjs-coral .vjs-volume-level {
  background: linear-gradient(90deg, #ffffff 0%, #ffe4e1 100%);
}

.vjs-coral .vjs-button {
  color: #ffffff;
  transition: all 0.3s ease;
}

.vjs-coral .vjs-button:hover {
  color: #ffe4e1;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.vjs-coral .vjs-time-display {
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(255, 127, 127, 0.5);
}
    `,
    skin_import: `@import url("./skins/coral/style.css");`,
    name: "Coral Reef",
    short_name: "Coral",
    description: "Warm coral tones with ocean-inspired animations and soft gradients for a tropical feel",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Coral+Reef&bgColor=%23ff7f7f&textColor=%23ffffff"],
    demo_url: "#",
    features: ["Coral color palette", "Ocean animations", "Warm gradients", "Tropical design"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 7,
    source_url: "https://github.com/generated/videojs-midnight-skin",
    skin: `
/* Midnight Blue Skin */
.video-js.vjs-midnight {
  font-family: "Roboto Condensed", "Arial Narrow", sans-serif;
  color: #e6f3ff;
  background: linear-gradient(135deg, #191970 0%, #000080 50%, #00008b 100%);
  position: relative;
}

.vjs-midnight .vjs-poster {
  filter: brightness(0.8) contrast(1.1) saturate(1.2);
}

.vjs-midnight .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(25, 25, 112, 0.95) 100%);
  border-top: 1px solid rgba(173, 216, 230, 0.3);
  box-shadow: 0 0 15px rgba(173, 216, 230, 0.2);
  backdrop-filter: blur(10px);
}

.vjs-midnight .vjs-big-play-button {
  background: radial-gradient(circle, rgba(173, 216, 230, 0.2) 0%, rgba(25, 25, 112, 0.9) 100%);
  border: 2px solid #add8e6;
  border-radius: 12px;
  color: #add8e6;
  transition: all 0.4s ease;
  box-shadow: 
    0 4px 20px rgba(173, 216, 230, 0.3),
    inset 0 0 15px rgba(173, 216, 230, 0.1);
}

.vjs-midnight .vjs-big-play-button:hover {
  border-color: #87cefa;
  color: #87cefa;
  transform: scale(1.05);
  box-shadow: 
    0 6px 30px rgba(135, 206, 250, 0.5),
    inset 0 0 25px rgba(135, 206, 250, 0.2);
}

.vjs-midnight .vjs-play-progress {
  background: linear-gradient(90deg, #add8e6 0%, #87cefa 50%, #4682b4 100%);
  box-shadow: 0 0 12px rgba(173, 216, 230, 0.7);
}

.vjs-midnight .vjs-volume-level {
  background: linear-gradient(90deg, #add8e6 0%, #87cefa 100%);
}

.vjs-midnight .vjs-progress-holder {
  background: rgba(173, 216, 230, 0.2);
  border-radius: 3px;
}

.vjs-midnight .vjs-button {
  color: #add8e6;
  transition: all 0.3s ease;
}

.vjs-midnight .vjs-button:hover {
  color: #87cefa;
  text-shadow: 0 0 8px rgba(135, 206, 250, 0.8);
}

.vjs-midnight .vjs-menu-button-popup .vjs-menu {
  background: rgba(25, 25, 112, 0.95);
  border: 1px solid rgba(173, 216, 230, 0.3);
  border-radius: 6px;
  backdrop-filter: blur(15px);
}

.vjs-midnight .vjs-menu li:hover {
  background: rgba(173, 216, 230, 0.2);
}
    `,
    skin_import: `@import url("./skins/midnight/style.css");`,
    name: "Midnight Blue",
    short_name: "Midnight",
    description: "Deep midnight blue theme with ethereal light blue accents for nighttime viewing",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Midnight+Blue&bgColor=%23191970&textColor=%23add8e6"],
    demo_url: "#",
    features: ["Midnight blue palette", "Ethereal accents", "Night viewing", "Calming design"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 8,
    source_url: "https://github.com/generated/videojs-sunset-skin",
    skin: `
/* Sunset Orange Skin */
.video-js.vjs-sunset {
  font-family: "Quicksand", "Verdana", sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #ff4500 0%, #ff6347 30%, #ffa500 70%, #ffb347 100%);
  position: relative;
}

.vjs-sunset::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 50% 0%, rgba(255, 69, 0, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 0% 100%, rgba(255, 165, 0, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 100%, rgba(255, 99, 71, 0.25) 0%, transparent 50%);
  animation: sunsetGlow 10s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes sunsetGlow {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}

.vjs-sunset .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(255, 69, 0, 0.9) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
}

.vjs-sunset .vjs-big-play-button {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 69, 0, 0.8) 100%);
  border: 3px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(255, 69, 0, 0.5);
}

.vjs-sunset .vjs-big-play-button:hover {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 165, 0, 0.9) 100%);
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(255, 165, 0, 0.7);
}

.vjs-sunset .vjs-play-progress {
  background: linear-gradient(90deg, #ffffff 0%, #ffe4b5 50%, #ffd700 100%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.vjs-sunset .vjs-volume-level {
  background: linear-gradient(90deg, #ffffff 0%, #ffe4b5 100%);
}

.vjs-sunset .vjs-button {
  color: #ffffff;
  transition: all 0.3s ease;
  text-shadow: 0 1px 3px rgba(255, 69, 0, 0.5);
}

.vjs-sunset .vjs-button:hover {
  color: #ffe4b5;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.vjs-sunset .vjs-time-display {
  color: #ffffff;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(255, 69, 0, 0.7);
}

.vjs-sunset .vjs-menu-button-popup .vjs-menu {
  background: rgba(255, 69, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}
    `,
    skin_import: `@import url("./skins/sunset/style.css");`,
    name: "Sunset Orange",
    short_name: "Sunset",
    description: "Warm sunset colors with golden hour vibes and radiant orange gradients",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Sunset+Orange&bgColor=%23ff4500&textColor=%23ffffff"],
    demo_url: "#",
    features: ["Sunset color palette", "Golden hour vibes", "Warm gradients", "Radiant glow"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 9,
    source_url: "https://github.com/generated/videojs-glacier-skin",
    skin: `
/* Glacier Ice Skin */
.video-js.vjs-glacier {
  font-family: "Montserrat", "Helvetica", sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 30%, #4fc3f7 70%, #29b6f6 100%);
  position: relative;
}

.vjs-glacier::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 42%, transparent 44%),
    linear-gradient(-45deg, transparent 60%, rgba(255, 255, 255, 0.08) 62%, transparent 64%);
  background-size: 60px 60px, 80px 80px;
  animation: glacierShine 8s linear infinite;
  pointer-events: none;
}

@keyframes glacierShine {
  0% { transform: translateX(-100px) translateY(-100px); }
  100% { transform: translateX(100px) translateY(100px); }
}

.vjs-glacier .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(41, 182, 246, 0.9) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  box-shadow: 0 0 20px rgba(79, 195, 247, 0.3);
}

.vjs-glacier .vjs-big-play-button {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(41, 182, 246, 0.8) 100%);
  border: 3px solid #ffffff;
  border-radius: 8px;
  color: #ffffff;
  transition: all 0.4s ease;
  box-shadow: 
    0 4px 20px rgba(79, 195, 247, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
}

.vjs-glacier .vjs-big-play-button:hover {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(79, 195, 247, 0.9) 100%);
  transform: scale(1.05);
  box-shadow: 
    0 6px 30px rgba(79, 195, 247, 0.6),
    inset 0 0 30px rgba(255, 255, 255, 0.3);
}

.vjs-glacier .vjs-play-progress {
  background: linear-gradient(90deg, #ffffff 0%, #e1f5fe 50%, #b3e5fc 100%);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
  position: relative;
}

.vjs-glacier .vjs-play-progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%);
  animation: iceFlow 3s ease-in-out infinite;
}

@keyframes iceFlow {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.vjs-glacier .vjs-button {
  color: #ffffff;
  transition: all 0.3s ease;
  text-shadow: 0 1px 3px rgba(41, 182, 246, 0.5);
}

.vjs-glacier .vjs-button:hover {
  color: #e1f5fe;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}
    `,
    skin_import: `@import url("./skins/glacier/style.css");`,
    name: "Glacier Ice",
    short_name: "Glacier",
    description: "Cool glacier theme with icy blue tones and crystalline shine effects",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Glacier+Ice&bgColor=%234fc3f7&textColor=%23ffffff"],
    demo_url: "#",
    features: ["Icy blue palette", "Crystalline effects", "Cool gradients", "Glacier shine"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  },
  {
    index: 10,
    source_url: "https://github.com/generated/videojs-lavender-skin",
    skin: `
/* Lavender Dreams Skin */
.video-js.vjs-lavender {
  font-family: "Lato", "Segoe UI", sans-serif;
  color: #ffffff;
  background: linear-gradient(135deg, #9c88ff 0%, #8c7ae6 30%, #7158e2 70%, #6c5ce7 100%);
  position: relative;
}

.vjs-lavender::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(156, 136, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(140, 122, 230, 0.15) 0%, transparent 70%);
  animation: lavenderBreeze 14s ease-in-out infinite;
  pointer-events: none;
}

@keyframes lavenderBreeze {
  0%, 100% { opacity: 0.7; transform: scale(1) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.02) rotate(1deg); }
}

.vjs-lavender .vjs-control-bar {
  background: linear-gradient(180deg, transparent 0%, rgba(108, 92, 231, 0.9) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px rgba(156, 136, 255, 0.3);
}

.vjs-lavender .vjs-big-play-button {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(108, 92, 231, 0.8) 100%);
  border: 3px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.4s ease;
  box-shadow: 
    0 4px 20px rgba(156, 136, 255, 0.4),
    inset 0 0 15px rgba(255, 255, 255, 0.1);
}

.vjs-lavender .vjs-big-play-button:hover {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(140, 122, 230, 0.9) 100%);
  transform: scale(1.08);
  box-shadow: 
    0 6px 30px rgba(140, 122, 230, 0.6),
    inset 0 0 25px rgba(255, 255, 255, 0.2);
}

.vjs-lavender .vjs-play-progress {
  background: linear-gradient(90deg, #ffffff 0%, #f0e6ff 50%, #e6d7ff 100%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.vjs-lavender .vjs-volume-level {
  background: linear-gradient(90deg, #ffffff 0%, #f0e6ff 100%);
}

.vjs-lavender .vjs-button {
  color: #ffffff;
  transition: all 0.3s ease;
  text-shadow: 0 1px 3px rgba(108, 92, 231, 0.5);
}

.vjs-lavender .vjs-button:hover {
  color: #f0e6ff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.vjs-lavender .vjs-time-display {
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(108, 92, 231, 0.6);
}

.vjs-lavender .vjs-menu-button-popup .vjs-menu {
  background: rgba(108, 92, 231, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(12px);
}

.vjs-lavender .vjs-menu li:hover {
  background: rgba(156, 136, 255, 0.3);
}
    `,
    skin_import: `@import url("./skins/lavender/style.css");`,
    name: "Lavender Dreams",
    short_name: "Lavender",
    description: "Soothing lavender purple theme with dreamy gradients and gentle animations",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Lavender+Dreams&bgColor=%239c88ff&textColor=%23ffffff"],
    demo_url: "#",
    features: ["Lavender color scheme", "Dreamy animations", "Soothing gradients", "Gentle effects"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  }
];

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = generatedVideoJSSkinsList;
} else if (typeof window !== 'undefined') {
  window.generatedVideoJSSkinsList = generatedVideoJSSkinsList;
}