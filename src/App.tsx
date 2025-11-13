import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Invoices from "./pages/Invoices";
import Documents from "./pages/Documents";
import Employee from "./pages/Employee";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const FirstLoadRedirect = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited && location.pathname === '/') {
      sessionStorage.setItem('hasVisited', 'true');
      navigate('/reports/invoice-contract', { replace: true });
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FirstLoadRedirect>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          <Route path="/clients/list" element={<Clients />} />
          <Route path="/clients/:clientId" element={<ClientDetail />} />
          <Route path="/clients/edit" element={<Dashboard />} />
          <Route path="/clients/create" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/reports" element={<Navigate to="/reports/invoice-contract" replace />} />
          <Route path="/reports/signup" element={<Dashboard />} />
          <Route path="/reports/invoice-contract" element={<Reports />} />
          <Route path="/reports/payments-revenue" element={<Dashboard />} />
          <Route path="/reports/clients" element={<Dashboard />} />
          <Route path="/reports/timesheet" element={<Dashboard />} />
          <Route path="/referral-program" element={<Dashboard />} />
          <Route path="/time-sheet" element={<Dashboard />} />
          <Route path="/manage-client-sheet" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FirstLoadRedirect>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
