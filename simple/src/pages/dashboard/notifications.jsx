import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import intergrate from "../../api/axios"

export default function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await intergrate.get("/notifications/my", { headers })
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

    const markAsRead = async (id) => {
        try {
            await intergrate.patch(`/notifications/${id}/read`, {}, { headers })
            await fetchNotifications()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to mark as read")
        }
    }

    const markAllAsRead = async () => {
        try {
            await intergrate.patch("/notifications/read-all", {}, { headers })
            await fetchNotifications()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to mark all as read")
        }
    }

    return (
        <Sidebar>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Notifications</h2>
                {notifications.some(n => !n.isRead) && (
                    <button onClick={markAllAsRead} className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                        Mark all as read
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="space-y-3">
                {loading ? (
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center text-slate-400">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center text-slate-400">No notifications</div>
                ) : notifications.map(n => (
                    <div key={n.id} className={`bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 flex items-start gap-4 ${!n.isRead ? 'border-l-4 border-indigo-500' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${n.type === 'new_order' ? 'bg-blue-100 text-blue-600' : n.type === 'order_approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {n.type === 'new_order' ? '🛒' : n.type === 'order_approved' ? '✓' : '✗'}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-800 dark:text-white">{n.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                        {!n.isRead && (
                            <button onClick={() => markAsRead(n.id)} className="text-xs text-indigo-500 hover:text-indigo-600 font-medium">
                                Mark read
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </Sidebar>
    )
}
