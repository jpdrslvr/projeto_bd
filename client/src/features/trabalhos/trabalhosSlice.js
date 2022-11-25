import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trabalhosService from './trabalhosService';

const initialState = {
  result: [],
  queryString: '',
  filters: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getTrabalhos = createAsyncThunk(
  'trabalhos/getTrabalhos',
  async (options = {}, thunkAPI) => {
    try {
      return await trabalhosService.getTrabalhos(options);
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
  'trabalhos/getFilters',
  async (_, thunkAPI) => {
    try {
      return await trabalhosService.getFilters();
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

export const trabalhosSlice = createSlice({
  name: 'trabalhos',
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
      .addCase(getTrabalhos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrabalhos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.result = action.payload.result;
        state.queryString = action.payload.queryString;
      })
      .addCase(getTrabalhos.rejected, (state, action) => {
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

export const { reset } = trabalhosSlice.actions;
export default trabalhosSlice.reducer;
