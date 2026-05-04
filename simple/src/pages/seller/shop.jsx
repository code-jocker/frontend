import { useEffect, useState } from "react"
import SellerSidebar from "../../components/SellerSidebar"
import intergrate from "../../api/axios"

const emptyForm = { name: "", description: "", contact: "", status: "pending" }

export default function SellerShop() {
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editShop, setEditShop] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [saving, setSaving] = useState(false)

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchShops = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/shops/myShops", { headers })
            setShops(res.data)
        } catch (err) {
            setError("Failed to load shops")
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

    return (
        <SellerSidebar>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Shop</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your shop information</p>
                </div>
                {shops.length === 0 && (
                    <button onClick={openCreate} className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700">+ Create Shop</button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {loading ? (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-10 text-center text-slate-400">Loading...</div>
            ) : shops.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-10 text-center">
                    <p className="text-slate-400 mb-4">You don't have a shop yet</p>
                    <button onClick={openCreate} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Create Your Shop</button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {shops.map(s => (
                        <div key={s.id} className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{s.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.description}</p>
                                </div>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                    s.status === "active" ? "bg-green-100 text-green-600" : 
                                    s.status === "pending" ? "bg-yellow-100 text-yellow-600" : 
                                    "bg-red-100 text-red-500"
                                }`}>{s.status}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Contact</label>
                                    <p className="text-sm text-slate-800 dark:text-white">{s.contact}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Products</label>
                                    <p className="text-sm text-slate-800 dark:text-white">{parseInt(s.productCount) || 0} products</p>
                                </div>
                            </div>
                            <button onClick={() => openEdit(s)} className="text-sm px-4 py-2 rounded bg-green-50 text-green-600 hover:bg-green-100 font-medium">
                                Edit Shop
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{editShop ? "Edit Shop" : "Create Shop"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Shop Name</label>
                                <input name="name" value={form.name} onChange={handleChange} placeholder="My Shop" required
                                    className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-green-400 dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Contact</label>
                                <input name="contact" value={form.contact} onChange={handleChange} placeholder="+250788000000" required
                                    className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-green-400 dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Description</label>
                                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your shop" rows="3"
                                    className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-green-400 dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 bg-green-600 text-white py-2 rounded font-semibold text-sm hover:bg-green-700 transition disabled:opacity-60">
                                    {saving ? "Saving..." : editShop ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={closeModal} className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-2 rounded font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SellerSidebar>
    )
}
