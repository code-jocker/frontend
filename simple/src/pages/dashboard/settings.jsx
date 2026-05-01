import Sidebar from "../../components/Sidebar"

export default function Settings() {
    return (
        <Sidebar>
            <h2 className="text-xl font-bold text-slate-800 mb-6">Settings</h2>

            <div className="bg-white rounded-lg shadow-sm p-7 max-w-md">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-5">Profile</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                    <input type="text" placeholder="Your name"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-blue-900" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" placeholder="your@email.com"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-blue-900" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 mb-1">New Password</label>
                    <input type="password" placeholder="••••••••"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-blue-900" />
                </div>

                <button className="w-full bg-blue-900 text-white py-2.5 rounded font-semibold text-sm hover:bg-blue-800 transition">
                    Save Changes
                </button>
            </div>
        </Sidebar>
    )
}
