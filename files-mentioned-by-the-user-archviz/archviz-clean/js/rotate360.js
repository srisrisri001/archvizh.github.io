// ─── 360 Panorama Viewer (Three.js + Canvas 2D fallback) ─────────────────────
//
// Strategy:
//   1. Try Three.js WebGL sphere (true immersive 360°).
//      Works when opened via launch-dev.bat (--allow-file-access-from-files)
//      or from any real HTTP server.
//   2. If WebGL texture loading is blocked (plain file:// in Chrome),
//      automatically fall back to a smooth Canvas 2D panorama strip.
//
// Public API (same function names, compatible with home.js / explore-project.js):
//   initThreeJSPanorama(imageUrl, containerId)
//   destroyThreeJSPanorama()
// ─────────────────────────────────────────────────────────────────────────────

let _activeMode = null;   // 'three' | 'canvas' | null

// ═══════════════════════════════════════════════════════════════════════════════
//  PUBLIC ENTRY POINTS
// ═══════════════════════════════════════════════════════════════════════════════

function initThreeJSPanorama(imageUrl, containerId) {
  destroyThreeJSPanorama();

  if (typeof THREE !== 'undefined') {
    _threeInit(imageUrl, containerId);
  } else {
    _canvasInit(imageUrl, containerId);
  }
}

