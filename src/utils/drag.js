(() => {
  const DRAG_ATTR = 'data-draggable';     // mark elements with this attribute
  const BOUNDS_ATTR = 'data-bounds';      // optional: selector for bounding container

  // Utility: parse current translate from style.transform
  const getTranslate = (el) => {
    const t = getComputedStyle(el).transform;
    if (t && t !== 'none') {
      const m = new DOMMatrixReadOnly(t);
      return { x: m.m41, y: m.m42 };
    }
    return { x: 0, y: 0 };
  };

  const getPoint = (e) => {
    if (e.touches && e.touches) return { x: e.touches.clientX, y: e.touches.clientY };
    return { x: e.clientX, y: e.clientY };
  };

  // Compute clamped x,y within bounds element if provided
  const clamp = (x, y, el, boundsEl) => {
    if (!boundsEl) return { x, y };
    const b = boundsEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const w = r.width, h = r.height;

    // Allow dragging in all directions by removing minimum bounds
    // Only constrain the maximum distance the element can be dragged
    const minX = -Infinity;
    const minY = -Infinity;
    const maxX = b.width - w;
    const maxY = b.height - h;

    return {
      x: Math.min(Math.max(minX, x), maxX),
      y: Math.min(Math.max(minY, y), maxY),
    };
  };

  const makeDraggable = (el) => {
    // Optional boundaries
    let boundsEl = null;
    const boundsSel = el.getAttribute(BOUNDS_ATTR);
    if (boundsSel) {
      boundsEl = document.querySelector(boundsSel);
      // Ensure the bounds element is a positioned context if you later switch to left/top
      // but for transforms this is not strictly necessary.
    }

    // Prevent native image drag ghosts
    if (el.tagName === 'IMG') el.draggable = false;
    el.style.willChange = 'transform';
    // For best touch behavior, set touch-action: none either here or via CSS class
    el.style.touchAction ||= 'none';
    el.style.cursor ||= 'grab';

    let dragging = false;
    let startX = 0, startY = 0;     // pointer at drag start
    let baseX = 0, baseY = 0;       // element translate at drag start

    const onDown = (e) => {
      // Only start if primary button or touch
      if (e.button !== undefined && e.button !== 0) return;
      const p = getPoint(e);
      const t = getTranslate(el);
      baseX = t.x;
      baseY = t.y;
      startX = p.x;
      startY = p.y;
      dragging = true;
      el.style.cursor = 'grabbing';
      e.preventDefault();

      // Move listeners on document to keep tracking off element
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onUp);
    };

    const onMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
  const p = getPoint(e);
  const dxRaw = p.x - startX;
  const dyRaw = p.y - startY;
  const scale = boundsEl ? parseFloat(boundsEl.getAttribute('data-zoom') || '1') : 1;
  const dx = dxRaw / scale;
  const dy = dyRaw / scale;
      let nextX = baseX + dx;
      let nextY = baseY + dy;

      if (boundsEl) {
        // Temporarily apply to measure size correctly, then clamp
        const prev = el.style.transform;
        el.style.transform = `translate(${nextX}px, ${nextY}px)`;
        const clamped = clamp(nextX, nextY, el, boundsEl);
        nextX = clamped.x; nextY = clamped.y;
        el.style.transform = prev;
      }

      el.style.transform = `translate(${nextX}px, ${nextY}px)`;
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown, { passive: false });
  };

  const init = () => {
    document.querySelectorAll(`[${DRAG_ATTR}]`).forEach(makeDraggable);

    // Support dynamically added elements
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n;
          if (el.hasAttribute && el.hasAttribute(DRAG_ATTR)) makeDraggable(el);
          el.querySelectorAll?.(`[${DRAG_ATTR}]`).forEach(makeDraggable);
        });
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();