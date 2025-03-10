import { useState, useEffect } from "react";

export const useProfileForm = (user: any | null) => {
  const [formData, setFormData] = useState<any>({
    username: "",
    email: "",
  });
  const [localImage, setLocalImage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
      setLocalImage(
        user.avatar ? `http://localhost:5000/${user.avatar}` : "/default-avatar.png"
      );
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev:any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setLocalImage(URL.createObjectURL(selectedFile));
    }
  };

  return {
    formData,
    localImage,
    file,
    handleChange,
    handleAvatarChange,
  };
};