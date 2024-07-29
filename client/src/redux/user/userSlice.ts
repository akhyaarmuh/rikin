import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number | null;
  full_name: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'CASHIER';
  shop: null | {
    name: string;
    no_hp: string;
    address: string;
    expired_at: string;
    foot_note?: string;
    pole_note?: string;
  };
  exp: number;
  accessToken: string;
  printer: 'USB' | 'Bluetooth' | null;
}

const initialState: UserState = {
  id: null,
  full_name: '',
  email: '',
  role: 'CASHIER',
  shop: null,
  exp: 0,
  accessToken: '',
  printer: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.shop = action.payload.shop;
    },
    signOut(state) {
      state.id = null;
      state.shop = null;
    },
    setAccessToken(state, action: PayloadAction<{ exp: number; accessToken: string }>) {
      state.exp = action.payload.exp;
      state.accessToken = action.payload.accessToken;
    },
    setPrinter(state, action: PayloadAction<UserState['printer']>) {
      state.printer = action.payload;
    },
  },
});

export const { signIn, signOut, setAccessToken, setPrinter } = userSlice.actions;
export default userSlice.reducer;
