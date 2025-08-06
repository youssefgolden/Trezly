import { useAppSelector } from "../../store/hooks"
import StatCard from "./StatCard";

export default function DashboardStats() {
    //import all transactions from redux store
    const { items: transactions } = useAppSelector((state) => state.transactions);

    const incomeTotal = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce((sum, transaction) => sum + transaction.amount, 0)

    const expenseTotal = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard name={'Total Income'} value={incomeTotal} />
                <StatCard name={'Total Expense'} value={expenseTotal} />
                <StatCard name={'Current Balance'} value={incomeTotal - expenseTotal} />
        </div>
    )
}