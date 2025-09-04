
import Header from "@/components/Header.jsx";
import SidebarLeft from "@/components/SidebarLeft.jsx";
import SidebarRight from "@/components/SidebarRight.jsx";
import BottomBar from "@/components/BottomBar.jsx";
import { Canvas } from "@/components/Canvas/Canvas.jsx";

const IndexPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarLeft />
        <div id="canvas-window" className="flex-1 flex flex-col relative">
          <div className="flex-1 w-full flex items-center justify-center p-4">
            <Canvas />
          </div>
        </div>
        <SidebarRight />
      </div>
      <BottomBar />
    </div>
  );
};

export default IndexPage;
