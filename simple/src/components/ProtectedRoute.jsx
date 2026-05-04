import { Navigate } from "react-router-dom"
import { getUserRole } from "../utils/auth"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRole()
  
  if (!userRole) {
    return <Navigate to="/login" replace />
  }
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

export default ProtectedRoute