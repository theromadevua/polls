import { loginRequest, logoutRequest, refreshRequest, registerRequest, updateUserRequest } from "@/api/authApi";
import { checkToken } from "@/utils/checkToken";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import Cookies from "js-cookie";

const handleAsyncThunk = async <T>(requestFn: () => Promise<T>, rejectWithValue: Function, dispatch?: AppDispatch, refresh = true) => {
  try {
    if (refresh && dispatch) await checkToken(dispatch);
    const response = await requestFn();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Request failed");
  }
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue, dispatch }) => {
    const data: any = await handleAsyncThunk(() => loginRequest(credentials), rejectWithValue, dispatch as AppDispatch)
    handleLoginSuccess(data);
    return data.user;
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: { username: string; email: string; password: string }, { rejectWithValue, dispatch }) => {
    const data: any = await handleAsyncThunk(() => registerRequest(credentials), rejectWithValue, dispatch as AppDispatch)
    handleLoginSuccess(data)
    return data.user;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    await handleAsyncThunk(() => logoutRequest(), rejectWithValue, dispatch as AppDispatch);
    window.localStorage.removeItem('accessToken');
    window.location.reload(); 
  }
);


export const refreshTokens = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, dispatch }: any) => {
    const data: any = await handleAsyncThunk(() => refreshRequest(), rejectWithValue, dispatch as AppDispatch, false);
    if (!data || !data.accessToken) {
      return rejectWithValue("Failed to refresh tokens");
    }
    localStorage.setItem('accessToken', data.accessToken);
    return data.user;
  }
);


export const updateUser = createAsyncThunk('/auth/updateUser', 
  async (data: any, {rejectWithValue, dispatch}) => {
    const updatedUser:any = await handleAsyncThunk(() => updateUserRequest(data), rejectWithValue, dispatch as AppDispatch)
    return updatedUser;
  })



  const handleLoginSuccess = (data:any) => {

    Cookies.set('accessToken', data.accessToken, { 
      expires: 15/1440, 
      path: '/' 
    });
  
    localStorage.setItem('accessToken', data.accessToken)
  
  };
  