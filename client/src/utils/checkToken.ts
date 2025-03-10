import { AppDispatch } from "@/store";
import { refreshTokens } from "@/store/auth/authThunks";

export const checkToken = async (dispatch: AppDispatch) => {
  if (typeof window === "undefined") {
    console.log("SSR: localStorage is not available");
    return;
  }

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && accessToken !== "undefined") {
    try {
      const tokenParts = accessToken.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("invalid JWT");
      }

      const tokenPayload = JSON.parse(atob(tokenParts[1]));
      const tokenExpiration = tokenPayload.exp * 1000;

      if (tokenExpiration < Date.now()) {
        await dispatch(refreshTokens());
      }
    } catch (error) {
      console.error("Error checking token: ", error);
    }
  } else {
    console.log("No token provided.");
  }
};
