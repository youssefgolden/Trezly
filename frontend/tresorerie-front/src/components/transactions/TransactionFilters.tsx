import { CategoriesDataType } from '../../store/slice/categoriesSlice'

type TransactionsFiltersDataType = {
    type: string;
    categoryName: string;
    setType: (value: string) => void;
    setCategoryName: (value: string) => void;
    categories: CategoriesDataType[];
}
export default function TransactionFilters({ type, setType, categoryName, setCategoryName, categories }: TransactionsFiltersDataType) {
    return (
        <div className='flex flex-row'>
            <select
                name="type"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={type}
                onChange={(e) => setType(String(e.target.value))}
            >
                <option value="" disabled>-- Select a type --</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>

            <select
                name="category"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={categoryName}
                onChange={(e) => setCategoryName(String(e.target.value))}
            >
                <option value="" disabled>-- Select a category --</option>
                {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))
                }
            </select>

            <button
                onClick={() => {
                    setType('');
                    setCategoryName('');
                }}
                className="ml-4 mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
                Reset
            </button>

        </div>
    )
}