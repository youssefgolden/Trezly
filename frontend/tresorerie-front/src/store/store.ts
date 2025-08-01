import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './slice/transactionsSlice';
import categoriesReducer from './slice/categoriesSlice';

export const store = configureStore({
  reducer: {
    // reducers 
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
})

// Types utiles pour l'app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
