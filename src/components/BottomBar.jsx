import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline';
import { useCanvas } from '@/context/CanvasContext.jsx';

export default function BottomBar() {
  const { zoom, zoomIn, zoomOut, canvas, selectedObject } = useCanvas();
  return (
    <footer className="flex items-center justify-between px-6 py-2 bg-white border-t shadow-sm select-none">
      <div className="flex items-center gap-2">
        <button onClick={zoomOut} className="p-2 rounded hover:bg-gray-100 transition" title="Zoom Out"><MagnifyingGlassMinusIcon className="h-5 w-5" /></button>
        <span className="font-medium">{Math.round(zoom*100)}%</span>
        <button onClick={zoomIn} className="p-2 rounded hover:bg-gray-100 transition" title="Zoom In"><MagnifyingGlassPlusIcon className="h-5 w-5" /></button>
      </div>
      <div className="text-gray-500 font-medium">Canvas: {canvas.width}x{canvas.height}</div>
      <div className="text-gray-500 font-medium">Selected: {selectedObject ? selectedObject.type : 'None'}</div>
    </footer>
  );
}
