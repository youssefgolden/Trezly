import { useState } from "react";

import { useAppDispatch } from "../../store/hooks";
import { addCategories, fetchCategories } from "../../store/slice/categoriesSlice";

type CategoriesData = {
    id?: number;
    name: string;
}
type CategoriesFormProps = {
    categories: CategoriesData[]
}

export default function CategoriesAddForm(){
    const dispatch = useAppDispatch();
    const [categoryName, setCategoryName] = useState('')

        const handleSubmit = async (e: React.FormEvent) => {
            const categoryData = {
                name : categoryName
            }
            try {
                await dispatch(addCategories(categoryData)).unwrap();
                dispatch(fetchCategories());
                setCategoryName(''); //reset
            } catch (error) {
                console.error("Error adding category:", error)
            }
          };
    return (
        <div>
           <form onSubmit={handleSubmit} className="flex flex-row" >
                <input type="text" 
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                name="category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 m-3 rounded hover:bg-blue-700"
                >
                    Add new category
                </button>
           </form>
        </div>
    )
}