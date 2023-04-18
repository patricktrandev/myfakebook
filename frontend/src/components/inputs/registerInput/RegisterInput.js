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
  const desktopView = useMediaQuery({
    query: "(min-width):850px",
  });
  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";
  const con1 =
    view1 && (field.name === "first_name" || field.name === "last_name");
  const con2 = view1 && (field.name === "email" || field.name === "password");
  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={
          meta.touched && meta.error ? `input_error_border`.toString() : ""
        }
        style={{
          width: `${con1 ? "100%" : con2 ? "370px" : "300px"}`,
        }}
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={view3 ? "input_error input_error_desktop" : "input_error"}
          style={{
            transform: "translateY(1px)",
            left: `${test1 ? "-107%" : test2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                view3 && field.name !== "last_name"
                  ? "error_arrow_left"
                  : view3 && field.name === "last_name"
                  ? "error_arrow_right"
                  : !view3 && "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      <div>{meta.touched && meta.error && <i className="error_icon"></i>}</div>
    </div>
  );
};
