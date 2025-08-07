import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Overview";
import UserDashboard from "./pages/UserDashboard";
import { Login } from "./pages/Login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <div className="w-full flex mx-auto overflow-x-hidden">
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Home />} />
              <Route path="/dashboard/:projectId" element={<UserDashboard />} />
              {/* Add other routes here */}
            </Routes>
          </main>
        </SidebarProvider>
      )}
    </div>
  );
}

export default App;
