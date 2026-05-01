import { NavLink } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">

            {/* navbar */}
            <div className="flex justify-between items-center px-8 py-4 border-b border-slate-800">
                <h1 className="text-white font-bold text-xl">Clever<span className="text-blue-400">Store</span></h1>
                <div className="flex gap-3">
                    <NavLink to="/login" className="text-sm text-slate-300 border border-slate-600 px-4 py-2 rounded hover:border-blue-400 hover:text-white transition">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Register
                    </NavLink>
                </div>
            </div>

            {/* hero */}
            <div className="flex flex-col items-center justify-center flex-1 text-center px-4 py-20">
                <span className="text-blue-400 text-sm uppercase tracking-widest mb-4">Online Shopping Made Easy</span>
                <h2 className="text-white text-5xl font-bold mb-5 leading-tight">
                    Welcome to <br /> CleverStore
                </h2>
                <p className="text-slate-400 text-base max-w-md mb-8">
                    Discover products from the best shops. Fast delivery, great prices, easy returns.
                </p>
                <div className="flex gap-3">
                    <NavLink to="/register" className="bg-blue-600 text-white px-6 py-3 rounded text-sm font-semibold hover:bg-blue-700 transition">
                        Get Started
                    </NavLink>
                    <NavLink to="/login" className="border border-slate-600 text-slate-300 px-6 py-3 rounded text-sm hover:border-blue-400 hover:text-white transition">
                        Sign In
                    </NavLink>
                </div>
            </div>

            {/* features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-8 pb-16 max-w-4xl mx-auto w-full">
                {[
                    { icon: "🚀", title: "Fast Delivery", desc: "Get your orders delivered quickly to your door." },
                    { icon: "🛡️", title: "Secure Payments", desc: "Your transactions are safe and encrypted." },
                    { icon: "↩️", title: "Easy Returns", desc: "Not satisfied? Return it hassle-free." },
                ].map(f => (
                    <div key={f.title} className="bg-slate-800 rounded-lg p-6 text-center">
                        <div className="text-3xl mb-3">{f.icon}</div>
                        <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                        <p className="text-slate-400 text-sm">{f.desc}</p>
                    </div>
                ))}
            </div>

            {/* footer */}
            <div className="border-t border-slate-800 text-center py-5 text-slate-500 text-sm">
                © 2024 CleverStore. All rights reserved.
            </div>
        </div>
    )
}
