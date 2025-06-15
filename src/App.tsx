
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import FulfillNeed from "./pages/FulfillNeed";
import Register from "./pages/Register";
import Store from "./pages/Store";
import Admin from "./pages/Admin";
import BusinessDetail from "./pages/BusinessDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/fulfill-need" element={<FulfillNeed />} />
                <Route path="/register" element={<Register />} />
                <Route path="/store" element={<Store />} />
                <Route path="/business/:id" element={<BusinessDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
