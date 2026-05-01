import Sidebar from "../../components/Sidebar"

const users = [
    { name: "", email: "", role: "Admin", joined: "May 2023" },
    { name: "", email: "bob@example.com", role: "Customer", joined: "Jul 2023" },
    { name: "", email: "carol@example.com", role: "Seller", joined: "Sep 2023" },
    { name: "", email: "", role: "Customer", joined: "Jan 2024" },
]

const roleBadge = {
    Admin: "bg-purple-100 text-purple-600",
    Customer: "bg-indigo-100 text-indigo-600",
    Seller: "bg-green-100 text-green-600",
}

export default function Users() {
    return (
        <Sidebar>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Users</h2>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Name</th>
                            <th className="px-5 py-3 text-left">Email</th>
                            <th className="px-5 py-3 text-left">Role</th>
                            <th className="px-5 py-3 text-left">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map(u => (
                            <tr key={u.email} className="hover:bg-slate-50">
                                <td className="px-5 py-3 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center font-bold text-xs">
                                        {u.name[0]}
                                    </div>
                                    <span className="font-medium text-slate-800">{u.name}</span>
                                </td>
                                <td className="px-5 py-3 text-slate-400">{u.email}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${roleBadge[u.role]}`}>{u.role}</span>
                                </td>
                                <td className="px-5 py-3 text-slate-400">{u.joined}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Sidebar>
    )
}
