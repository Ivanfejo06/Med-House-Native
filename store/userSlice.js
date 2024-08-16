// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log('User State Updated:', state); // Verifica el estado después de la actualización
    },
    clearUser: (state) => {
      state.token = null;
      state.user = null;
      console.log('User State Cleared:', state); // Verifica el estado después de limpiar
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;