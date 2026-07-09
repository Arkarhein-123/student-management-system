import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";

interface FormInputProps extends ComponentProps<"input"> {
    label: string;
    error?: FieldError;
}

export default function FormInput({ label, error, className, ...props }: FormInputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {/* Added an optional check just in case you pass an empty label string */}
            {label && <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{label}</label>}

            <input
                {...props}
                className={`w-full px-3 h-10 bg-slate-50 border rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-150 ${
                    error
                        ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                        : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                } ${className || ""}`}
            />

            {error && <p className="text-xs font-medium text-red-600 mt-0.5">{error.message}</p>}
        </div>
    );
}
