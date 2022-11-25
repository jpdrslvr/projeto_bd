import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pesquisadoresService from './pesquisadoresService';

const initialState = {
  result: [],
  queryString: '',
  filters: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getPesquisadores = createAsyncThunk(
  'pesquisadores/getPesquisadores',
  async (options = {}, thunkAPI) => {
    try {
      return await pesquisadoresService.getPesquisadores(options);
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
  'pesquisadores/getFilters',
  async (_, thunkAPI) => {
    try {
      return await pesquisadoresService.getFilters();
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

export const pesquisadoresSlice = createSlice({
  name: 'pesquisadores',
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
      .addCase(getPesquisadores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPesquisadores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.result = action.payload.result;
        state.queryString = action.payload.queryString;
      })
      .addCase(getPesquisadores.rejected, (state, action) => {
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

export const { reset } = pesquisadoresSlice.actions;
export default pesquisadoresSlice.reducer;
