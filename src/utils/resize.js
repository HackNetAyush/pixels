// resize.js
(() => {
  const RES_ATTR = 'data-resizable';
  const BOUNDS_ATTR = 'data-bounds';

  const getTranslate = (el) => {
    const t = getComputedStyle(el).transform;
    if (t && t !== 'none') {
      const m = new DOMMatrixReadOnly(t);
      return { x: m.m41, y: m.m42 };
    }
    return { x: 0, y: 0 };
  };
  const setTranslate = (el, x, y) => {
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const getSize = (el) => {
    const cs = getComputedStyle(el);
    return {
      w: parseFloat(cs.width),
      h: parseFloat(cs.height),
    };
  };

  const toggleHandles = (el, show) => {
    const handles = el.querySelectorAll('.rnd-handle');
    handles.forEach(handle => {
      handle.style.display = show ? 'block' : 'none';
    });
  };

  const ensureHandles = (el) => {
    if (el.querySelector('.rnd-handle')) return;
    const dirs = ['n','ne','e','se','s','sw','w','nw'];
    const frag = document.createDocumentFragment();
    dirs.forEach(d => {
      const h = document.createElement('div');
      h.className = `rnd-handle rnd-${d}`;
      h.dataset.rndHandle = d;
      h.style.display = 'none'; // Initially hidden
      frag.appendChild(h);
    });
    el.appendChild(frag);
  };

  const getPoint = (e) => {
    if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const makeResizable = (el) => {
    ensureHandles(el);

    const boundsSel = el.getAttribute(BOUNDS_ATTR);
    const boundsEl = boundsSel ? document.querySelector(boundsSel) : null;
    let isAspectRatioLocked = true; // Default to locked aspect ratio for corners

    const minW = parseFloat(el.getAttribute('data-min-w')) || 20;
    const minH = parseFloat(el.getAttribute('data-min-h')) || 20;
    const maxW = parseFloat(el.getAttribute('data-max-w')) || Infinity;
    const maxH = parseFloat(el.getAttribute('data-max-h')) || Infinity;
    const lockAspect = el.getAttribute('data-lock-aspect') === 'true';

    let resizing = false;
    let dir = null;

    let startCX = 0, startCY = 0;  // pointer at start
    let startW = 0, startH = 0;    // size at start
    let startX = 0, startY = 0;    // translate at start
    let aspect = 1;
    let isCornerResize = false;

    const getBoundsRect = () => boundsEl ? boundsEl.getBoundingClientRect() : null;

    const onDown = (e) => {
      const t = e.target;
      if (!t || !t.dataset || !t.dataset.rndHandle) return;
      const isPrimary = e.button === undefined || e.button === 0;
      if (!isPrimary) return;

      resizing = true;
      dir = t.dataset.rndHandle;
      isCornerResize = ['nw', 'ne', 'sw', 'se'].includes(dir);
      
      // Store the original image dimensions for cropping
      if (el.querySelector('img')) {
        const img = el.querySelector('img');
        el._originalWidth = img.naturalWidth;
        el._originalHeight = img.naturalHeight;
        el._imgAspect = img.naturalWidth / img.naturalHeight;
      }

      const pt = getPoint(e);
      startCX = pt.x; startCY = pt.y;

      const tr = getTranslate(el);
      startX = tr.x; startY = tr.y;

      const { w, h } = getSize(el);
      startW = w; startH = h;
      aspect = startW / startH;

      e.preventDefault();
      document.addEventListener('mousemove', onMove, { passive: false });
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onUp);
    };

    const onMove = (e) => {
      if (!resizing) return;
      e.preventDefault();
      const pt = getPoint(e);
  const scale = boundsEl ? parseFloat(boundsEl.getAttribute('data-zoom') || '1') : 1;
  const dx = (pt.x - startCX) / scale;
  const dy = (pt.y - startCY) / scale;

      let newW = startW;
      let newH = startH;
      let newX = startX;
      let newY = startY;

      const hasN = dir.includes('n');
      const hasS = dir.includes('s');
      const hasW = dir.includes('w');
      const hasE = dir.includes('e');

      // Horizontal changes
      if (hasE) newW = startW + dx;
      if (hasW) { newW = startW - dx; newX = startX + dx; }

      // Vertical changes
      if (hasS) newH = startH + dy;
      if (hasN) { newH = startH - dy; newY = startY + dy; }

      // Handle resizing based on handle type
      if (isCornerResize) {
        // For corner handles, maintain aspect ratio
        if (hasE || hasW) {
          newH = (newW / aspect);
          if (hasN) newY = startY + (startH - newH);
          if (hasS) newY = startY; // Keep top position when resizing from bottom
        } else if (hasN || hasS) {
          newW = (newH * aspect);
          if (hasW) newX = startX + (startW - newW);
          if (hasE) newX = startX; // Keep left position when resizing from right
        }
      } else {
        // For side handles, handle as crop controls
        if (hasN) {
          // Top handle - crop from top (move bottom edge up)
          newH = startH - dy;
          if (newH > minH) {
            newY = startY + dy;
          } else {
            newH = minH;
            newY = startY + (startH - minH);
          }
        } else if (hasS) {
          // Bottom handle - crop from bottom (move bottom edge down)
          newH = startH + dy;
          if (newH < minH) newH = minH;
        } else if (hasW) {
          // Left handle - crop from left (move right edge left)
          newW = startW - dx;
          if (newW > minW) {
            newX = startX + dx;
          } else {
            newW = minW;
            newX = startX + (startW - minW);
          }
        } else if (hasE) {
          // Right handle - crop from right (move right edge right)
          newW = startW + dx;
          if (newW < minW) newW = minW;
        }
      }

      // Apply min/max constraints
      newW = Math.max(minW, newW);
      newH = Math.max(minH, newH);
      
      // Enforce fixed cover behavior: do NOT alter background-size dynamically
      if (el.style.backgroundImage && el.style.backgroundImage !== 'none') {
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.style.backgroundRepeat = 'no-repeat';
        // Keep background-attachment fixed if user set; fallback to 'fixed'
        if (!el.style.backgroundAttachment || el.style.backgroundAttachment === 'scroll') {
          el.style.backgroundAttachment = 'fixed';
        }
      }

      // Bounds
      const b = getBoundsRect();
      if (b) {
        // Keep left/top within [0, ...]
        newX = Math.min(Math.max(0, newX), Math.max(0, b.width - newW));
        newY = Math.min(Math.max(0, newY), Math.max(0, b.height - newH));
        // Limit size to remaining space to the right/bottom
        newW = Math.min(newW, b.width - newX);
        newH = Math.min(newH, b.height - newY);
      }

      el.style.width = `${newW}px`;
      el.style.height = `${newH}px`;
      setTranslate(el, newX, newY);
    };

    const onUp = () => {
      if (!resizing) return;
      resizing = false;
      dir = null;
      isCornerResize = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    };

    // Delegate to the element for all handles
    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown, { passive: false });
  };

  const init = () => {
    document.querySelectorAll(`[${RES_ATTR}]`).forEach(makeResizable);

    // Listen for selection changes
    document.addEventListener('click', (e) => {
      const target = e.target.closest(`[${RES_ATTR}]`);
      // Hide handles on all elements first
      document.querySelectorAll(`[${RES_ATTR}]`).forEach(el => {
        toggleHandles(el, false);
      });
      // Show handles on selected element if it's resizable
      if (target && target.matches(`[${RES_ATTR}]`)) {
        toggleHandles(target, true);
      }
    });

    // Hide handles when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest(`[${RES_ATTR}]`)) {
        document.querySelectorAll(`[${RES_ATTR}]`).forEach(el => {
          toggleHandles(el, false);
        });
      }
    }, true);

    // Observe dynamically added nodes
    const mo = new MutationObserver(muts => {
      muts.forEach(m => {
        m.addedNodes.forEach(n => {
          if (n.nodeType !== 1) return;
          const el = n;
          if (el.hasAttribute?.(RES_ATTR)) makeResizable(el);
          el.querySelectorAll?.(`[${RES_ATTR}]`).forEach(makeResizable);
        });
      });
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();