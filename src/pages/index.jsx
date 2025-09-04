
import { useEffect, useState } from "react";
import Header from "@/components/Header.jsx";
import SidebarLeft from "@/components/SidebarLeft.jsx";
import SidebarRight from "@/components/SidebarRight.jsx";
import BottomBar from "@/components/BottomBar.jsx";
import { Canvas } from "@/components/Canvas/Canvas.jsx";

const IndexPage = () => {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    // Listen for text modal state changes
    const handleTextModalChange = (e) => {
      setIsTextModalOpen(e.detail.isOpen);
      if (e.detail.isOpen) {
        document.body.classList.add('modal-open');
        setShowMobileSidebar(false); // Close mobile sidebar when modal opens
      } else {
        document.body.classList.remove('modal-open');
      }
    };

    // Listen for mobile sidebar close
    const handleCloseMobileSidebar = () => {
      setShowMobileSidebar(false);
    };

    window.addEventListener('textModalChange', handleTextModalChange);
    window.addEventListener('closeMobileSidebar', handleCloseMobileSidebar);
    
    return () => {
      window.removeEventListener('textModalChange', handleTextModalChange);
      window.removeEventListener('closeMobileSidebar', handleCloseMobileSidebar);
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden flex-row md:flex-row sm:flex-col relative">
        {/* Mobile Sidebar Overlay */}
        {showMobileSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setShowMobileSidebar(false)}
          />
        )}
        
        {/* Sidebar Left - Mobile Overlay Style */}
        <div className={`
          ${showMobileSidebar ? 'fixed left-0 top-0 bottom-0 z-50 transform translate-x-0' : 'hidden'}
          md:block md:relative md:transform-none
        `}>
          <SidebarLeft />
        </div>
        
        <div id="canvas-window" className="flex-1 flex flex-col relative w-full">
          <div className="flex-1 w-full flex items-center justify-center p-4">
            <Canvas />
          </div>
        </div>
        
        <SidebarRight />
        
        {/* Mobile Sidebar Toggle Button */}
        {!isTextModalOpen && (
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="fixed bottom-6 left-6 z-30 md:hidden bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>
      <BottomBar />
    </div>
  );
};

export default IndexPage;
