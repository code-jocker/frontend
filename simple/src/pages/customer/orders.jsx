import { useEffect, useState } from "react"
import CustomerSidebar from "../../components/CustomerSidebar"
import intergrate from "../../api/axios"
import { getUserFromToken } from "../../utils/auth"

const badge = {
    delivered: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    confirmed: "bg-blue-100 text-blue-600",
    cancelled: "bg-red-100 text-red-500",
    shipped: "bg-purple-100 text-purple-600",
}

export default function CustomerOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const user = getUserFromToken()

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchOrders = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/orders/getAllOrders", { headers })
            // Filter only orders for this customer
            setOrders(res.data.filter(o => o.userId === user?.id))
        } catch (err) {
            setError("Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchOrders() }, [])

    return (
        <CustomerSidebar>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Orders</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Track your order history and status</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Order ID</th>
                            <th className="px-5 py-3 text-left">Product</th>
                            <th className="px-5 py-3 text-left">Date</th>
                            <th className="px-5 py-3 text-left">Quantity</th>
                            <th className="px-5 py-3 text-left">Total</th>
                            <th className="px-5 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {loading ? (
                            <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">Loading...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No orders yet. Start shopping!</td></tr>
                        ) : orders.map(o => (
                            <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                                <td className="px-5 py-3 font-semibold text-slate-800 dark:text-white">#{o.id?.slice(0, 8)}</td>
                                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">Product #{o.prodId?.slice(0, 8)}</td>
                                <td className="px-5 py-3 text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{o.quantity}</td>
                                <td className="px-5 py-3 text-indigo-600 dark:text-indigo-400 font-bold">${(o.price * o.quantity).toFixed(2)}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge[o.status?.toLowerCase()] || "bg-slate-100 text-slate-500"}`}>
                                        {o.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CustomerSidebar>
    )
}
