import { Bars3BottomLeftIcon, EyeIcon, EyeSlashIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { useCanvas } from '@/context/CanvasContext.jsx';

export default function LayerManager() {
  const { objects, selectedId, selectObject, toggleVisibility, removeObject, moveLayer } = useCanvas();
  return (
    <div className="space-y-2 select-none">
      <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
        <Bars3BottomLeftIcon className="h-5 w-5" />
        <span>Layers</span>
      </div>
      <ul className="space-y-1">
        {[...objects].map((layer, idx) => (
          <li
            key={layer.id}
            className={`group flex items-center justify-between gap-2 px-2 py-1 bg-gray-50 rounded border text-xs hover:bg-white cursor-pointer ${selectedId===layer.id?'ring-2 ring-blue-400':''}`}
            onClick={(e)=>{e.stopPropagation();selectObject(layer.id);}}
          >
            <div className="flex items-center gap-1 overflow-hidden">
              <button onClick={(e)=>{e.stopPropagation();toggleVisibility(layer.id);}} className="p-1 rounded hover:bg-gray-200">
                {layer.visible!==false ? <EyeIcon className="h-4 w-4"/> : <EyeSlashIcon className="h-4 w-4 text-gray-400"/>}
              </button>
              <span className="truncate font-medium">{layer.type} {objects.length-idx}</span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button title="Move Up" onClick={(e)=>{e.stopPropagation();moveLayer(layer.id,'up');}} className="p-1 hover:bg-gray-200 rounded"><ArrowUpIcon className="h-3 w-3"/></button>
              <button title="Move Down" onClick={(e)=>{e.stopPropagation();moveLayer(layer.id,'down');}} className="p-1 hover:bg-gray-200 rounded"><ArrowDownIcon className="h-3 w-3"/></button>
              <button title="Delete" onClick={(e)=>{e.stopPropagation();removeObject(layer.id);}} className="p-1 hover:bg-red-100 rounded"><TrashIcon className="h-4 w-4 text-red-400"/></button>
            </div>
          </li>
        )).reverse()}
      </ul>
    </div>
  );
}
