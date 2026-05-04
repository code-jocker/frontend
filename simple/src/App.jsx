import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"
import LandingPage from "./pages/landingPage"
import Login from "./pages/login"
import Register from "./pages/register"
import ForgotPassword from "./pages/forgotPassword"
import Dashboard from "./pages/dashboard/dashboard"
import Shop from "./pages/dashboard/shops"
import Products from "./pages/dashboard/products"
import Notifications from "./pages/dashboard/notifications"
import Orders from "./pages/dashboard/Orders"
import Users from "./pages/dashboard/users"
import Settings from "./pages/dashboard/settings"

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/shops" element={<Shop />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App