type TransactionsDataType = {
    id?: number;
    amount: number;
    type: string;
    description: string;
    categoryId: number;
    categoryName?: string;
}
export default function TransactionsCard({ id, amount, type, description, categoryId, categoryName }: TransactionsDataType) {
    return <div>
        <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
            <h2 className="text-xl font-medium text-gray-900">Transaction Type: {type}</h2>
            <p className="text-sm text-gray-500">ID : {id }</p>
            <p className="text-sm text-gray-500">Amount: {amount}</p>
            <p className="text-sm text-gray-500">Description: {description}</p>
            <p className="text-sm text-gray-500">CategoryId: {categoryId}</p>
            <p className="text-sm text-gray-500">Category Name: {categoryName}</p>
        </div>
    </div>
}