import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pesquisasService from './pesquisasService';

const initialState = {
  result: [],
  queryString: '',
  filters: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getPesquisas = createAsyncThunk(
  'pesquisas/getPesquisas',
  async (options = {}, thunkAPI) => {
    try {
      return await pesquisasService.getPesquisas(options);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFilters = createAsyncThunk(
  'pesquisas/getFilters',
  async (_, thunkAPI) => {
    try {
      return await pesquisasService.getFilters();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const pesquisasSlice = createSlice({
  name: 'pesquisas',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPesquisas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPesquisas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.result = action.payload.result;
        state.queryString = action.payload.queryString;
      })
      .addCase(getPesquisas.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFilters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.filters = action.payload;
      })
      .addCase(getFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = pesquisasSlice.actions;
export default pesquisasSlice.reducer;
