
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BusinessProvider } from "@/contexts/BusinessContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import FulfillNeed from "./pages/FulfillNeed";
import Register from "./pages/Register";
import Store from "./pages/Store";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AccessDenied from "./pages/AccessDenied";
import BusinessDetail from "./pages/BusinessDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <BusinessProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Routes>
                  {/* Admin routes without navbar/footer */}
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route 
                    path="/admin-dashboard" 
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboard />
                      </ProtectedAdminRoute>
                    } 
                  />
                  <Route path="/access-denied" element={<AccessDenied />} />
                  
                  {/* Public routes with navbar/footer */}
                  <Route path="/*" element={
                    <>
                      <Navbar />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/buy" element={<Buy />} />
                          <Route path="/sell" element={<Sell />} />
                          <Route path="/fulfill-need" element={<FulfillNeed />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/store" element={<Store />} />
                          <Route path="/admin" element={<Admin />} />
                          <Route path="/business/:id" element={<BusinessDetail />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  } />
                </Routes>
              </div>
            </BrowserRouter>
          </BusinessProvider>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
