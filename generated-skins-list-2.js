/* Generated VideoJS Skins List 2 - 15 Advanced Visual Effects Skins */

const generatedVideoJSSkinsList2 = [
  {
    index: 1,
    source_url: "https://github.com/generated/videojs-hologram-skin",
    skin: `/* Hologram Matrix Skin */.video-js.vjs-hologram{font-family:"Orbitron",monospace;color:#00ffff;background:radial-gradient(ellipse,#0a0a0a,#1a1a2e);position:relative;overflow:hidden}.vjs-hologram::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(0,255,255,0.03) 2px,rgba(0,255,255,0.03) 4px);animation:hologramScan 2s linear infinite;pointer-events:none}@keyframes hologramScan{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}.vjs-hologram .vjs-control-bar{background:linear-gradient(180deg,transparent,rgba(26,26,46,0.95));border-top:2px solid #00ffff;box-shadow:0 0 30px rgba(0,255,255,0.5)}.vjs-hologram .vjs-big-play-button{background:radial-gradient(circle,rgba(0,255,255,0.1),rgba(26,26,46,0.9));border:3px solid #00ffff;color:#00ffff;text-shadow:0 0 20px #00ffff;animation:holoGlow 3s ease-in-out infinite alternate}@keyframes holoGlow{0%{box-shadow:0 0 40px rgba(0,255,255,0.6)}100%{box-shadow:0 0 60px rgba(0,255,255,0.9)}}.vjs-hologram .vjs-play-progress{background:linear-gradient(90deg,#00ffff,#0080ff,#8000ff);box-shadow:0 0 20px rgba(0,255,255,0.8)}`,
    skin_import: `@import url("./skins/hologram/style.css");`,
    name: "Hologram Matrix",
    short_name: "Hologram",
    description: "Futuristic holographic interface with scanning lines and glitch effects",
    preview_images: ["https://images.placeholders.dev/?width=400&height=240&text=Hologram+Matrix&bgColor=%231a1a2e&textColor=%2300ffff"],
    demo_url: "#",
    features: ["Holographic effects", "Scanning animations", "Glow effects", "Futuristic design"],
    license: "MIT",
    compatibility: ["VideoJS 7.x", "VideoJS 8.x"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = generatedVideoJSSkinsList2;
} else if (typeof window !== 'undefined') {
  window.generatedVideoJSSkinsList2 = generatedVideoJSSkinsList2;
}
