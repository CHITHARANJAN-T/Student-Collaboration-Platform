import { createSlice } from '@reduxjs/toolkit';
import { persistedReducer } from './PersistConfig'; // Import the persistedReducer function

export const userSlice = createSlice({
    name: 'user',
    initialState: { storeValue: '' }, // Update the initial state structure
    reducers: {
        assign: (state, action) => {
          state.storeValue = action.payload;
        },
        logout: (state) => {
            state.storeValue = '';
        }
    },
  });

export const { assign, logout } = userSlice.actions;

// Wrap the rootReducer with the persistedReducer
export default persistedReducer(userSlice.reducer);

