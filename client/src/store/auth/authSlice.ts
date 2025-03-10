import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshTokens, registerUser, updateUser } from "@/store/auth/authThunks";

interface AuthState {
  isAuth: boolean;
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshTokens.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.isAuth = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.isAuth = false;
        state.loading = false;
        localStorage.removeItem('accessToken');
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
  },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
