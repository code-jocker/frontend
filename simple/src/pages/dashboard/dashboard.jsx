
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar"

const stats = [
    { label: "Total Orders", value: "0", icon: "🛒" },
    { label: "Products", value: "0", icon: "📦" },
    { label: "Users", value: "0", icon: "👥" },
    { label: "Revenue", value: "$0", icon: "r" },
]

export default function Dashboard() {
    return (
        <Sidebar>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map(s => (
                    <div key={s.label} className="bg-white rounded-lg p-5 shadow-sm">
                        <div className="text-3xl mb-3">{s.icon}</div>
                        <div className="text-2xl font-bold text-slate-800">{s.value}</div>
                        <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                    </div>
                ))}
            </div>
        </Sidebar>
    )
}
