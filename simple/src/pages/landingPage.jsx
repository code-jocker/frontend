import { NavLink } from "react-router-dom"


export default function LandingPage() {
    return (
        <div className="flex flex-col bg-black min-h-screen">
            <div className="flex justify-end gap-3 p-4">
                <NavLink to="/login" className="text-sm text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                    Login
                </NavLink>
                <NavLink to="/register" className="text-sm bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
                    Register
                </NavLink>
            </div>

            <div className="flex justify-center items-center flex-1">
                <h1 className="text-white text-2xl">Welcome to the clever store Landing Page</h1>
            </div>
        </div>
    )
}
