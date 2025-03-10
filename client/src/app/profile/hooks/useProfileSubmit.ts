import { useState, useCallback } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/auth/authThunks"; 

export const useProfileSubmit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent, formData: any, file: File | null) => {
      e.preventDefault();
      const updatedData = new FormData();
      updatedData.append("username", formData.username);
      updatedData.append("email", formData.email);
      if (file) {
        updatedData.append("avatar", file);
      }

      dispatch(updateUser(updatedData));
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    },
    [dispatch]
  );

  return { submitted, handleSubmit };
};