import { NavLink, useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useEffect, useState } from "react"
import intergrate from "../api/axios"
import { getUserFromToken } from "../utils/auth"

const links = [
    {label: "My Shop", path: "/seller/shop"},
    {label: "My Products", path: "/seller/products"},
    {label: "Orders", path: "/seller/orders"},
]
const bottomLinks = [
    {label: "Notifications", path: "/seller/notifications"},
    {label: "Settings", path: "/seller/settings"},
]

const ActiveLinks=({isActive})=>isActive? `bg-slate-700 text-white px-4 py-2 rounded-lg` : `text-slate-300 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg transition`

export default function SellerSidebar({ children }){
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const [unreadCount, setUnreadCount] = useState(0)
    const user = getUserFromToken()
    
    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
        const fetchUnread = async () => {
            try {
                const res = await intergrate.get("/notifications/getAllNotifications", { headers })
                setUnreadCount(res.data.length)
            } catch (err) {
                console.error("Failed to fetch notifications:", err)
            }
        }
        if (token) fetchUnread()
        const interval = setInterval(fetchUnread, 10000)
        return () => clearInterval(interval)
    }, [])
    
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    
    return (
        <div className={`flex min-h-screen ${theme === "dark" ? "dark" : ""}`}>
            <aside className="w-60 bg-green-700 dark:bg-slate-900 flex flex-col">
                <div className="px-4 py-5 text-xl font-bold text-white">
                    <p>CLEVER STORE</p>
                    <p className="text-xs font-normal text-green-200 dark:text-slate-400 mt-1">Seller Dashboard</p>
                </div>
                <nav className="flex flex-col gap-1 px-3 flex-1">
                    {links.map(link => (
                        <NavLink key={link.path} to={link.path} className={ActiveLinks}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="flex flex-col py-2 px-3 border-t border-green-600 dark:border-slate-700">
                    {bottomLinks.map(link => (
                        <NavLink key={link.path} to={link.path} className={({isActive}) => `${ActiveLinks({isActive})} relative`}>
                            {link.label}
                            {link.label === "Notifications" && unreadCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>
            </aside>
            <main className="flex-1 bg-slate-100 dark:bg-slate-800 flex flex-col transition-colors">
                <header className="bg-white dark:bg-slate-900 shadow-sm px-8 py-3 flex justify-between items-center transition-colors">
                    <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Seller Dashboard - {user?.fullname}</h1>
                    <div className="flex items-center gap-4">
                        <NavLink to="/seller/notifications" className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </NavLink>
                        <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                            {theme === "light" ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>
                        <button onClick={handleLogout} className="text-sm text-red-500 font-semibold hover:text-red-600 transition">Logout</button>
                    </div>
                </header>
                <div className="p-8 flex-1 dark:text-white transition-colors">{children}</div>
            </main>
        </div>
    )
}
