import { useEffect, useState } from "react"
import SellerSidebar from "../../components/SellerSidebar"
import intergrate from "../../api/axios"
import { getUserFromToken } from "../../utils/auth"

const emptyForm = { name: "", size: "", price: "", type: "unisex", description: "", status: "available", shopName: "" }

export default function SellerProducts() {
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [saving, setSaving] = useState(false)
    const user = getUserFromToken()

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchShops = async () => {
        try {
            const res = await intergrate.get("/shops/myShops", { headers })
            setShops(res.data)
        } catch (err) {
            console.error("Failed to fetch shops:", err)
        }
    }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/products/getAllProducts", { headers })
            // Filter products that belong to seller's shops
            const myShopIds = shops.map(s => s.id)
            setProducts(res.data.filter(p => myShopIds.includes(p.shopId)))
        } catch (err) {
            setError("Failed to load products")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { 
        fetchShops()
    }, [])

    useEffect(() => {
        if (shops.length > 0) {
            fetchProducts()
        } else {
            setLoading(false)
        }
    }, [shops])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const openCreate = () => { setEditProduct(null); setForm(emptyForm); setShowModal(true) }
    const openEdit = (p) => { 
        setEditProduct(p); 
        setForm({ 
            name: p.name, 
            size: p.size, 
            price: p.price, 
            type: p.type, 
            description: p.description || "", 
            status: p.status,
            shopName: p.shop?.name || ""
        }); 
        setShowModal(true) 
    }
    const closeModal = () => { setShowModal(false); setEditProduct(null); setForm(emptyForm) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editProduct) {
                await intergrate.put(`/products/updateProduct/${editProduct.id}`, form, { headers })
            } else {
                await intergrate.post("/products/createProduct", form, { headers })
            }
            await fetchProducts()
            closeModal()
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await intergrate.delete(`/products/deleteProduct/${id}`, { headers })
            setDeleteConfirm(null)
            await fetchProducts()
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed")
        }
    }

    if (shops.length === 0 && !loading) {
        return (
            <SellerSidebar>
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-10 text-center">
                    <p className="text-slate-400 mb-4">You need to create a shop first before adding products</p>
                    <a href="/seller/shop" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 inline-block">Go to My Shop</a>
                </div>
            </SellerSidebar>
        )
    }

    return (
        <SellerSidebar>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Products</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage products in your shop</p>
                </div>
                <button onClick={openCreate} className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700">+ Add Product</button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {loading ? (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-10 text-center text-slate-400">Loading...</div>
            ) : products.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-10 text-center text-slate-400">No products yet. Add your first product!</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(p => (
                        <div key={p.id} className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center text-2xl">📦</div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{p.name}</p>
                                    <p className="text-xs text-slate-400">{p.type} · Size: {p.size}</p>
                                    {p.shop?.name && <p className="text-xs text-green-600 dark:text-green-400 mt-1">🏪 {p.shop.name}</p>}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">${p.price}</span>
                                <div className="flex gap-1">
                                    <button onClick={() => openEdit(p)} className="text-xs px-2 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100 font-medium">Edit</button>
                                    <button onClick={() => setDeleteConfirm(p)} className="text-xs px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 font-medium">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{editProduct ? "Edit Product" : "Add Product"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {[
                                { label: "Name", name: "name", placeholder: "T-Shirt" },
                                { label: "Size", name: "size", placeholder: "M, L, XL" },
                                { label: "Price", name: "price", type: "number", placeholder: "29.99" },
                                { label: "Description", name: "description", placeholder: "Optional description" },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">{f.label}</label>
                                    <input type={f.type || "text"} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
                                        className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-green-400 dark:bg-slate-700 dark:text-white" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Shop</label>
                                <select name="shopName" value={form.shopName} onChange={handleChange} className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-green-400 dark:bg-slate-700 dark:text-white">
                                    <option value="">Select shop</option>
                                    {shops.map(s => (
                                        <option key={s.id} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Type</label>
                                <select name="type" value={form.type} onChange={handleChange} className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-green-400 dark:bg-slate-700 dark:text-white">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Status</label>
                                <select name="status" value={form.status} onChange={handleChange} className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-green-400 dark:bg-slate-700 dark:text-white">
                                    <option value="available">Available</option>
                                    <option value="unvailable">Unavailable</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 bg-green-600 text-white py-2 rounded font-semibold text-sm hover:bg-green-700 transition disabled:opacity-60">
                                    {saving ? "Saving..." : editProduct ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={closeModal} className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-2 rounded font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-sm p-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Delete Product</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">Delete <span className="font-semibold text-slate-700 dark:text-slate-300">{deleteConfirm.name}</span>? This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 bg-red-500 text-white py-2 rounded font-semibold text-sm hover:bg-red-600 transition">Delete</button>
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-2 rounded font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </SellerSidebar>
    )
}
