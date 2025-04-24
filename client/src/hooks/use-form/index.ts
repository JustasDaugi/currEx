import { useState, ChangeEvent } from "react";

export function useForm<T extends Record<string, any>>(initialState: T) {
  const [formData, setFormData] = useState(initialState);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, setFormData, handleFieldChange };
}
