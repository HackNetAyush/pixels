import { useState, useRef, useEffect } from 'react';

const TextEditModal = ({ isOpen, onClose, textProps, onUpdate }) => {
  const [localText, setLocalText] = useState(textProps.text || '');
  const [localFontSize, setLocalFontSize] = useState(textProps.fontSize || 24);
  const [localColor, setLocalColor] = useState(textProps.color || '#111827');

  useEffect(() => {
    if (isOpen) {
      setLocalText(textProps.text || '');
      setLocalFontSize(textProps.fontSize || 24);
      setLocalColor(textProps.color || '#111827');
      // Hide sidebar when modal opens
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('textModalChange', { detail: { isOpen: true } }));
    } else {
      // Restore sidebar when modal closes
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('textModalChange', { detail: { isOpen: false } }));
    }
    
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('textModalChange', { detail: { isOpen: false } }));
    };
  }, [isOpen, textProps]);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdate({
      text: localText,
      fontSize: localFontSize,
      color: localColor
    });
    onClose();
  };

  const colorPresets = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  return (
    <div className="text-edit-modal">
      <div className="text-edit-modal-content">
        {/* Header */}
        <div className="text-edit-header">
          <button
            onClick={onClose}
            className="cancel-btn"
          >
            Cancel
          </button>
          <h2>Edit Text</h2>
          <button
            onClick={handleSave}
            className="done-btn"
          >
            Done
          </button>
        </div>

        {/* Preview Area */}
        <div className="text-edit-preview">
          <div 
            className="text-preview"
            style={{ 
              fontSize: `${Math.max(16, Math.min(localFontSize, 32))}px`, 
              color: localColor,
              textShadow: localColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
            }}
          >
            {localText || 'Enter text here'}
          </div>
        </div>

        {/* Controls */}
        <div className="text-edit-controls">
          {/* Text Input */}
          <div className="text-input-container">
            <textarea
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              placeholder="Enter your text..."
              rows="2"
            />
          </div>
          
          {/* Font Size */}
          <div className="font-size-container">
            <div className="font-size-header">
              <h3>Font Size</h3>
              <span className="font-size-value">{localFontSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="72"
              value={localFontSize}
              onChange={(e) => setLocalFontSize(parseInt(e.target.value))}
              className="font-size-slider"
            />
          </div>
          
          {/* Colors */}
          <div style={{ marginTop: '16px' }}>
            <h3>Color</h3>
            <div className="color-presets">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  onClick={() => setLocalColor(color)}
                  className={`color-preset ${localColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            {/* Custom Color */}
            <div className="custom-color-container">
              <input
                type="color"
                value={localColor}
                onChange={(e) => setLocalColor(e.target.value)}
                className="custom-color-input"
              />
              <input
                type="text"
                value={localColor}
                onChange={(e) => setLocalColor(e.target.value)}
                className="custom-color-text"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TextObj = ({ id, text, x=0, y=0, width=150, height=50, fontSize=24, color='#111827', fontFamily='Arial, sans-serif', selected, hidden, onSelect, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const lastTapRef = useRef(0);
  const editableRef = useRef(null);
  const cursorPositionRef = useRef(0);
  
  // Detect if device is mobile
  const isMobile = window.innerWidth <= 768;
  
  // Keep cursor at end when editing
  useEffect(() => {
    if (isEditing && editableRef.current) {
      const moveCaretToEnd = () => {
        const element = editableRef.current;
        const range = document.createRange();
        const selection = window.getSelection();
        
        if (element.childNodes.length > 0) {
          const lastNode = element.childNodes[element.childNodes.length - 1];
          if (lastNode.nodeType === Node.TEXT_NODE) {
            range.setStart(lastNode, lastNode.textContent.length);
            range.setEnd(lastNode, lastNode.textContent.length);
          } else {
            range.setStartAfter(lastNode);
            range.setEndAfter(lastNode);
          }
        } else {
          range.setStart(element, 0);
          range.setEnd(element, 0);
        }
        
        selection.removeAllRanges();
        selection.addRange(range);
      };
      
      setTimeout(moveCaretToEnd, 0);
    }
  }, [editableText, isEditing]);
  
  // Handle double tap for mobile
  const handleTouchStart = (e) => {
    e.stopPropagation();
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapRef.current;
    
    if (tapLength < 500 && tapLength > 0) {
      // Double tap detected - start editing
      if (isMobile) {
        setShowMobileModal(true);
      } else {
        setIsEditing(true);
        setTimeout(() => {
          selectAllText();
        }, 50);
      }
    } else {
      // Single tap - select object
      document.querySelectorAll('[data-resizable]').forEach(el=>{ if(el!==e.currentTarget){ el.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='none'); }});
      e.currentTarget.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='block');
      onSelect?.();
    }
    
    lastTapRef.current = currentTime;
  };
  
  // Handle text editing finish
  const handleEditFinish = () => {
    setIsEditing(false);
    if (onTextChange && editableText !== text) {
      onTextChange(id, editableText);
    }
  };
  
  // Handle key press in edit mode
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEditFinish();
      editableRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setEditableText(text); // Reset to original text
      setIsEditing(false);
      editableRef.current?.blur();
    }
  };

  // Fix text selection to start from beginning
  const selectAllText = () => {
    if (editableRef.current) {
      editableRef.current.focus();
      // Set cursor to end of text
      setTimeout(() => {
        const selection = window.getSelection();
        const range = document.createRange();
        const textNode = editableRef.current.firstChild || editableRef.current;
        
        if (textNode.nodeType === Node.TEXT_NODE) {
          range.setStart(textNode, textNode.textContent.length);
          range.setEnd(textNode, textNode.textContent.length);
        } else {
          range.setStart(textNode, textNode.childNodes.length);
          range.setEnd(textNode, textNode.childNodes.length);
        }
        
        selection.removeAllRanges();
        selection.addRange(range);
      }, 50);
    }
  };

  if (hidden) return null;

  return (
    <>
      <TextEditModal
        isOpen={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        textProps={{ text: editableText, fontSize, color }}
        onUpdate={(newProps) => {
          setEditableText(newProps.text);
          if (onTextChange) {
            onTextChange(id, newProps.text, {
              fontSize: newProps.fontSize,
              color: newProps.color
            });
          }
          setShowMobileModal(false);
        }}
      />
      <div
      data-obj-id={id}
      data-draggable={!isEditing}
      data-resizable
      // data-bounds="#canvas-window"
      onClick={(e)=>{ 
        e.stopPropagation(); 
        document.querySelectorAll('[data-resizable]').forEach(el=>{ if(el!==e.currentTarget){ el.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='none'); }});
        e.currentTarget.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='block');
        onSelect?.(); 
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (isMobile) {
          setShowMobileModal(true);
        } else {
          setIsEditing(true);
          setTimeout(() => {
            selectAllText();
          }, 50);
        }
      }}
      onTouchStart={handleTouchStart}
      onPointerDown={(e)=>{
        if (e.pointerType === 'touch' || e.pointerType === 'pen' || e.pointerType === 'mouse') {
          e.stopPropagation();
          document.querySelectorAll('[data-resizable]').forEach(el=>{ if(el!==e.currentTarget){ el.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='none'); }});
          e.currentTarget.querySelectorAll('.rnd-handle').forEach(h=> h.style.display='block');
          onSelect?.();
        }
      }}
      style={{ transform: `translate(${x}px, ${y}px)`, width, height, fontSize, color, fontFamily, touchAction: isEditing ? 'auto' : 'none', userSelect: isEditing ? 'text' : 'none', WebkitUserSelect: isEditing ? 'text' : 'none', direction: 'ltr', textAlign: 'left' }}
      className={`absolute whitespace-pre-wrap leading-snug ${isEditing ? 'cursor-text' : 'cursor-move'} ${selected? 'selected outline outline-blue-400': 'hover:outline hover:outline-blue-300'}`}
    >
      <div
        ref={editableRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        className={isEditing ? 'text-editor' : ''}
        dir="ltr"
        style={{ 
          width: '100%', 
          height: '100%', 
          outline: 'none', 
          background: 'transparent', 
          cursor: isEditing ? 'text' : 'inherit',
          userSelect: isEditing ? 'text' : 'none',
          WebkitUserSelect: isEditing ? 'text' : 'none',
          MozUserSelect: isEditing ? 'text' : 'none',
          msUserSelect: isEditing ? 'text' : 'none',
          padding: isEditing ? '2px' : '0',
          border: isEditing ? '2px dashed #3b82f6' : 'none',
          direction: 'ltr',
          textAlign: 'left',
          unicodeBidi: 'embed',
          writingMode: 'horizontal-tb',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
        onBlur={handleEditFinish}
        onInput={e => {
          const newText = e.currentTarget.textContent || e.currentTarget.innerText || '';
          cursorPositionRef.current = window.getSelection().getRangeAt(0).startOffset;
          setEditableText(newText);
        }}
        onKeyDown={handleKeyDown}
      >
        {isEditing ? editableText : text}
      </div>
    </div>
    </>
  );
};

export default TextObj;
