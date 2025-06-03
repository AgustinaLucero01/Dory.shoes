// src/hooks/useDeferredToast.js
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useSpecialToast = () => {
  useEffect(() => {
    const stored = localStorage.getItem("toastMessage");
    if (stored) {
      const { message, type = "info", options = {} } = JSON.parse(stored);
      toast[type](message, options);
      localStorage.removeItem("toastMessage");
    }
  }, []);
};

export const triggerSpecialToast = (message, type = "info", options = {}) => {
  localStorage.setItem("toastMessage", JSON.stringify({ message, type, options }));
};
