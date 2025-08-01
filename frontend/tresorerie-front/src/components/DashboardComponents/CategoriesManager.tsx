import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editCategory, fetchCategories } from "../../store/slice/categoriesSlice"
import CategoriesAddForm from "./CategoriesAddForm";
import CategoriesRemoveForm from "./CategoriesRemoveForm";

interface Category {
  id: number;
  name: string;
}

type CategoryData = {
  items: Category[];
  loading: boolean;
  error: string | null;
}

export default function CategoryManager() {

  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories()) // déclanche une action redux
  }, [dispatch])  //par securité , mais ca n'arrivera jamais que dispatch change

  const { items: categories, loading, error } = useAppSelector((state) => state.categories) as CategoryData;   //déstructuration avec renommage , on pourra donc utiliser category

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>('')

  const handleClick = (categorieName: string, categorieId: number)=>{
    setEditingId(categorieId);
    setNewName(categorieName);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);

  };
  const handleSave = async(newName:string, categorieId: number)=>{

    const categoryData = {
        id : categorieId,
        name: newName
    }

    try {
      await dispatch(editCategory(categoryData)).unwrap();
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Error editing category:", error)
    }

    setEditingId(null);
    setNewName("");
  }
  
  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-10">Loading Categories....</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 text-xl mt-10">Erreur : {error}</p>;
  }

  return (
    <div>
      <h2 className="font-semibold mb-4 text-gray-800">My Current Categories</h2>

      <div className="relative h-52 overflow-y-auto border border-gray-200 rounded-md p-2 shadow-sm bg-white">
        <ul className="mt-1 block rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          {categories.map((categorie) => (
            <li key={categorie.id}>
              {editingId === categorie.id ? (
              <>
                <input
                  type="text"
                  className="mt-1 block rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={newName}
                  onChange={handleChange}
                  placeholder="enter a new category name"
                />
                <button 
                onClick={ ()=> handleSave(newName, categorie.id)}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black transition-shadow shadow-sm hover:shadow-md"
                >Save</button>
              </>
            ) : (
              <>
               {categorie.id}: {categorie.name}
                <button 
                onClick={() => handleClick(categorie.name, categorie.id)}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black transition-shadow shadow-sm hover:shadow-md"
                >Edit</button>
              </>
            )}
          </li>
          ))}
        </ul>

        <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      <p className="text-xs text-gray-400 italic mt-1">Scroll fo more categories</p>

      <div className="mt-4">
        <CategoriesAddForm />
      </div>


      <div className="mt-4">
        <CategoriesRemoveForm />
      </div>

      
    </div>

  )
}