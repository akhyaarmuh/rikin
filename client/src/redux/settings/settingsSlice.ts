import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  isSidenavOpen: boolean;
  theme: string;
}

const initialState: SettingsState = {
  isSidenavOpen: true,
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSidenav(state) {
      state.isSidenavOpen = !state.isSidenavOpen;
    },
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidenav, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
