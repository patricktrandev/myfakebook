import React from "react";
import "./loginInput.css";
import "./loginInput.css";
import { useField } from "formik";
export const LoginInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      <input
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      />
    </div>
  );
};
