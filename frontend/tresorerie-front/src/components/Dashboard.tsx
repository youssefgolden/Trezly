import Transactions from "../pages/Transactions";
import AddTransactionForm from "./TransactionsForm";
import CategoryManager from "./DashboardComponents/CategoriesManager";
import DashboardStats from "./DashboardComponents/DashboardStats";


export default function Dashboard() {
    return (

        <div className="w-full flex flex-col bg-white">

            <h2 className="text-center text-3xl font-semibold mb-4 text-gray-800">Dashboard</h2>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                    {/* Global statistics */}
                    <DashboardStats />
                </div>

                <div className="w-full">
                    {/* Add or remove a Category */}
                    <CategoryManager />
                </div>
                <div className="w-full">
                    {/* Add transaction form */}
                    <AddTransactionForm />
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