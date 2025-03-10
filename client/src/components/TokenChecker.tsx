"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/store";
import { refreshTokens } from "@/store/auth/authThunks";
import Cookies from "js-cookie";

const protectedRoutes = ['/main', '/survey', '/surveyStatistics', '/profile'];
const authRoutes = ['/auth/login', '/auth/registration']; 

export const TokenChecker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, loading, error } = useSelector((store: RootState) => store.auth);
  const router = useRouter();
  const pathname = usePathname();

  const isProtectedRoute = () => protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = () => authRoutes.some(route => pathname.startsWith(route));
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const refreshResult = dispatch(refreshTokens());
    
    refreshResult.unwrap().catch(() => {
      if (isProtectedRoute()) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.push('/auth/login');
      }
    });
    
    const interval = setInterval(() => {
      dispatch(refreshTokens());
    }, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [dispatch, router, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isAuth && isAuthRoute()) {
      router.push("/main");
      return;
    }
    
    if (!isAuth && isProtectedRoute()) {
      if (!loading && error) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.push("/auth/login");
      }
    }
  }, [isAuth, loading, error, router, pathname]);

  return null;
};