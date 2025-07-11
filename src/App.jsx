import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";

// Lazy load pages
const TemplatePage = lazy(() => import("./pages/TemplatePage"));
const ReceiptPage = lazy(() => import("./pages/ReceiptPage"));
const Index = lazy(() => import("./pages/Index"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
          <Route path="/" element={<Index />} />
          <Route path="/template" element={<TemplatePage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
