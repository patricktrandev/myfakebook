import React from "react";
import "./registerInput.css";
import { useMediaQuery } from "react-responsive";
import { ErrorMessage, useField } from "formik";
export const RegisterInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";
  return (
    <div className="input_wrap register_input_wrap">
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
