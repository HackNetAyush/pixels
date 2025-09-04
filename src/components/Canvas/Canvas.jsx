import { useEffect } from 'react';
import { useCanvas } from '@/context/CanvasContext.jsx';
import ImageObj from './ImageObj';
import TextObj from './TextObj';

export const Canvas = () => {
  const { objects, selectedId, selectObject, updateObject, zoom, canvas } = useCanvas();

  // Sync drag / resize mutations back into state on interaction end
  useEffect(() => {
    const sync = () => {
      requestAnimationFrame(() => {
        objects.forEach(o => {
          const el = document.querySelector(`[data-obj-id="${o.id}"]`);
          if (!el) return;
          const style = getComputedStyle(el);
          let x = o.x, y = o.y;
          if (style.transform && style.transform !== 'none') {
            const m = new DOMMatrixReadOnly(style.transform);
            x = m.m41; y = m.m42;
          }
            const w = parseFloat(style.width) || o.width;
            const h = parseFloat(style.height) || o.height;
          if (Math.round(x) !== Math.round(o.x) || Math.round(y) !== Math.round(o.y) || Math.round(w) !== Math.round(o.width) || Math.round(h) !== Math.round(o.height)) {
            updateObject(o.id, { x, y, width: w, height: h });
          }
        });
      });
    };
    window.addEventListener('mouseup', sync);
    window.addEventListener('touchend', sync);
    return () => { window.removeEventListener('mouseup', sync); window.removeEventListener('touchend', sync); };
  }, [objects, updateObject]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-auto bg-slate-200/60" onClick={(e)=>{ if(e.target.id==='design-canvas') selectObject(null); }}>
      <div
  id="design-canvas"
  data-zoom={zoom}
  className="canvas overflow-hidden relative bg-white shadow-md outline outline-gray-300"
  style={{ width: canvas.width, height: canvas.height, transform: `scale(${zoom})`, transformOrigin: 'top left' }}
      >
        {objects.map(o => {
          if (o.type === 'image') {
            return (
              <ImageObj
                key={o.id}
                id={o.id}
                src={o.props.src}
                x={o.x}
                y={o.y}
                width={o.width}
                height={o.height}
                selected={selectedId === o.id}
                onSelect={()=>selectObject(o.id)}
                hidden={o.visible===false}
              />
            );
          }
          if (o.type === 'text') {
            return (
              <TextObj
                key={o.id}
                id={o.id}
                text={o.props.text}
                x={o.x}
                y={o.y}
                width={o.width}
                height={o.height}
                fontSize={o.props.fontSize}
                color={o.props.color}
                fontFamily={o.props.fontFamily}
                selected={selectedId === o.id}
                onSelect={()=>selectObject(o.id)}
                hidden={o.visible===false}
              />
            );
          }
          if (o.type === 'rect') {
            return (
              <div
                key={o.id}
                data-obj-id={o.id}
                data-draggable
                data-resizable
                data-bounds="#canvas-window"
                onClick={(e)=>{ e.stopPropagation(); selectObject(o.id); }}
                style={{ transform: `translate(${o.x}px, ${o.y}px)`, width: o.width, height: o.height, background: o.props.fill, display: o.visible===false ? 'none':'block' }}
                className={`absolute ${selectedId===o.id? 'outline outline-blue-400' : 'hover:outline hover:outline-blue-300'}`}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
