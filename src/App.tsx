import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Overview";
import UserDashboard from "./pages/UserDashboard";
import { Login } from "./pages/Login";
import UserOverview from "./pages/UserOverview";
import Overview from "./pages/Overview";
import { AuthProvider } from "./context/AuthContext";
import Cookies from "js-cookie";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigation = useNavigate();
  const isLoginPage = location.pathname === "/login";
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigation("/login");
    }
  }, []);

  return (
    <AuthProvider>
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
                <Route path="/" element={<Overview />} />
                <Route path="/useroverview" element={<UserOverview />} />
                <Route path="/userdashboard/:id" element={<UserDashboard />} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Add other routes here */}
              </Routes>
            </main>
          </SidebarProvider>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
