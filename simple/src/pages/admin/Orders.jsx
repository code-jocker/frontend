import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import intergrate from "../../api/axios"

const badge = {
    delivered: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    processing: "bg-blue-100 text-blue-600",
    cancelled: "bg-red-100 text-red-500",
    confirmed: "bg-green-100 text-green-600",
    approved: "bg-green-100 text-green-600",
}

const emptyForm = { prodId: "", price: "", quantity: "1" }

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editOrder, setEditOrder] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [saving, setSaving] = useState(false)

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchProducts = async () => {
        try {
            const res = await intergrate.get("/products/getAllProducts", { headers })
            setProducts(res.data)
        } catch (err) {
            console.error("Failed to fetch products:", err)
        }
    }

    const fetchOrders = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/orders/getAllOrders", { headers })
            setOrders(res.data)
        } catch (err) {
            console.error("Fetch error:", err)
            const msg = err.response?.data?.message || err.message || "Failed to fetch orders"
            setError(`Error: ${msg} (Check console for details)`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { 
        fetchOrders()
        fetchProducts()
    }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const openCreate = () => { setEditOrder(null); setForm(emptyForm); setShowModal(true) }
    const openEdit = (o) => { 
        setEditOrder(o); 
        setForm({ 
            prodId: o.prodId || "", 
            price: o.price || "", 
            quantity: o.quantity || "1",
            status: o.status || "pending"
        }); 
        setShowModal(true) 
    }
    const closeModal = () => { setShowModal(false); setEditOrder(null); setForm(emptyForm) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editOrder) {
                await intergrate.put(`/orders/updateOrder/${editOrder.id}`, form, { headers })
            } else {
                await intergrate.post("/orders/createOrder", form, { headers })
            }
            await fetchOrders()
            closeModal()
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed")
        } finally {
            setSaving(false)
        }
    }

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

    const handleDelete = async (id) => {
        try {
            await intergrate.delete(`/orders/deleteOrder/${id}`, { headers })
            setDeleteConfirm(null)
            await fetchOrders()
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed")
        }
    }

    return (
        <Sidebar>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Orders</h2>
                <button onClick={openCreate} className="bg-indigo-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-indigo-600 transition">+ Add Order</button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Order ID</th>
                            <th className="px-5 py-3 text-left">Customer</th>
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
                                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">Product ID: {o.prodId?.slice(0, 8)}</td>
                                <td className="px-5 py-3 text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td className="px-5 py-3 text-blue-900 dark:text-blue-400 font-bold">${o.price} x {o.quantity}</td>
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
                                        <button onClick={() => openEdit(o)} className="text-xs px-3 py-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium">Edit</button>
                                        <button onClick={() => setDeleteConfirm(o)} className="text-xs px-3 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 font-medium">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{editOrder ? "Edit Order" : "Add Order"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Product</label>
                                <select name="prodId" value={form.prodId} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" disabled={editOrder}>
                                    <option value="">Select product</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
                                    ))}
                                </select>
                                {editOrder && <p className="text-xs text-slate-400 mt-1">Product cannot be changed after order creation</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Price</label>
                                <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} placeholder="29.99"
                                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Quantity</label>
                                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="1" min="1"
                                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                            </div>
                            {editOrder && (
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                                    <select name="status" value={form.status} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400">
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            )}
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 bg-indigo-500 text-white py-2 rounded font-semibold text-sm hover:bg-indigo-600 transition disabled:opacity-60">
                                    {saving ? "Saving..." : editOrder ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={closeModal} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded font-semibold text-sm hover:bg-slate-50 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Order</h3>
                        <p className="text-slate-500 text-sm mb-5">Delete order <span className="font-semibold text-slate-700">#{deleteConfirm.id}</span>? This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 bg-red-500 text-white py-2 rounded font-semibold text-sm hover:bg-red-600 transition">Delete</button>
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded font-semibold text-sm hover:bg-slate-50 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </Sidebar>
    )
}
