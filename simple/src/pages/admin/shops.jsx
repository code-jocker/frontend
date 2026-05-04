import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import intergrate from "../../api/axios"

const emptyForm = { name: "", description: "", contact: "", status: "pending" }

export default function Shop() {
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editShop, setEditShop] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [saving, setSaving] = useState(false)

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchShops = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/shops/getAllShops", { headers })
            setShops(res.data)
        } catch (err) {
            console.error("Fetch error:", err)
            const msg = err.response?.data?.message || err.message || "Failed to fetch shops"
            setError(`Error: ${msg} (Check console for details)`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchShops() }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const openCreate = () => { setEditShop(null); setForm(emptyForm); setShowModal(true) }
    const openEdit = (s) => { setEditShop(s); setForm({ name: s.name, description: s.description || "", contact: s.contact, status: s.status }); setShowModal(true) }
    const closeModal = () => { setShowModal(false); setEditShop(null); setForm(emptyForm) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editShop) {
                await intergrate.put(`/shops/updateShop/${editShop.id}`, form, { headers })
            } else {
                await intergrate.post("/shops/createShop", form, { headers })
            }
            await fetchShops()
            closeModal()
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await intergrate.delete(`/shops/deleteShop/${id}`, { headers })
            setDeleteConfirm(null)
            await fetchShops()
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed")
        }
    }

    return (
        <Sidebar>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Shops</h2>
                <button onClick={openCreate} className="bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800">+ Add Shop</button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Shop</th>
                            <th className="px-5 py-3 text-left">Contact</th>
                            <th className="px-5 py-3 text-left">Description</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {loading ? (
                            <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">Loading...</td></tr>
                        ) : shops.length === 0 ? (
                            <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">No shops yet</td></tr>
                        ) : shops.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                                <td className="px-5 py-3 font-medium text-slate-800 dark:text-white">{s.name}</td>
                                <td className="px-5 py-3 text-slate-400">{s.contact}</td>
                                <td className="px-5 py-3 text-slate-400">{s.description}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${s.status === "active" ? "bg-green-100 text-green-600" : s.status === "pending" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-500"}`}>{s.status}</span>
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(s)} className="text-xs px-3 py-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium">Edit</button>
                                        <button onClick={() => setDeleteConfirm(s)} className="text-xs px-3 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 font-medium">Delete</button>
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
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{editShop ? "Edit Shop" : "Add Shop"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Name</label>
                                <input name="name" value={form.name} onChange={handleChange} placeholder="Shop name"
                                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Contact</label>
                                <input name="contact" value={form.contact} onChange={handleChange} placeholder="+250788000000"
                                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                                <input name="description" value={form.description} onChange={handleChange} placeholder="Optional description"
                                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                                <select name="status" value={form.status} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 bg-blue-900 text-white py-2 rounded font-semibold text-sm hover:bg-blue-800 transition disabled:opacity-60">
                                    {saving ? "Saving..." : editShop ? "Update" : "Create"}
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
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Shop</h3>
                        <p className="text-slate-500 text-sm mb-5">Delete <span className="font-semibold text-slate-700">{deleteConfirm.name}</span>? This cannot be undone.</p>
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
