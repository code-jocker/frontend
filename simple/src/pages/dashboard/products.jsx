import Sidebar from "../../components/Sidebar"

const products = []

export default function Products() {
    return (
        <Sidebar>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Products</h2>
                <button className="bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800">+ Add Product</button>
            </div>

            {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-10 text-center text-slate-400">
                    No products yet
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(p => (
                        <div key={p.name} className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center text-lg">📦</div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                                <p className="text-xs text-slate-400">{p.category} · Stock: {p.stock}</p>
                            </div>
                            <span className="text-blue-900 font-bold text-sm">{p.price}</span>
                        </div>
                    ))}
                </div>
            )}
        </Sidebar>
    )
}
