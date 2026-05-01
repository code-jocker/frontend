import { NavLink } from "react-router-dom";


const links = [
    {label: "Shops", path: "/dashboard/users"},
    {label: "Orders", path: "/dashboard/orders"},
    {label: "Products", path: "/dashboard/products"},
    {label: "Shops", path: "/dashboard/shops"},
    {label: "Categories", path: "/dashboard/categories"},
   
]
const bottomLinks = [
    {label: "Notifications", path: "/dashboard/notifications"},
    {label: "Settings", path: "/dashboard/settings"},
]

const ActiveLinks=({isActive})=>isActive? `bg-grey-500 text-white` : `text-slate-300 hover:bg-slate-700 hover:text-white`

export default function Sidebar({ children }){
    return (
        <div className="flex min-h-screen">
            <aside className="w-60 bg-blue-900 flex flex-col">
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
            <main className="flex-1 bg-slate-100 p-8">
                {children}
            </main>
        </div>
    )
}
   
