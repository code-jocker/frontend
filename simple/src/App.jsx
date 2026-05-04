import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { LanguageProvider } from "./context/LanguageContext"
import ProtectedRoute from "./components/ProtectedRoute"
import { getUserRole } from "./utils/auth"
import LandingPage from "./pages/landingPage"
import Login from "./pages/login"
import Register from "./pages/register"
import ForgotPassword from "./pages/forgotPassword"

// Admin Pages
import AdminUsers from "./pages/admin/users"
import AdminProducts from "./pages/admin/products"
import AdminShops from "./pages/admin/shops"
import AdminOrders from "./pages/admin/Orders"
import AdminNotifications from "./pages/admin/notifications"
import AdminSettings from "./pages/admin/settings"

// Seller Pages
import SellerShop from "./pages/seller/shop"
import SellerProducts from "./pages/seller/products"
import SellerOrders from "./pages/seller/orders"
import SellerNotifications from "./pages/seller/notifications"
import SellerSettings from "./pages/seller/settings"

// Customer Pages
import CustomerProducts from "./pages/customer/products"
import CustomerOrders from "./pages/customer/orders"
import CustomerNotifications from "./pages/customer/notifications"
import CustomerSettings from "./pages/customer/settings"

// Dashboard redirect based on role
function DashboardRedirect() {
  const role = getUserRole()
  if (role === 'admin') return <Navigate to="/admin/users" replace />
  if (role === 'seller') return <Navigate to="/seller/shop" replace />
  if (role === 'customer') return <Navigate to="/customer/products" replace />
  return <Navigate to="/login" replace />
}

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
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Admin Routes */}
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['admin']}><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/shops" element={<ProtectedRoute allowedRoles={['admin']}><AdminShops /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin']}><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={['admin']}><AdminNotifications /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

            {/* Seller Routes */}
            <Route path="/seller/shop" element={<ProtectedRoute allowedRoles={['seller']}><SellerShop /></ProtectedRoute>} />
            <Route path="/seller/products" element={<ProtectedRoute allowedRoles={['seller']}><SellerProducts /></ProtectedRoute>} />
            <Route path="/seller/orders" element={<ProtectedRoute allowedRoles={['seller']}><SellerOrders /></ProtectedRoute>} />
            <Route path="/seller/notifications" element={<ProtectedRoute allowedRoles={['seller']}><SellerNotifications /></ProtectedRoute>} />
            <Route path="/seller/settings" element={<ProtectedRoute allowedRoles={['seller']}><SellerSettings /></ProtectedRoute>} />

            {/* Customer Routes */}
            <Route path="/customer/products" element={<ProtectedRoute allowedRoles={['customer']}><CustomerProducts /></ProtectedRoute>} />
            <Route path="/customer/orders" element={<ProtectedRoute allowedRoles={['customer']}><CustomerOrders /></ProtectedRoute>} />
            <Route path="/customer/notifications" element={<ProtectedRoute allowedRoles={['customer']}><CustomerNotifications /></ProtectedRoute>} />
            <Route path="/customer/settings" element={<ProtectedRoute allowedRoles={['customer']}><CustomerSettings /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App