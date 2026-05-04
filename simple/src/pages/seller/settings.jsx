import SellerSidebar from "../../components/SellerSidebar"
import { getUserFromToken } from "../../utils/auth"

export default function SellerSettings() {
    const user = getUserFromToken()

    return (
        <SellerSidebar>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account settings</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Account Information</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Full Name</label>
                        <p className="text-sm text-slate-800 dark:text-white">{user?.fullname}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</label>
                        <p className="text-sm text-slate-800 dark:text-white">{user?.email}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</label>
                        <p className="text-sm text-slate-800 dark:text-white">{user?.phonenumber}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Account Type</label>
                        <p className="text-sm text-slate-800 dark:text-white capitalize">{user?.type}</p>
                    </div>
                </div>
            </div>
        </SellerSidebar>
    )
}
