import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import intergrate from "../api/axios"

export default function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ fullName: '', email: '', password: '', phoneNumber: '', location: '', gender: '', age: '', date_of_birth: '', type: 'customer' })
    const [error, setError] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.fullName || !form.email || !form.password) {
            setError("Name, email and password are required")
            return
        }
        setError('')
        try {
            await intergrate.post("/register", form)
            navigate("/login")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.")
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10">
            <div className="bg-white w-full max-w-md rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Create Account</h2>
                <p className="text-slate-400 text-sm mb-6">Join CleverStore today</p>

                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                    <input type="text" placeholder="John Doe" name="fullName" value={form.fullName} onChange={handleChange}
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" placeholder="you@example.com" name="email" value={form.email} onChange={handleChange}
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                    <input type="password" placeholder="••••••••" name="password" value={form.password} onChange={handleChange}
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
                    <input type="tel" placeholder="+1 234 567 8900" name="phoneNumber" value={form.phoneNumber} onChange={handleChange}
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Location</label>
                    <input type="text" placeholder="City, Country" name="location" value={form.location} onChange={handleChange}
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400 text-slate-600">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Age</label>
                    <input type="number" placeholder="25" name="age" value={form.age} onChange={handleChange}
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Date of Birth</label>
                    <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange}
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400 text-slate-600" />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Account Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400 text-slate-600">
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                     
                    </select>
                </div>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <button type="submit" className="w-full bg-indigo-500 text-white py-2.5 rounded font-semibold text-sm hover:bg-indigo-600 transition">
                    Create Account
                </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-500 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    )
}
