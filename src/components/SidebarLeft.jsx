import { useState, useRef } from 'react';
import { Squares2X2Icon, PhotoIcon, PencilIcon, ArrowUpTrayIcon, DocumentDuplicateIcon, ChevronLeftIcon, ChevronRightIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import { useCanvas } from '@/context/CanvasContext.jsx';

const tabs = [
  { name: 'Elements', icon: <Squares2X2Icon className="h-5 w-5" /> },
  { name: 'Images', icon: <PhotoIcon className="h-5 w-5" /> },
  { name: 'Text', icon: <PencilIcon className="h-5 w-5" /> },
  { name: 'Uploads', icon: <ArrowUpTrayIcon className="h-5 w-5" /> },
  { name: 'Templates', icon: <DocumentDuplicateIcon className="h-5 w-5" /> },
];

export default function SidebarLeft() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Elements');
  const { addImage, addText, addRect } = useCanvas();
  const fileRef = useRef(null);

  return (
    <aside className={`bg-white border-r shadow-sm h-full flex flex-col transition-all duration-300 ${collapsed ? 'w-16 min-w-16' : 'w-56 min-w-40'} md:w-56 md:min-w-40 sm:w-full sm:min-w-0`}>
      <div className="flex items-center justify-between px-2 py-2">
        <span className="font-semibold text-gray-700">Menu</span>
        <div className="flex items-center gap-1">
          {/* Mobile Close Button */}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('closeMobileSidebar'))}
            className="p-1 rounded hover:bg-gray-100 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Collapse Button */}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-gray-100 hidden md:block">
            {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <nav className="flex-1 flex flex-col overflow-hidden">
        <ul className="space-y-1 flex flex-col md:flex-col sm:flex-row sm:overflow-x-auto sm:overflow-y-hidden sm:flex-nowrap" style={{ minWidth: 0 }}>
          {tabs.map(tab => (
            <li key={tab.name}>
              <button
                className={`flex items-center gap-2 w-full px-4 py-2 rounded transition text-gray-700 hover:bg-gray-100 ${activeTab === tab.name ? 'bg-gray-100 font-bold' : ''}`}
                onClick={() => setActiveTab(tab.name)}
                onTouchStart={() => setActiveTab(tab.name)}
                style={{ touchAction: 'manipulation' }}
              >
                {tab.icon}
                {!collapsed && tab.name}
              </button>
            </li>
          ))}
        </ul>
        {!collapsed && (
          <div className="mt-4 flex-1 overflow-y-auto px-3 pb-4 space-y-4 text-sm">
            {activeTab === 'Elements' && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-600 text-xs uppercase tracking-wide">Shapes</h4>
                <button
                  onClick={addRect}
                  onTouchStart={() => addRect()}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded border border-dashed hover:bg-gray-50"
                  style={{ touchAction: 'manipulation' }}
                >
                  <RectangleStackIcon className="h-4 w-4" /> Rectangle
                </button>
              </div>
            )}
            {activeTab === 'Images' && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-600 text-xs uppercase tracking-wide">Images</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[1,2,3].map(i => (
                    <button key={i} onClick={()=>addImage('/image.png')} className="aspect-square bg-gray-200 rounded hover:ring-2 ring-blue-400 text-[10px] flex items-center justify-center">Img {i}</button>
                  ))}
                </div>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e)=>{
                  const f = e.target.files?.[0];
                  if (f) {
                    const url = URL.createObjectURL(f);
                    addImage(url);
                  }
                }}/>
                <button
                  onClick={()=>fileRef.current?.click()}
                  onTouchStart={()=>fileRef.current?.click()}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded border hover:bg-gray-50"
                  style={{ touchAction: 'manipulation' }}
                >
                  <ArrowUpTrayIcon className="h-4 w-4"/> Upload Image
                </button>
              </div>
            )}
            {activeTab === 'Text' && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-600 text-xs uppercase tracking-wide">Text</h4>
                <button onClick={()=>addText('Heading')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 font-bold text-lg">Add Heading</button>
                <button onClick={()=>addText('Subheading')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 font-semibold">Add Subheading</button>
                <button onClick={()=>addText('Body text')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Add Body text</button>
              </div>
            )}
            {activeTab === 'Templates' && <div className="text-xs text-gray-500">Templates coming soon...</div>}
          </div>
        )}
      </nav>
    </aside>
  );
}
