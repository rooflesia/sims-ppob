import * as React from 'react';
import { cn } from '../../utils/cn';
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, iconLeft, iconRight, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const errorMessage = typeof error === "string" ? error : error?.message;

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const currentType = type === "password" && isPasswordVisible ? "text" : type;

    return (
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {iconLeft}
          </div>
        )}
        <input
          type={currentType}
          className={cn(
            `flex h-10 rounded-md border bg-background p-2 w-full
              ${error ? "border-red-500" : "border-gray-300"} 
              ${iconLeft ? "pl-10" : iconRight || type === "password" ? "pr-10" : ""}
              text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed`,
            className,
          )}
          style={{ transition: "all 0.15s ease" }}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </div>
        ) : (
          iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {iconRight}
            </div>
          )
        )}
        {errorMessage && typeof errorMessage === "string" && <div className="absolute mt-1 text-red-500 text-sm">{errorMessage}</div>}
      </div>
      
    );
  },
);
Input.displayName = 'Input';

export default Input;