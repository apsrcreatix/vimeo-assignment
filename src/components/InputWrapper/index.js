import "./input-wrapper.css";

//all in one input wrapper only supports default types of input
export default function InputWrapper({
  name,
  id,
  label,
  type,
  parentClassName,
  inputClassName,
  labelClassName,
  required,
  labelCustomStyles,
  ...props
}) {
  switch (type) {
    case "checkbox":
    case "radio":
      return (
        <div
          className={`wrapped-input-container ${parentClassName}`}
          key={`${id}-${name}`}
        >
          {
            <label
              style={{ ...labelCustomStyles }}
              className={`wrapped-label ${labelClassName}`}
              htmlFor={id}
            >
              <input
                {...props}
                className={`wrapped-input ${inputClassName}`}
                type={type}
                id={id}
                required={required}
                name={name}
              />{" "}
              {label}
            </label>
          }
        </div>
      );
    default:
      return (
        <div
          className={`input-container ${parentClassName}`}
          key={`${id}-${name}`}
        >
          <input
            {...props}
            className={`input ${inputClassName}`}
            type={type}
            id={id}
            required={required}
            name={name}
          />
          {label && (
            <label
              style={{ ...labelCustomStyles }}
              className={`label ${labelClassName}`}
              htmlFor={id}
            >
              {label} {required && <sup style={{ color: "indianred" }}>*</sup>}
            </label>
          )}
        </div>
      );
  }
}
