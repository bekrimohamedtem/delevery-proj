import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import { SearchProvider } from "./context/SearchContext";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ColisList from "./pages/colis/ColisList";
import ColisDetails from "./pages/colis/ColisDetails";
import LivreursList from "./pages/livreurs/LivreursList";
import Affectation from "./pages/livreurs/Affectation";
import GeneralStats from "./pages/statistiques/GeneralStats";
import LivreurStats from "./pages/statistiques/LivreurStats";
import ClientStats from "./pages/statistiques/ClientStats";
import TrackingPage from "./pages/tracking/TrackingPage";
import CommercialDashboard from "./pages/commercial/CommercialDashboard";
import OffresList from "./pages/commercial/OffresList";
import FacturesList from "./pages/commercial/FacturesList";
import StockList from "./pages/stock/StockList";
import StockMovements from "./pages/stock/StockMovements";
import ClientsList from "./pages/clients/ClientsList";
import ClientDetails from "./pages/clients/ClientDetails";
import ZonesManagement from "./pages/parameters/ZonesManagement";
import BureauxByWilaya from "./pages/parameters/BureauxByWilaya";
import Tarifs from "./pages/parameters/Tarifs";
import ServicesAdditionnels from "./pages/parameters/ServicesAdditionnels";
import { useSidebar } from "./context/SidebarContext";

function AppContent() {
  const { isOpen } = useSidebar();
  const location = useLocation();

  // Pages qui ne doivent pas afficher Sidebar et Navbar
  const authPages = ["/", "/login", "/forgot-password"];
  const isAuthPage = authPages.includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main
          className={`flex-1 transition-all duration-300 ${
            isOpen ? "ml-56" : "ml-20"
          } mt-16`}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/colis" element={<ColisList />} />
            <Route path="/colis/:id" element={<ColisDetails />} />
            <Route path="/livreurs" element={<LivreursList />} />
            <Route path="/livreurs/affectation" element={<Affectation />} />
            <Route path="/statistiques" element={<GeneralStats />} />
            <Route path="/statistiques/livreurs" element={<LivreurStats />} />
            <Route path="/statistiques/clients" element={<ClientStats />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/commercial" element={<CommercialDashboard />} />
            <Route path="/commercial/offres" element={<OffresList />} />
            <Route path="/commercial/factures" element={<FacturesList />} />
            <Route path="/stock" element={<StockList />} />
            <Route path="/stock/mouvements" element={<StockMovements />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/:id" element={<ClientDetails />} />
            <Route path="/parameters/zones" element={<ZonesManagement />} />
            <Route path="/parameters/bureaux" element={<BureauxByWilaya />} />
            <Route path="/parameters/tarifs" element={<Tarifs />} />
            <Route
              path="/parameters/services"
              element={<ServicesAdditionnels />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
