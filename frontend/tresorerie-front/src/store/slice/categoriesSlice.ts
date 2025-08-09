import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CategoriesDataType = {
  id?: number;
  name: string;
}

interface CategoriesState {
  items: CategoriesDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};
// TODO : move and rework with .env file
const API_BASE = "https://trezly-api.onrender.com";

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch(`${API_BASE}/api/Categories`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error('Failed to load categories');
    }

    return data as CategoriesDataType[];
  })


export const addCategories = createAsyncThunk(
  'categories/addCategories',
  async (categoryData: CategoriesDataType) => {
    const response = await fetch(`${API_BASE}/api/Categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    })

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to load categories: ${errorText}`);
    }
    const data = await response.json()

    return data as CategoriesDataType;
  })

  export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async (categoryData: CategoriesDataType) => {
      const response = await fetch(`${API_BASE}/api/Categories/${categoryData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to load categories: ${errorText}`);
      }
      const text = await response.text();
      const data = text ? JSON.parse(text) : categoryData;
  
      return data as CategoriesDataType;
    })

    export const removeCategories = createAsyncThunk(
      'categories/removeCategories',
      async (id: number) => {
        const response = await fetch(`${API_BASE}/api/Categories/${id}`, {
          method: 'DELETE',
        })
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to remove categories: ${errorText}`);
        } 
    
        return id ;
      })


  




const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoriesDataType[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default categoriesSlice.reducer;


