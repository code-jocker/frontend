import Sidebar from "../../components/Sidebar"

const orders = []

const badge = {
    Delivered: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Processing: "bg-blue-100 text-blue-600",
    Cancelled: "bg-red-100 text-red-500",
}

export default function Orders() {
    return (
        <Sidebar>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Orders</h2>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Order</th>
                            <th className="px-5 py-3 text-left">Customer</th>
                            <th className="px-5 py-3 text-left">Date</th>
                            <th className="px-5 py-3 text-left">Total</th>
                            <th className="px-5 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-5 py-8 text-center text-slate-400">No orders yet</td>
                            </tr>
                        ) : orders.map(o => (
                            <tr key={o.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3 font-semibold text-slate-800">{o.id}</td>
                                <td className="px-5 py-3 text-slate-600">{o.customer}</td>
                                <td className="px-5 py-3 text-slate-400">{o.date}</td>
                                <td className="px-5 py-3 text-blue-900 font-bold">{o.total}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge[o.status]}`}>{o.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Sidebar>
    )
}
