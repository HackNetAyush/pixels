import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid/non-secure';

// Object types: image, text, rect
// Each object: { id, type, x, y, width, height, rotation, visible, z, props: { src, text, fill, fontSize, color, fontFamily } }

const initialState = {
  objects: [],
  selectedId: null,
  zoom: 1,
  past: [],
  future: [],
  canvas: { width: 500, height: 500 }
};

function withHistory(state, newPartial) {
  const newState = { ...state, ...newPartial };
  // push previous snapshot (without history arrays) to past
  const snapshot = { ...state, past: undefined, future: undefined };
  newState.past = [...state.past, snapshot];
  newState.future = []; // clear redo stack
  return newState;
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_OBJECT':
      return withHistory(state, { objects: [...state.objects, action.payload], selectedId: action.payload.id });
    case 'UPDATE_OBJECT': {
      const { id, patch } = action;
      return withHistory(state, { objects: state.objects.map(o => o.id === id ? { ...o, ...patch, props: { ...o.props, ...(patch.props || {}) } } : o) });
    }
    case 'REMOVE_OBJECT': {
      const { id } = action;
      const objects = state.objects.filter(o => o.id !== id);
      const selectedId = state.selectedId === id ? null : state.selectedId;
      return withHistory(state, { objects, selectedId });
    }
    case 'SELECT':
      return { ...state, selectedId: action.id };
    case 'TOGGLE_VISIBILITY':
      return withHistory(state, { objects: state.objects.map(o => o.id === action.id ? { ...o, visible: !o.visible } : o) });
    case 'REORDER': {
      const { fromIndex, toIndex } = action;
      const arr = [...state.objects];
      const [item] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, item);
      return withHistory(state, { objects: arr });
    }
    case 'MOVE_LAYER': { // direction: up/down/top/bottom
      const { id, direction } = action;
      const arr = [...state.objects];
      const idx = arr.findIndex(o => o.id === id);
      if (idx === -1) return state;
      const [item] = arr.splice(idx, 1);
      if (direction === 'up') arr.splice(Math.min(idx + 1, arr.length), 0, item);
      if (direction === 'down') arr.splice(Math.max(idx - 1, 0), 0, item);
      if (direction === 'top') arr.push(item);
      if (direction === 'bottom') arr.unshift(item);
      return withHistory(state, { objects: arr });
    }
    case 'SET_ZOOM':
      return { ...state, zoom: action.zoom };
    case 'UNDO': {
      if (!state.past.length) return state;
      const previous = state.past[state.past.length - 1];
      const past = state.past.slice(0, -1);
      const currentSnapshot = { ...state, past: undefined, future: undefined };
      const future = [currentSnapshot, ...state.future];
      return { ...previous, past, future };
    }
    case 'REDO': {
      if (!state.future.length) return state;
      const next = state.future[0];
      const future = state.future.slice(1);
      const currentSnapshot = { ...state, past: undefined, future: undefined };
      const past = [...state.past, currentSnapshot];
      return { ...next, past, future };
    }
    default:
      return state;
  }
}

const CanvasContext = createContext(null);

export function CanvasProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addImage = useCallback((src) => {
    const img = new Image();
    img.onload = () => {
      dispatch({
        type: 'ADD_OBJECT',
        payload: {
          id: nanoid(6),
            type: 'image',
            x: 50, y: 50,
            width: Math.min(img.width, 300),
            height: Math.min(img.height, 300),
            rotation: 0,
            visible: true,
            props: { src }
        }
      });
    };
    img.src = src;
  }, []);

  const addText = useCallback((text = 'New Text') => {
    dispatch({
      type: 'ADD_OBJECT',
      payload: {
        id: nanoid(6),
        type: 'text',
        x: 80, y: 80,
        width: 150, height: 50,
        rotation: 0,
        visible: true,
        props: { text, fontSize: 24, color: '#111827', fontFamily: 'Arial, sans-serif' }
      }
    });
  }, []);

  const addRect = useCallback(() => {
    dispatch({
      type: 'ADD_OBJECT',
      payload: {
        id: nanoid(6),
        type: 'rect',
        x: 120, y: 120,
        width: 180, height: 120,
        rotation: 0,
        visible: true,
        props: { fill: '#3b82f6' }
      }
    });
  }, []);

  const selectObject = useCallback((id) => dispatch({ type: 'SELECT', id }), []);
  const updateObject = useCallback((id, patch) => dispatch({ type: 'UPDATE_OBJECT', id, patch }), []);
  const removeObject = useCallback((id) => dispatch({ type: 'REMOVE_OBJECT', id }), []);
  const toggleVisibility = useCallback((id) => dispatch({ type: 'TOGGLE_VISIBILITY', id }), []);
  const moveLayer = useCallback((id, direction) => dispatch({ type: 'MOVE_LAYER', id, direction }), []);
  const setZoom = useCallback((zoom) => dispatch({ type: 'SET_ZOOM', zoom }), []);
  const zoomIn = useCallback(() => setZoom(Math.min(4, +(state.zoom + 0.1).toFixed(2))), [state.zoom, setZoom]);
  const zoomOut = useCallback(() => setZoom(Math.max(0.1, +(state.zoom - 0.1).toFixed(2))), [state.zoom, setZoom]);
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);

  const exportAsImage = useCallback(async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const el = document.getElementById('design-canvas');
      if (!el) return;
      const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 });
      const link = document.createElement('a');
      link.download = 'design.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  }, []);

  const selectedObject = useMemo(() => state.objects.find(o => o.id === state.selectedId) || null, [state.objects, state.selectedId]);

  const value = {
    ...state,
    selectedObject,
    addImage,
    addText,
    addRect,
    selectObject,
    updateObject,
    removeObject,
    toggleVisibility,
    moveLayer,
    setZoom,
    zoomIn,
    zoomOut,
    undo,
    redo,
    exportAsImage
  };

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
}

export function useCanvas() {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error('useCanvas must be used within CanvasProvider');
  return ctx;
}
