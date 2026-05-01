import Sidebar from "../../components/Sidebar"

const categories = []

export default function Categories() {
    return (
        <Sidebar>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Categories</h2>
                <button className="bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800">+ Add Category</button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Name</th>
                            <th className="px-5 py-3 text-left">Description</th>
                            <th className="px-5 py-3 text-left">Products</th>
                            <th className="px-5 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-5 py-8 text-center text-slate-400">No categories yet</td>
                            </tr>
                        ) : categories.map(c => (
                            <tr key={c.name} className="hover:bg-slate-50">
                                <td className="px-5 py-3 font-medium text-slate-800">{c.name}</td>
                                <td className="px-5 py-3 text-slate-400">{c.description}</td>
                                <td className="px-5 py-3 text-slate-400">{c.products}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${c.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                                        {c.status}
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
