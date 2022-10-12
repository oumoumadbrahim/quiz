import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: 'Ebrahim',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
