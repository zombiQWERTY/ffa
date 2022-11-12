import classNames from "classnames";
import { useMemo, HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputTextProps {
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
  errorText?: string;
  placeholder?: string;
  formProps?: UseFormRegisterReturn;
}

export const InputText = (props: InputTextProps) => {
  const inputTextClassName = useMemo(
    () =>
      classNames(
        "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
        {
          "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500":
            props.error,
        }
      ),
    [props.error]
  );

  return (
    <div className="mb-6 relative">
      <input
        type={props.type || "text"}
        className={inputTextClassName}
        placeholder={props.placeholder}
        aria-invalid={props.error ? "true" : "false"}
        {...props.formProps}
      />
      {props.error && props.errorText && (
        <p className="text-pink-600 text-sm absolute -bottom-5 left-0">
          {props.errorText ? `${props.errorText}: ` : ""} {props.error.type}
        </p>
      )}
    </div>
  );
};
