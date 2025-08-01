import { useAppSelector } from "../../store/hooks"

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
        <div>
            <h4 className="font-semibold mb-8 text-gray-800">Dashboard Stats</h4>
            <ul className="text-sm text-gray-500">
                <li>Total Income :{incomeTotal}€ </li>
                <li>Total Expense :{expenseTotal}€ </li>
                <li>Current Balance: {incomeTotal - expenseTotal}€</li>
            </ul>
        </div>
    )
}