import Transactions from "../pages/Transactions";
import CategoryManager from "./categories/CategoryManager";
import DashboardStats from "./stats/DashboardStats";
import TransactionForm from "./transactions/TransactionForm";


export default function Dashboard() {
    return (

        <div className="w-full flex flex-col bg-gray-50 min-h-screen px-4 md:px-10 py-6">

            <h2 className="text-center text-3xl font-semibold mb-4 text-gray-800">Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-4 h-full">
                    {/* Global statistics */}
                    <DashboardStats />
                </div>

                <div className="bg-white shadow rounded-lg p-4 h-full">
                    {/* Add or remove a Category */}
                    <CategoryManager />
                </div>
                <div className="bg-white shadow rounded-lg p-4 h-full">
                    {/* Add transaction form */}
                    <TransactionForm />
                    <div className="p-2 text-center text-sm text-gray-400">
                        Coming soon: Chart
                    </div>
                </div>
            </div>

            <h2 className="text-center text-3xl font-semibold mb-8 mt-8 text-gray-800">Transactions List</h2>
            <div className="flex flex-col lg:flex-row gap-4">

                {/* Transactions list */}
                <Transactions />

            </div>


        </div>
    )
}