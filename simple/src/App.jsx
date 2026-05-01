import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/landingPage"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard/dashboard"
import Shop from "./pages/dashboard/shops"
import Products from "./pages/dashboard/products"
import Notifications from "./pages/dashboard/notifications"
import Orders from "./pages/dashboard/Orders"
import Users from "./pages/dashboard/users"
import Settings from "./pages/dashboard/settings"
import Categories from "./pages/dashboard/categories"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/shops" element={<Shop />} />
        <Route path="/dashboard/products" element={<Products />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/categories" element={<Categories />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
