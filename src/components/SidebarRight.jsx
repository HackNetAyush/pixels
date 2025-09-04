import { useState } from 'react';
import { Cog6ToothIcon, Bars3BottomLeftIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import LayerManager from './LayerManager.jsx';
import { useCanvas } from '@/context/CanvasContext.jsx';

const tabs = [
  { name: 'Properties', icon: <Cog6ToothIcon className="h-5 w-5" /> },
  { name: 'Layers', icon: <Bars3BottomLeftIcon className="h-5 w-5" /> },
  { name: 'Align', icon: <AdjustmentsHorizontalIcon className="h-5 w-5" /> },
];

export default function SidebarRight() {
  const [activeTab, setActiveTab] = useState('Properties');
  const { selectedObject, updateObject } = useCanvas();

  return (
    <aside className="bg-white border-l shadow-sm h-full w-72 min-w-56 flex flex-col select-none md:w-72 md:min-w-56 sm:w-full sm:min-w-0">
      <nav className="flex items-center border-b px-3 py-2 gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.name}
            className={`flex items-center gap-2 px-3 py-1 rounded transition text-gray-700 hover:bg-gray-100 ${activeTab === tab.name ? 'bg-gray-100 font-bold' : ''}`}
            onClick={() => setActiveTab(tab.name)}
            onTouchStart={e => { e.preventDefault(); setActiveTab(tab.name); }}
            style={{ touchAction: 'manipulation' }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
      <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4">
        {activeTab === 'Properties' && (
          <div className="space-y-3">
            {!selectedObject && <div className="text-gray-400 italic">Select an object to edit its properties.</div>}
            {selectedObject && (
              <div className="space-y-4">
                {selectedObject.type === 'text' && (
                  <div className="space-y-2">
                    <label className="block font-medium">Text</label>
                    <textarea
                      value={selectedObject.props.text}
                      onChange={(e)=>updateObject(selectedObject.id,{ props:{ text: e.target.value }})}
                      onTouchStart={e => e.stopPropagation()}
                      className="w-full border rounded px-2 py-1 h-20 resize-none"
                      style={{ touchAction: 'manipulation' }}
                    />
                    <label className="block text-xs text-gray-500">Font Size</label>
                    <input type="number" value={selectedObject.props.fontSize}
                      onChange={(e)=>updateObject(selectedObject.id,{ props:{ fontSize: parseInt(e.target.value)||0 }})}
                      onTouchStart={e => e.stopPropagation()}
                      className="w-full border rounded px-2 py-1"
                      style={{ touchAction: 'manipulation' }}
                    />
                    <label className="block text-xs text-gray-500">Color</label>
                    <input type="color" value={selectedObject.props.color}
                      onChange={(e)=>updateObject(selectedObject.id,{ props:{ color: e.target.value }})}
                      onTouchStart={e => e.stopPropagation()}
                      className="w-10 h-10 border rounded"
                      style={{ touchAction: 'manipulation' }}
                    />
                  </div>
                )}
                {selectedObject.type === 'rect' && (
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-500">Fill</label>
                    <input type="color" value={selectedObject.props.fill}
                      onChange={(e)=>updateObject(selectedObject.id,{ props:{ fill: e.target.value }})}
                      className="w-10 h-10 border rounded"/>
                  </div>
                )}
                {selectedObject.type === 'image' && (
                  <div className="space-y-2">
                    <div className="text-gray-500 text-xs">Image Source</div>
                    <div className="truncate text-xs bg-gray-100 rounded px-2 py-1">{selectedObject.props.src}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {activeTab === 'Layers' && <LayerManager />}
        {activeTab === 'Align' && (
          <div className="space-y-2">
            <div className="text-gray-400 text-xs">Alignment tools coming soon...</div>
          </div>
        )}
      </div>
    </aside>
  );
}
