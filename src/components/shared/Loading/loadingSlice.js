import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const setLoading = loadingSlice.actions.setLoading

export const startLoading = setLoading(true)
export const endLoading = setLoading(false)


export default loadingSlice.reducer;