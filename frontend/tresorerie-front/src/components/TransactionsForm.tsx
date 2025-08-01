import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addTransaction, fetchTransactions } from "../store/slice/transactionsSlice";
import { fetchCategories } from "../store/slice/categoriesSlice";

export default function AddTransactionForm() {
    const [amount, setAmount] = useState(1);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories()) // déclanche une action redux
    }, [dispatch])  //par securité , mais ca n'arrivera jamais que dispatch change

    const { items: categories, loading, error } = useAppSelector((state) => state.categories);   //déstructuration avec renommage , on pourra donc utiliser category


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedCategory = categories.find(category => category.id === Number(categoryId));
        const transactionData = {
            amount,
            type,
            description,
            categoryId: Number(categoryId),
            categoryName: selectedCategory?.name || '',
        };
        try {
            await dispatch(addTransaction(transactionData)).unwrap();
            dispatch(fetchTransactions());
            setAmount(0);
            setType('');
            setDescription('');
            setCategoryId('');
        } catch (error) {
            console.error("Error adding transaction:", error)
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-lg max-w-md mx-auto">
                <h2 className="font-semibold mb-4 text-gray-800">Add a new Transaction</h2>

                {/* Balance */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Entrer amount"
                        min={1}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        value={amount}
                        required
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </div>

                {/* Type  */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction type</label>
                    <select
                        name="type"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        value={type}
                        required
                        onChange={(e) => setType(String(e.target.value))}
                    >
                        <option value="" disabled>-- Select a type --</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        placeholder="Enter a description"
                        required
                        onChange={(e) => setDescription(String(e.target.value))}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>

                {/* Categorie */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">category</label>
                    <select
                        name="category"
                        value={categoryId}
                        required
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        <option value="">-- Select a category --</option>
                        {categories.map(categorie => (
                            <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                        ))}
                    </select>
                </div>



                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={amount <= 0}
                >
                    Add Transaction
                </button>
            </form>
        </div>
    )
}

