import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import intergrate from "../../api/axios"

const emptyForm = { message: "", type: "info" }

export default function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editNotification, setEditNotification] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [saving, setSaving] = useState(false)

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/notifications/getAllNotifications", { headers })
            setNotifications(res.data)
        } catch (err) {
            console.error("Fetch error:", err)
            const msg = err.response?.data?.message || err.message || "Failed to fetch notifications"
            setError(`Error: ${msg}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchNotifications() }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const openCreate = () => { setEditNotification(null); setForm(emptyForm); setShowModal(true) }
    const openEdit = (n) => { setEditNotification(n); setForm({ message: n.message, type: n.type }); setShowModal(true) }
    const closeModal = () => { setShowModal(false); setEditNotification(null); setForm(emptyForm) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editNotification) {
                await intergrate.put(`/notifications/updateNotification/${editNotification.id}`, form, { headers })
            } else {
                await intergrate.post("/notifications/createNotification", form, { headers })
            }
            await fetchNotifications()
            closeModal()
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await intergrate.delete(`/notifications/deleteNotification/${id}`, { headers })
            setDeleteConfirm(null)
            await fetchNotifications()
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed")
        }
    }

    return (
        <Sidebar>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Notifications</h2>
                <button onClick={openCreate} className="bg-indigo-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-indigo-600 transition">+ Add Notification</button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="space-y-3">
                {loading ? (
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center text-slate-400">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center text-slate-400">No notifications</div>
                ) : notifications.map(n => (
                    <div key={n.id} className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${n.type === 'info' ? 'bg-blue-100 text-blue-600' : n.type === 'success' ? 'bg-green-100 text-green-600' : n.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                            {n.type === 'info' ? 'ℹ️' : n.type === 'success' ? '✓' : n.type === 'warning' ? '⚠️' : '✗'}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-800 dark:text-white">{n.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openEdit(n)} className="text-xs px-3 py-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium">Edit</button>
                            <button onClick={() => setDeleteConfirm(n)} className="text-xs px-3 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 font-medium">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{editNotification ? "Edit Notification" : "Add Notification"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Message</label>
                                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Notification message" rows="3"
                                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                                <select name="type" value={form.type} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none focus:border-indigo-400">
                                    <option value="info">Info</option>
                                    <option value="success">Success</option>
                                    <option value="warning">Warning</option>
                                    <option value="error">Error</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 bg-indigo-500 text-white py-2 rounded font-semibold text-sm hover:bg-indigo-600 transition disabled:opacity-60">
                                    {saving ? "Saving..." : editNotification ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={closeModal} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded font-semibold text-sm hover:bg-slate-50 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Notification</h3>
                        <p className="text-slate-500 text-sm mb-5">Delete this notification? This cannot be undone.</p>
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
