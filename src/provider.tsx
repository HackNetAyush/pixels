import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";

import { CanvasProvider } from "./context/CanvasContext.jsx";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider
      className="w-full h-full p-0 m-0"
      navigate={navigate}
      useHref={useHref}
    >
      <CanvasProvider>{children}</CanvasProvider>
    </HeroUIProvider>
  );
}
