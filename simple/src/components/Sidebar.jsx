import { NavLink, useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

const links = [
    {label: "Users", path: "/dashboard/users"},
    {label: "Orders", path: "/dashboard/orders"},
    {label: "Products", path: "/dashboard/products"},
    {label: "Shops", path: "/dashboard/shops"},
]
const bottomLinks = [
    {label: "Notifications", path: "/dashboard/notifications"},
    {label: "Settings", path: "/dashboard/settings"},
]

const ActiveLinks=({isActive})=>isActive? `bg-slate-700 text-white px-4 py-2 rounded-lg` : `text-slate-300 hover:bg-slate-700 hover:text-white px-4 py-2 rounded-lg transition`

export default function Sidebar({ children }){
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    
    return (
        <div className={`flex min-h-screen ${theme === "dark" ? "dark" : ""}`}>
            <aside className="w-60 bg-blue-900 dark:bg-slate-900 flex flex-col">
                <div className="px-4 py-5 text-xl font-bold text-white">
                    <p>CLEVER STORE</p>
                </div>
                <nav className="flex flex-col gap-1 px-3 flex-1">
                    {links.map(link => (
                        <NavLink key={link.path} to={link.path} className={ActiveLinks}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="flex flex-col py-2 px-3 border-t border-slate-700">
                    {bottomLinks.map(link => (
                        <NavLink key={link.path} to={link.path} className={ActiveLinks}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </aside>
            <main className="flex-1 bg-slate-100 dark:bg-slate-800 flex flex-col">
                <header className="bg-white dark:bg-slate-900 shadow-sm px-8 py-3 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </button>
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
                <div className="p-8 flex-1 dark:text-white">{children}</div>
            </main>
        </div>
    )
}
