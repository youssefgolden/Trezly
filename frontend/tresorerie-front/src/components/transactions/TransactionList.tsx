import TransactionCard from "./TransactionCard";

interface TransactionListDataType {
  transactions: {
    id?: number;
    amount: number;
    type: string;
    description: string;
    categoryId: number;
    categoryName?: string;
  }[];
}

export default function TransactionList({ transactions }: TransactionListDataType) {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          {...transaction}
        />
      ))}
    </div>
  );
}
