import { useEffect, useState } from "react"
import CustomerSidebar from "../../components/CustomerSidebar"
import intergrate from "../../api/axios"

export default function CustomerNotifications() {
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
            setError("Failed to load notifications")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchNotifications() }, [])

    return (
        <CustomerSidebar>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Notifications</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{notifications.length} total notification{notifications.length !== 1 ? 's' : ''}</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="space-y-3">
                {loading ? (
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center text-slate-400">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8 text-center text-slate-400">No notifications</div>
                ) : notifications.map(n => (
                    <div key={n.id} className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            n.type === 'order_approved' ? 'bg-green-100 text-green-600' : 
                            n.type === 'order_cancelled' ? 'bg-red-100 text-red-600' : 
                            'bg-blue-100 text-blue-600'
                        }`}>
                            {n.type === 'order_approved' ? '✓' : n.type === 'order_cancelled' ? '✗' : 'ℹ'}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-800 dark:text-white">{n.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CustomerSidebar>
    )
}
