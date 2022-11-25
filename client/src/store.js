import { configureStore } from '@reduxjs/toolkit';
import pesquisadoresReducer from './features/pesquisadores/pesquisadoresSlice';
import pesquisasReducer from './features/pesquisas/pesquisasSlice';
import trabalhosReducer from './features/trabalhos/trabalhosSlice';

export const store = configureStore({
  reducer: {
    trabalhos: trabalhosReducer,
    pesquisas: pesquisasReducer,
    pesquisadores: pesquisadoresReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
