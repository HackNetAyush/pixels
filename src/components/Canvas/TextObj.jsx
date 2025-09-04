const TextObj = ({ id, text, x=0, y=0, width=150, height=50, fontSize=24, color='#111827', fontFamily='Arial, sans-serif', selected, hidden, onSelect }) => {
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
      style={{ transform: `translate(${x}px, ${y}px)`, width, height, fontSize, color, fontFamily }}
  className={`absolute whitespace-pre-wrap leading-snug cursor-text select-none ${selected? 'selected outline outline-blue-400': 'hover:outline hover:outline-blue-300'}`}
    >
      {text}
    </div>
  );
};

export default TextObj;
