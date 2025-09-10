import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Placeholder from "./pages/Placeholder";
import Index from "./pages/Index";
import About from "./pages/About";
import Warehouses from "./pages/Warehouses";
import WarehouseDetail from "./pages/WarehouseDetail";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/warehouse/:id" element={<WarehouseDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list-property" element={
            <Placeholder
              title="List Your Property"
              description="Add your warehouse to our platform"
              suggestions={[
                "Browse existing warehouses to understand our platform",
                "Contact our team for information about listing requirements",
                "Learn about our property management features"
              ]}
            />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
