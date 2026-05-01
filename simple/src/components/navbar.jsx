import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="bg-slate-900 px-8 py-4 flex items-center justify-between">
            <Link to="/" className="text-white text-xl font-bold tracking-wide">
                Clever<span className="text-indigo-400">Store</span>
            </Link>

            <div className="flex gap-8">
                <Link to="/" className="text-slate-300 text-sm hover:text-white">Home</Link>
                <Link to="/dashboard/shops" className="text-slate-300 text-sm hover:text-white">Shops</Link>
                <Link to="/dashboard/products" className="text-slate-300 text-sm hover:text-white">Products</Link>
                <Link to="/dashboard/orders" className="text-slate-300 text-sm hover:text-white">Orders</Link>
            </div>

            <div className="flex gap-3">
                <Link to="/login" className="text-slate-300 text-sm px-4 py-2 border border-slate-600 rounded hover:border-indigo-400 hover:text-white">
                    Login
                </Link>
                <Link to="/register" className="text-sm px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                    Register
                </Link>
            </div>
        </nav>
    )
}
