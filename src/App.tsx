import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <div className="w-full flex mx-auto overflow-x-hidden">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 min-w-0">

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/:projectId" element={<UserDashboard/>} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default App;
