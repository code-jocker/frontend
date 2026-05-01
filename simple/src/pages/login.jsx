import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import intergrate from "../api/axios"

export default function Login() {

    const navigate = useNavigate()
    const [form, setForm] = useState({email: '',password: '',});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')

    
    //define function that will take value from login form and send to backend
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]: e.target.value})}


    //define function that will handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.email === "" || form.password === "") {
            setError("Please email and password are required");
            return;
        }
        setError('');
        try {
            const response = await intergrate.post("/login", form)
            console.log('All infomation', response);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");

        }catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }

    }



    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Sign In</h2>
                <p className="text-slate-400 text-sm mb-6">Welcome back to CleverStore</p>

                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} name="email"
                        className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                    <input
                     type="password" placeholder="••••••••" value={form.password} onChange={handleChange}
                     name="password"
                    className="w-full border border-slate-200 rounded px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                </div>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <button type="submit" className="w-full bg-indigo-500 text-white py-2.5 rounded font-semibold text-sm hover:bg-indigo-600 transition">
                    Sign In
                </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-5">
                    No account?{" "}
                    <Link to="/register" className="text-indigo-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    )
}
