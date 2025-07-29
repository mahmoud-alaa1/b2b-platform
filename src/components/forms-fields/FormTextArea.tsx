import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";
import { AutosizeTextarea } from "../ui/AutoResizeTextarea";

interface FormInputProps<TFormValues extends FieldValues>
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "defaultValue"
  > {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  isEditing?: boolean;
  renderView?: (value: string) => React.ReactNode;
  onEnterSubmit?: () => void;
}

export default function FormTextArea<TFormValues extends FieldValues>({
  control,
  label,
  name,
  rightComponent,
  leftComponent,
  description,
  className,
  onEnterSubmit,
  isEditing = true,
  renderView,
  ...inputProps
}: FormInputProps<TFormValues>) {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey || isMobile) return;
      e.preventDefault();
      onEnterSubmit?.();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && isEditing && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            {isEditing ? (
              <div className="relative">
                {rightComponent && (
                  <div className="absolute top-2 right-2">{rightComponent}</div>
                )}
                {leftComponent && (
                  <div className="absolute bottom-4 left-2">
                    {leftComponent}
                  </div>
                )}
                <AutosizeTextarea
                  id={name}
                  {...inputProps}
                  {...field}
                  onKeyDown={handleKeyDown}
                  className={`${rightComponent ? "pr-10" : ""} ${
                    leftComponent ? "pl-10" : ""
                  } ${className || ""}`}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </div>
            ) : renderView ? (
              renderView(field.value)
            ) : (
              <p className="text-sm text-gray-800 py-2 px-1 min-h-[2.75rem] border rounded-md bg-gray-50 whitespace-pre-line">
                {field.value || "-"}
              </p>
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
