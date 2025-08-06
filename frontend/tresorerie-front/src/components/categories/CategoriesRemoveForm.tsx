import { useState } from "react";

import { useAppDispatch } from "../../store/hooks";
import { fetchCategories, removeCategories } from "../../store/slice/categoriesSlice";

type CategoriesData = {
    id?: number;
    name: string;
}


export default function CategoriesRemoveForm() {
    const dispatch = useAppDispatch();
    const [categoryId, setCategoryId] = useState<number>(1)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(removeCategories(categoryId)).unwrap();
            dispatch(fetchCategories());
            setCategoryId(0); //reset
        } catch (error) {
            const err = error as Error;
            console.error("Error removing category:", err.message);
            setErrorMessage(err.message);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-row" >
                <input type="number"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                    min={1}
                    name="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}

                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 m-3 rounded hover:bg-blue-700"
                >
                    Remove Category
                </button>
                {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
            </form>
        </div>
    )
}