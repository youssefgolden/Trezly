import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TransactionsDataType = {
  id?: number;
  amount: number;
  type: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

interface TransactionsState {
  items: TransactionsDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
};

// Thunk asynchrone

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await fetch('http://localhost:5137/api/Transactions?pageNumber=1&pageSize=60');
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to load transactions');
    }

    return data as TransactionsDataType[];
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData: TransactionsDataType) => {
    const response = await fetch('http://localhost:5137/api/Transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to load transactions');
    }

    return data as TransactionsDataType
  }

);



const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<TransactionsDataType[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default transactionsSlice.reducer;


