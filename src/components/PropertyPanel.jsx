import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useCanvas } from '@/context/CanvasContext.jsx';

export default function PropertyPanel() {
  const { selectedObject, updateObject } = useCanvas();
  if (!selectedObject) return <div className="text-xs text-gray-400">No selection</div>;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1 font-semibold text-gray-700 text-sm">
        <AdjustmentsHorizontalIcon className="h-4 w-4" />
        <span>{selectedObject.type} Props</span>
      </div>
      {selectedObject.type === 'text' && (
        <div className="space-y-2">
          <label className="block text-xs text-gray-500">Content</label>
          <input value={selectedObject.props.text} onChange={(e)=>updateObject(selectedObject.id,{ props:{ text: e.target.value }})} className="w-full border rounded px-2 py-1 text-sm" />
          <label className="block text-xs text-gray-500">Font Size</label>
          <input type="number" value={selectedObject.props.fontSize} onChange={(e)=>updateObject(selectedObject.id,{ props:{ fontSize: parseInt(e.target.value)||0 }})} className="w-full border rounded px-2 py-1 text-sm" />
          <label className="block text-xs text-gray-500">Color</label>
          <input type="color" value={selectedObject.props.color} onChange={(e)=>updateObject(selectedObject.id,{ props:{ color: e.target.value }})} className="w-10 h-10 border rounded" />
        </div>
      )}
      {selectedObject.type === 'rect' && (
        <div className="space-y-2">
          <label className="block text-xs text-gray-500">Fill</label>
          <input type="color" value={selectedObject.props.fill} onChange={(e)=>updateObject(selectedObject.id,{ props:{ fill: e.target.value }})} className="w-10 h-10 border rounded" />
        </div>
      )}
      {selectedObject.type === 'image' && (
        <div className="space-y-1 text-xs text-gray-500">Image element selected</div>
      )}
    </div>
  );
}
