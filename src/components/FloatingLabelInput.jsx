import { useState } from "react";
import { cn } from "@/lib/utils";

const FloatingLabelInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  name,
  className = "",
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  placeholder = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  // For date inputs, we need to consider them as having a value when focused
  const shouldFloatLabel = hasValue || isFocused || type === "date";

  return (
    <div className="relative group">
      <input
        type={type}
        id={id}
        name={name}
        className={cn(
          "block px-3 w-full text-sm bg-white rounded-lg border transition-all duration-200 appearance-none focus:outline-none focus:ring-2 peer placeholder-transparent hover:border-gray-400",
          // Adjust padding based on whether label should float
          shouldFloatLabel ? "pb-2.5 pt-6" : "pb-2.5 pt-5",
          // Error state
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          // Normal state
          !error && "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
          disabled && "bg-gray-50 cursor-not-allowed opacity-60",
          className
        )}
        placeholder={placeholder || " "}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        spellCheck="false"
        aria-describedby={helperText ? `${id}-helper` : undefined}
        aria-invalid={error}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute text-sm duration-200 transform origin-[0] bg-white px-2 pointer-events-none transition-all z-10 left-3 -translate-y-1/2",
          // Positioning logic
          shouldFloatLabel && "top-0 scale-75",
          !shouldFloatLabel && "top-1/2 scale-100",
          // Color states
          error && "text-red-600 peer-focus:text-red-600",
          !error && shouldFloatLabel && "text-blue-600",
          !error &&
            !shouldFloatLabel &&
            "text-gray-500 peer-focus:text-blue-600",
          disabled && "text-gray-400"
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helperText && (
        <p
          id={`${id}-helper`}
          className={cn(
            "mt-1 text-xs",
            error ? "text-red-600" : "text-gray-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FloatingLabelInput;
