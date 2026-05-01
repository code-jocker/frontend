import Sidebar from "../../components/Sidebar"

const shops = []

export default function Shop() {
    return (
        <Sidebar>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Shops</h2>
                <button className="bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800">+ Add Shop</button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Shop</th>
                            <th className="px-5 py-3 text-left">Category</th>
                            <th className="px-5 py-3 text-left">Products</th>
                            <th className="px-5 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {shops.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-5 py-8 text-center text-slate-400">No shops yet</td>
                            </tr>
                        ) : shops.map(s => (
                            <tr key={s.name} className="hover:bg-slate-50">
                                <td className="px-5 py-3 font-medium text-slate-800">{s.name}</td>
                                <td className="px-5 py-3 text-slate-400">{s.category}</td>
                                <td className="px-5 py-3 text-slate-400">{s.products}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${s.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                                        {s.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Sidebar>
    )
}
