
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar"


export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            <Sidebar />
            <div className="flex-1 flex flex-col bg--100">
                <div className="p-8 flex-1">
                         <Outlet />
                </div>
            </div>
        </div>
    )
}
    