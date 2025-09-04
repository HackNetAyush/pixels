import { UserCircleIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useCanvas } from '@/context/CanvasContext.jsx';

export default function Header() {
  const { undo, redo, exportAsImage, past, future } = useCanvas();
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b select-none">
      <div className="flex items-center gap-3">
        <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl tracking-tight">Canva React</span>
      </div>
      <div className="flex items-center gap-2">
        <button title="Undo" disabled={!past.length} onClick={undo} className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"><ArrowUturnLeftIcon className="h-5 w-5" /></button>
        <button title="Redo" disabled={!future.length} onClick={redo} className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"><ArrowUturnRightIcon className="h-5 w-5" /></button>
        <button title="Download PNG" onClick={exportAsImage} className="p-2 rounded hover:bg-gray-100 transition"><ArrowDownTrayIcon className="h-5 w-5" /></button>
      </div>
      <div className="flex items-center gap-2">
        <UserCircleIcon className="h-8 w-8 text-gray-400" />
      </div>
    </header>
  );
}