function destroyThreeJSPanorama() {
  if (_activeMode === 'three')  _threeDestroy();
  if (_activeMode === 'canvas') _canvasDestroy();
  _activeMode = null;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  THREE.JS SPHERE RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

let _tScene, _tCamera, _tRenderer, _tSphere, _tTexture, _tAnimId;
let _tIsDrag = false, _tLon = 0, _tLat = 0;
let _tPtrStart = { x: 0, y: 0 }, _tRotStart = { lon: 0, lat: 0 };
const _T_AUTO  = 0.00032;    // radians/frame
const _T_DRAG  = 0.003;      // drag sensitivity
let _tContainerId = null;

function _threeInit(imageUrl, containerId) {
  _tContainerId = containerId;
  const el = document.getElementById(containerId);
  if (!el) return;

  _tLon = 0; _tLat = 0;
  _activeMode = 'three';

  // ── Scene / Camera ──────────────────────────────────────────────────────────
  _tScene  = new THREE.Scene();
  _tCamera = new THREE.PerspectiveCamera(75, el.offsetWidth / el.offsetHeight, 0.1, 1100);
  _tCamera.position.set(0, 0, 0.001);

  // ── Renderer ────────────────────────────────────────────────────────────────
  _tRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  _tRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  _tRenderer.setSize(el.offsetWidth || 700, el.offsetHeight || 330);
  if (THREE.SRGBColorSpace) _tRenderer.outputColorSpace = THREE.SRGBColorSpace;

  const canvas = _tRenderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;border-radius:8px;touch-action:none;cursor:grab;';
  el.appendChild(canvas);

  // ── Inside-out sphere ───────────────────────────────────────────────────────
  const geo = new THREE.SphereGeometry(500, 64, 40);
  geo.scale(-1, 1, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  _tSphere = new THREE.Mesh(geo, mat);
  _tScene.add(_tSphere);

  // ── Load texture ────────────────────────────────────────────────────────────
  // Load via plain Image element — avoids THREE.TextureLoader (which uses fetch).
  // Works when --allow-file-access-from-files is set (launch-dev.bat).
  const img = new Image();
  let _tFallbackTimer = null;

  img.onload = () => {
    if (!_tSphere) return;
    try {
      const tex = new THREE.Texture(img);
      if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      _tTexture = tex;
      _tSphere.material.map = tex;
      _tSphere.material.color.setHex(0xffffff);
      _tSphere.material.needsUpdate = true;

      // Cancel fallback — texture loaded OK
      clearTimeout(_tFallbackTimer);
    } catch (err) {
      clearTimeout(_tFallbackTimer);
      console.warn('Three.js texture error — Canvas 2D fallback', err);
      _threeDestroy();
      _canvasInit(imageUrl, containerId);
    }
  };
  img.onerror = () => {
    clearTimeout(_tFallbackTimer);
    _threeDestroy();
    _canvasInit(imageUrl, containerId);
  };

  // If the image doesn't load within 2 s (file:// CORS block), fall back
  _tFallbackTimer = setTimeout(() => {
    if (_tSphere && !_tTexture) {
      console.warn('Three.js texture timed out — Canvas 2D fallback');
      _threeDestroy();
      _canvasInit(imageUrl, containerId);
    }
  }, 2000);
  img.src = imageUrl;

  // ── Pointer events on the canvas ────────────────────────────────────────────
  canvas.addEventListener('pointerdown', _tDown);
  window.addEventListener('pointermove',  _tMove);
  window.addEventListener('pointerup',    _tUp);
  window.addEventListener('pointercancel',_tUp);
  window.addEventListener('resize',       _tResize);

  _tRender();
}

function _threeDestroy() {
  cancelAnimationFrame(_tAnimId);
  window.removeEventListener('pointermove',   _tMove);
  window.removeEventListener('pointerup',     _tUp);
  window.removeEventListener('pointercancel', _tUp);
  window.removeEventListener('resize',        _tResize);

  if (_tTexture)  { _tTexture.dispose(); _tTexture = null; }
  if (_tSphere)   { _tSphere.geometry.dispose(); _tSphere.material.dispose(); _tSphere = null; }
  if (_tRenderer) {
    _tRenderer.dispose();
    _tRenderer.forceContextLoss();
    const dom = _tRenderer.domElement;
    if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
    _tRenderer = null;
  }
  _tScene = null; _tCamera = null; _tIsDrag = false;
}

function _tDown(e) {
  _tIsDrag = true;
  e.currentTarget.style.cursor = 'grabbing';
  e.currentTarget.setPointerCapture(e.pointerId);
  _tPtrStart = { x: e.clientX, y: e.clientY };
  _tRotStart = { lon: _tLon, lat: _tLat };
}

function _tMove(e) {
  if (!_tIsDrag) return;
  _tLon = _tRotStart.lon - (e.clientX - _tPtrStart.x) * _T_DRAG;
  _tLat = Math.max(-Math.PI / 2 + 0.02,
          Math.min( Math.PI / 2 - 0.02,
                    _tRotStart.lat + (e.clientY - _tPtrStart.y) * _T_DRAG));
}

function _tUp(e) {
  _tIsDrag = false;
  const el = _tContainerId && document.getElementById(_tContainerId);
  if (el) el.style.cursor = 'grab';
}

function _tResize() {
  const el = _tContainerId && document.getElementById(_tContainerId);
  if (!el || !_tCamera || !_tRenderer) return;
  _tCamera.aspect = el.offsetWidth / el.offsetHeight;
  _tCamera.updateProjectionMatrix();
  _tRenderer.setSize(el.offsetWidth, el.offsetHeight);
}

function _tRender() {
  _tAnimId = requestAnimationFrame(_tRender);
  if (!_tIsDrag) _tLon += _T_AUTO;
  _tCamera.lookAt(
    500 * Math.sin(_tLon) * Math.cos(_tLat),
    500 * Math.sin(_tLat),
    500 * Math.cos(_tLon) * Math.cos(_tLat)
  );
  if (_tRenderer && _tScene && _tCamera) _tRenderer.render(_tScene, _tCamera);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CANVAS 2D FALLBACK (works on plain file://)
// ═══════════════════════════════════════════════════════════════════════════════

let _cCanvas, _cCtx, _cImg, _cAnimId, _cContainer;
let _cX = 0, _cY = 0, _cVelX = 0;
let _cDrag = false, _cLx = 0, _cLy = 0;
const _C_AUTO = 0.00022;
const _C_FOV  = 0.62;       // fraction of panorama width visible
const _C_FRIC = 0.90;

function _canvasInit(imageUrl, containerId) {
  _cContainer = document.getElementById(containerId);
  if (!_cContainer) return;
  _activeMode = 'canvas';
  _cX = 0; _cY = 0; _cVelX = 0;

  _cCanvas = document.createElement('canvas');
  _cCanvas.style.cssText = 'display:block;width:100%;height:100%;border-radius:8px;cursor:grab;touch-action:none;';
  _cContainer.appendChild(_cCanvas);
  _cCtx = _cCanvas.getContext('2d');
  _cResize();

  _cImg = new Image();
  _cImg.onload  = () => { _cLoop(); };
  _cImg.onerror = () => { _cPlaceholder('Could not load panorama image'); };
  _cImg.src = imageUrl;

  _cCanvas.addEventListener('pointerdown', _cDown);
  window.addEventListener('pointermove',   _cMove);
  window.addEventListener('pointerup',     _cUp);
  window.addEventListener('pointercancel', _cUp);
  window.addEventListener('resize',        _cResize);
}

function _canvasDestroy() {
  cancelAnimationFrame(_cAnimId);
  window.removeEventListener('pointermove',   _cMove);
  window.removeEventListener('pointerup',     _cUp);
  window.removeEventListener('pointercancel', _cUp);
  window.removeEventListener('resize',        _cResize);
  if (_cCanvas && _cCanvas.parentNode) _cCanvas.parentNode.removeChild(_cCanvas);
  _cCanvas = null; _cCtx = null; _cImg = null; _cContainer = null; _cDrag = false;
}

function _cLoop() {
  _cAnimId = requestAnimationFrame(_cLoop);
  if (!_cDrag) {
    _cX += _C_AUTO;
    if (Math.abs(_cVelX) > 0.00005) { _cX += _cVelX; _cVelX *= _C_FRIC; } else _cVelX = 0;
  }
  _cX = ((_cX % 1) + 1) % 1;
  _cY = Math.max(0, Math.min(1, _cY));
  _cDraw();
}

function _cDraw() {
  if (!_cCtx || !_cImg || !_cImg.complete || !_cImg.naturalWidth) return;
  const cw = _cCanvas.width, ch = _cCanvas.height;
  const iw = _cImg.naturalWidth,  ih = _cImg.naturalHeight;
  const srcW = Math.round(iw * _C_FOV);
  const srcH = ih;
  const srcY = 0;
  const x0 = Math.round(_cX * iw);
  _cCtx.clearRect(0, 0, cw, ch);
  const right = Math.min(srcW, iw - x0);
  _cCtx.drawImage(_cImg, x0, srcY, right, srcH, 0, 0, Math.round(cw * right / srcW), ch);
  if (right < srcW) {
    const lw = srcW - right, dx = Math.round(cw * right / srcW);
    _cCtx.drawImage(_cImg, 0, srcY, lw, srcH, dx, 0, cw - dx, ch);
  }
  const g = _cCtx.createLinearGradient(0, 0, cw, 0);
  g.addColorStop(0, 'rgba(0,0,0,0.3)'); g.addColorStop(0.08, 'rgba(0,0,0,0)');
  g.addColorStop(0.92, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.3)');
  _cCtx.fillStyle = g; _cCtx.fillRect(0, 0, cw, ch);
}

function _cPlaceholder(msg) {
  if (!_cCtx || !_cCanvas) return;
  _cCtx.fillStyle = '#111'; _cCtx.fillRect(0, 0, _cCanvas.width, _cCanvas.height);
  _cCtx.fillStyle = 'rgba(255,255,255,0.4)'; _cCtx.font = '13px sans-serif';
  _cCtx.textAlign = 'center'; _cCtx.fillText(msg, _cCanvas.width / 2, _cCanvas.height / 2);
}

function _cResize() {
  if (!_cCanvas || !_cContainer) return;
  _cCanvas.width  = _cContainer.offsetWidth  || 700;
  _cCanvas.height = _cContainer.offsetHeight || 330;
  _cDraw();
}

function _cDown(e) {
  _cDrag = true; _cVelX = 0;
  _cLx = e.clientX; _cLy = e.clientY;
  if (_cCanvas) { _cCanvas.style.cursor = 'grabbing'; _cCanvas.setPointerCapture(e.pointerId); }
}

function _cMove(e) {
  if (!_cDrag || !_cImg || !_cImg.naturalWidth) return;
  const dx = e.clientX - _cLx;
  _cLx = e.clientX; _cLy = e.clientY;
  const srcW = _cImg.naturalWidth * _C_FOV;
  _cVelX = -dx / (_cCanvas ? _cCanvas.width : 700) * _C_FOV;
  _cX += _cVelX;
}

function _cUp() {
  _cDrag = false;
  if (_cCanvas) _cCanvas.style.cursor = 'grab';
}
