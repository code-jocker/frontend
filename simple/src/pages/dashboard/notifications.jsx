import Sidebar from "../../components/Sidebar"

const notifs = []

export default function Notifications() {
    return (
        <Sidebar>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Notifications</h2>

            {notifs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-10 text-center text-slate-400">
                    No notifications yet
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {notifs.map((n, i) => (
                        <div key={i} className={`bg-white rounded-lg p-5 shadow-sm flex justify-between items-start border-l-4 ${n.read ? "border-slate-200" : "border-blue-900"}`}>
                            <div>
                                <p className={`text-sm font-semibold mb-1 ${n.read ? "text-slate-400" : "text-slate-800"}`}>{n.title}</p>
                                <p className="text-xs text-slate-400">{n.desc}</p>
                            </div>
                            <span className="text-xs text-slate-300 ml-4 whitespace-nowrap">{n.time}</span>
                        </div>
                    ))}
                </div>
            )}
        </Sidebar>
    )
}
