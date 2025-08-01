import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import TransactionsCard from '../components/TransactionCard'
import { fetchTransactions } from '../store/slice/transactionsSlice'
import TransactionFilters from '../components/DashboardComponents/TransactionFilters';
import { fetchCategories } from '../store/slice/categoriesSlice';

export default function Transactions() {

  const [filterType, setFilterType] = useState('')
  const [filterCategoryName, setFilterCategoryName] = useState('')

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactions()) // déclanche une action redux
    dispatch(fetchCategories()) // déclanche une action redux

  }, [dispatch])  //par securité , mais ca n'arrivera jamais que dispatch change

  const { items: transactions, loading, error } = useAppSelector((state) => state.transactions);   //déstructuration avec renommage , on pourra donc utiliser transactions
  const { items: categories } = useAppSelector((state) => state.categories);   //déstructuration avec renommage , on pourra donc utiliser category


  //  filter  transactions based on the selected type and category name.
  // - If no filter selected (empty string), include all items for that filter.
  // - If a filter is selected, include only matching transactions.
  // The result is a list of transactions that match both the selected type and category.
  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filterType === '' || transaction.type === filterType;
    const categoryMatch = filterCategoryName === '' || transaction.categoryName === filterCategoryName;
    return typeMatch && categoryMatch;
  });


  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-10">Loading transactions....</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 text-xl mt-10">Erreur : {error}</p>;
  }

  return <div>
    <div className="min-h-screen bg-white p-6">

      <TransactionFilters type={filterType} categoryName={filterCategoryName} setType={setFilterType} setCategoryName={setFilterCategoryName} categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
        {

          filteredTransactions.map(transaction => (
            <TransactionsCard
              key={transaction.id}
              id={transaction.id}
              amount={transaction.amount}
              type={transaction.type}
              description={transaction.description}
              categoryId={transaction.categoryId}
              categoryName={transaction.categoryName ?? '-'}
            />
          ))
        }

      </div>
    </div>
  </div>
}