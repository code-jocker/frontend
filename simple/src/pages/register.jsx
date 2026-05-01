import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10">
            <div className="bg-white w-full max-w-md rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Create Account</h2>
                <p className="text-slate-400 text-sm mb-6">Join CleverStore today</p>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                    <input type="text" placeholder="John Doe"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" placeholder="you@example.com"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                    <input type="password" placeholder="••••••••"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
                    <input type="tel" placeholder="+1 234 567 8900"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Location</label>
                    <input type="text" placeholder="City, Country"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Gender</label>
                    <select className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400 text-slate-600">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Age</label>
                    <input type="number" placeholder="25"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Date of Birth</label>
                    <input type="date"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400 text-slate-600" />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Account Type</label>
                    <select className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400 text-slate-600">
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                <button className="w-full bg-indigo-500 text-white py-2.5 rounded font-semibold text-sm hover:bg-indigo-600 transition">
                    Create Account
                </button>

                <p className="text-center text-sm text-slate-400 mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-500 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    )
}
