const ImageObj = ({ id, src, x=0, y=0, width=100, height=100, selected, hidden, onSelect }) => {
  if (hidden) return null;
  return (
    <div
      data-obj-id={id}
      data-draggable
      data-resizable
      // data-bounds="#canvas-window"
      onClick={(e)=>{ 
        e.stopPropagation(); 
        document.querySelectorAll('[data-resizable]').forEach(el=>{ if(el!==e.currentTarget){ el.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='none'); }});
        e.currentTarget.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='block');
        onSelect?.(); 
      }}
      onTouchStart={(e)=>{
        e.stopPropagation();
        document.querySelectorAll('[data-resizable]').forEach(el=>{ if(el!==e.currentTarget){ el.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='none'); }});
        e.currentTarget.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='block');
        onSelect?.();
      }}
      onPointerDown={(e)=>{
        if (e.pointerType === 'touch' || e.pointerType === 'pen' || e.pointerType === 'mouse') {
          e.stopPropagation();
          document.querySelectorAll('[data-resizable]').forEach(el=>{ if(el!==e.currentTarget){ el.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='none'); }});
          e.currentTarget.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='block');
          onSelect?.();
        }
      }}
      style={{ 
        transform: `translate(${x}px, ${y}px)`,
        width: width + 'px',
        height: height + 'px', 
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
      className={`img absolute hover:outline transition-colors ${selected? 'selected outline outline-blue-400': 'hover:outline hover:outline-blue-300'}`}
    >
      {/* Hidden image keeps natural dimensions reference (opacity 0) */}
      <img
        id="image"
        src={src}
        alt="Your Image"
        draggable={false}
  className="max-w-full max-h-full object-contain opacity-0 pointer-events-none select-none"
  style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default ImageObj;
