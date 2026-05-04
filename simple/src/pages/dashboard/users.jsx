import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import intergrate from "../../api/axios"

const roleBadge = {
    admin: "bg-purple-100 text-purple-600",
    customer: "bg-indigo-100 text-indigo-600",
    seller: "bg-green-100 text-green-600",
    delivery: "bg-orange-100 text-orange-600",
}

const emptyForm = { fullname: "", email: "", password: "", phonenumber: "", location: "", gender: "", age: "", date_of_birth: "", type: "customer" }

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editUser, setEditUser] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [saving, setSaving] = useState(false)

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/users/getAllUsers", { headers })
            setUsers(res.data)
        } catch (err) {
            console.error("Fetch error:", err)
            const msg = err.response?.data?.message || err.message || "Failed to fetch users"
            setError(`Error: ${msg} (Check console for details)`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchUsers() }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const openCreate = () => { setEditUser(null); setForm(emptyForm); setShowModal(true) }
    const openEdit = (user) => { setEditUser(user); setForm({ ...user, password: "" }); setShowModal(true) }
    const closeModal = () => { setShowModal(false); setEditUser(null); setForm(emptyForm) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editUser) {
                const { password, ...data } = form
                await intergrate.put(`/users/updateUser/${editUser.id}`, password ? form : data, { headers })
            } else {
                await intergrate.post("/users/createUser", form, { headers })
            }
            await fetchUsers()
            closeModal()
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await intergrate.delete(`/users/deleteUser/${id}`, { headers })
            setDeleteConfirm(null)
            await fetchUsers()
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed")
        }
    }

    return (
        <Sidebar>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Users</h2>
                <button onClick={openCreate} className="bg-indigo-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-indigo-600 transition">
                    + Add User
                </button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Name</th>
                            <th className="px-5 py-3 text-left">Email</th>
                            <th className="px-5 py-3 text-left">Phone</th>
                            <th className="px-5 py-3 text-left">Location</th>
                            <th className="px-5 py-3 text-left">Role</th>
                            <th className="px-5 py-3 text-left">Joined</th>
                            <th className="px-5 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={7} className="px-5 py-8 text-center text-slate-400">Loading...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={7} className="px-5 py-8 text-center text-slate-400">No users found</td></tr>
                        ) : users.map(u => (
                            <tr key={u.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center font-bold text-xs">
                                            {u.fullname?.[0]?.toUpperCase()}
                                        </div>
                                        <span className="font-medium text-slate-800">{u.fullname}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-slate-400">{u.email}</td>
                                <td className="px-5 py-3 text-slate-400">{u.phonenumber}</td>
                                <td className="px-5 py-3 text-slate-400">{u.location}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${roleBadge[u.type] || "bg-slate-100 text-slate-500"}`}>{u.type}</span>
                                </td>
                                <td className="px-5 py-3 text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                <td className="px-5 py-3">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(u)} className="text-xs px-3 py-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium">Edit</button>
                                        <button onClick={() => setDeleteConfirm(u)} className="text-xs px-3 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 font-medium">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{editUser ? "Edit User" : "Add User"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {[
                                { label: "Full Name", name: "fullname", type: "text", placeholder: "John Doe" },
                                { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                                { label: "Password", name: "password", type: "password", placeholder: editUser ? "Leave blank to keep" : "••••••••" },
                                { label: "Phone Number", name: "phonenumber", type: "tel", placeholder: "+250788000000" },
                                { label: "Location", name: "location", type: "text", placeholder: "City, Country" },
                                { label: "Age", name: "age", type: "number", placeholder: "25" },
                                { label: "Date of Birth", name: "date_of_birth", type: "date" },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
                                    <input type={f.type} name={f.name} value={form[f.name] || ""} onChange={handleChange} placeholder={f.placeholder}
                                        className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
                                <select name="gender" value={form.gender} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400">
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Role</label>
                                <select name="type" value={form.type} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400">
                                    <option value="customer">Customer</option>
                                    <option value="seller">Seller</option>
                                    <option value="admin">Admin</option>
                                    <option value="delivery">Delivery</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 bg-indigo-500 text-white py-2 rounded font-semibold text-sm hover:bg-indigo-600 transition disabled:opacity-60">
                                    {saving ? "Saving..." : editUser ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={closeModal} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded font-semibold text-sm hover:bg-slate-50 transition">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete User</h3>
                        <p className="text-slate-500 text-sm mb-5">Are you sure you want to delete <span className="font-semibold text-slate-700">{deleteConfirm.fullname}</span>? This cannot be undone.</p>
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
