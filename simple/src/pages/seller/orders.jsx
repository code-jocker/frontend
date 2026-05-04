import { useEffect, useState } from "react"
import SellerSidebar from "../../components/SellerSidebar"
import intergrate from "../../api/axios"

const badge = {
    delivered: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    confirmed: "bg-blue-100 text-blue-600",
    cancelled: "bg-red-100 text-red-500",
    shipped: "bg-purple-100 text-purple-600",
}

export default function SellerOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchOrders = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/orders/getAllOrders", { headers })
            setOrders(res.data)
        } catch (err) {
            setError("Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchOrders() }, [])

    const handleApprove = async (id) => {
        setSaving(true)
        try {
            await intergrate.put(`/orders/updateOrder/${id}`, { status: "confirmed" }, { headers })
            await fetchOrders()
        } catch (err) {
            setError(err.response?.data?.message || "Approve failed")
        } finally {
            setSaving(false)
        }
    }

    const handleReject = async (id) => {
        setSaving(true)
        try {
            await intergrate.put(`/orders/updateOrder/${id}`, { status: "cancelled" }, { headers })
            await fetchOrders()
        } catch (err) {
            setError(err.response?.data?.message || "Reject failed")
        } finally {
            setSaving(false)
        }
    }

    const handleShip = async (id) => {
        setSaving(true)
        try {
            await intergrate.put(`/orders/updateOrder/${id}`, { status: "shipped" }, { headers })
            await fetchOrders()
        } catch (err) {
            setError(err.response?.data?.message || "Update failed")
        } finally {
            setSaving(false)
        }
    }

    return (
        <SellerSidebar>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Orders</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage customer orders</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Order ID</th>
                            <th className="px-5 py-3 text-left">Product</th>
                            <th className="px-5 py-3 text-left">Date</th>
                            <th className="px-5 py-3 text-left">Total</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {loading ? (
                            <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">Loading...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No orders yet</td></tr>
                        ) : orders.map(o => (
                            <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                                <td className="px-5 py-3 font-semibold text-slate-800 dark:text-white">#{o.id?.slice(0, 8)}</td>
                                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">Product #{o.prodId?.slice(0, 8)}</td>
                                <td className="px-5 py-3 text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td className="px-5 py-3 text-green-600 dark:text-green-400 font-bold">${o.price} x {o.quantity}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge[o.status?.toLowerCase()] || "bg-slate-100 text-slate-500"}`}>{o.status}</span>
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex gap-2">
                                        {o.status === "pending" && (
                                            <>
                                                <button onClick={() => handleApprove(o.id)} disabled={saving} className="text-xs px-3 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100 font-medium disabled:opacity-50">Approve</button>
                                                <button onClick={() => handleReject(o.id)} disabled={saving} className="text-xs px-3 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 font-medium disabled:opacity-50">Reject</button>
                                            </>
                                        )}
                                        {o.status === "confirmed" && (
                                            <button onClick={() => handleShip(o.id)} disabled={saving} className="text-xs px-3 py-1 rounded bg-purple-50 text-purple-600 hover:bg-purple-100 font-medium disabled:opacity-50">Mark as Shipped</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SellerSidebar>
    )
}
