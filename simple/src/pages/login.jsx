import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Sign In</h2>
                <p className="text-slate-400 text-sm mb-6">Welcome back to CleverStore</p>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" placeholder="you@example.com"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                    <input type="password" placeholder="••••••••"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <button className="w-full bg-indigo-500 text-white py-2.5 rounded font-semibold text-sm hover:bg-indigo-600 transition">
                    Sign In
                </button>

                <p className="text-center text-sm text-slate-400 mt-5">
                    No account?{" "}
                    <Link to="/register" className="text-indigo-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    )
}
