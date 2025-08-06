import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editCategory, fetchCategories, removeCategories } from "../../store/slice/categoriesSlice"
import CategoriesAddForm from "./CategoriesAddForm";
import Alert from "../layout/Alert";

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
  const { items: categories, loading, error } = useAppSelector((state) => state.categories) as CategoryData;   //déstructuration avec renommage , on pourra donc utiliser category

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  
  useEffect(() => {
    dispatch(fetchCategories()) // déclanche une action redux
  }, [dispatch])  //par securité , mais ca n'arrivera jamais que dispatch change

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000); 
  
      return () => clearTimeout(timer); // clean if message updated
    }
  }, [errorMessage]);


  const handleClick = (categorieName: string, categorieId: number) => {
    setEditingId(categorieId);
    setNewName(categorieName);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);

  };
  const handleSave = async (newName: string, categorieId: number) => {

    const categoryData = {
      id: categorieId,
      name: newName
    }

    try {
      await dispatch(editCategory(categoryData)).unwrap();
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Error editing category:", error)
      const err = error as Error;
      setErrorMessage(err.message);
    }

    setEditingId(null);
    setNewName("");
  }

  const handleRemove = async (categorieId: number) => {
    try {
      await dispatch(removeCategories(categorieId)).unwrap();
      dispatch(fetchCategories());
    } 
    catch (error) {
      console.error("Error removing category:", error);
      const err = error as Error;
      setErrorMessage(err.message);
    }

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
              <li key={categorie.id} className="py-1 px-2 border-b border-gray-200 last:border-0">
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
                      onClick={() => handleSave(newName, categorie.id)}
                      className="text-blue-600 hover:underline text-sm ml-2"
                    >Save</button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span>{categorie.id}: {categorie.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleClick(categorie.name, categorie.id)}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemove(categorie.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                          title="Supprimer cette catégorie"
                          aria-label={`Supprimer la catégorie ${categorie.name}`}
                        >
                          ✖
                        </button>
                      </div>
                    </div>


                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        <p className="text-xs text-gray-400 italic mt-1 pb-5">Scroll fo more categories</p>
        {errorMessage && <Alert message={errorMessage} type="error" />}

        <div className="mt-4">
          <CategoriesAddForm />
        </div>

      </div>

    )
  }