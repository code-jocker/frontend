import { useEffect, useState } from "react"
import CustomerSidebar from "../../components/CustomerSidebar"
import intergrate from "../../api/axios"

export default function CustomerProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [ordering, setOrdering] = useState(false)

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/products/getAllProducts", { headers })
            setProducts(res.data.filter(p => p.status === "available"))
        } catch (err) {
            setError("Failed to load products")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchProducts() }, [])

    const handleOrder = async () => {
        if (!selectedProduct) return
        setOrdering(true)
        try {
            await intergrate.post("/orders/createOrder", {
                prodId: selectedProduct.id,
                price: parseFloat(selectedProduct.price),
                quantity: parseInt(quantity)
            }, { headers })
            setSelectedProduct(null)
            setQuantity(1)
            alert("Order placed successfully!")
        } catch (err) {
            setError(err.response?.data?.message || "Failed to place order")
        } finally {
            setOrdering(false)
        }
    }

    return (
        <CustomerSidebar>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Browse Products</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Find and order products from our shops</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {loading ? (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-10 text-center text-slate-400">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-10 text-center text-slate-400">No products available</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map(p => (
                        <div key={p.id} className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                            <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                                <span className="text-6xl">📦</span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-1">{p.name}</h3>
                                <p className="text-xs text-slate-400 mb-2">{p.type} · Size: {p.size}</p>
                                {p.shop?.name && <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-2">🏪 {p.shop.name}</p>}
                                {p.description && <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{p.description}</p>}
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${p.price}</span>
                                    <button onClick={() => setSelectedProduct(p)} className="bg-indigo-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-indigo-600 transition">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedProduct && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Place Order</h3>
                        <div className="mb-4">
                            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Product:</span> {selectedProduct.name}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Price:</span> ${selectedProduct.price}</p>
                            {selectedProduct.shop?.name && <p className="text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Shop:</span> {selectedProduct.shop.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Quantity</label>
                            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                className="w-full border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:bg-slate-700 dark:text-white" />
                        </div>
                        <div className="mb-4 p-3 bg-indigo-50 dark:bg-slate-700 rounded">
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">Total: ${(selectedProduct.price * quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleOrder} disabled={ordering} className="flex-1 bg-indigo-500 text-white py-2 rounded font-semibold text-sm hover:bg-indigo-600 transition disabled:opacity-60">
                                {ordering ? "Placing..." : "Confirm Order"}
                            </button>
                            <button onClick={() => { setSelectedProduct(null); setQuantity(1); }} className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-2 rounded font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CustomerSidebar>
    )
}
