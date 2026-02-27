import type { AddProjectDto } from "@/models/project";

export interface FormErrors {
  name?: string;
  description?: string;
}

export  const validateProjectForm = ({formData, setErrors}: {formData: AddProjectDto, setErrors: React.Dispatch<React.SetStateAction<FormErrors>>}): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Project name must be at least 3 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Project name must be less than 100 characters";
    }

    if (formData.description && formData.description.trim().length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };