import React, { type InputHTMLAttributes } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { type Control, type FieldValues, type Path } from "react-hook-form";
import { Input } from "../ui/input";

interface FormInputProps<TFormValues extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
  Icon?: React.ReactNode;
  labelClassName?: string;
  defaultValue?: string;
  isEditing?: boolean;
  renderView?: (value: string) => React.ReactNode;
}

export default function FormInput<TFormValues extends FieldValues>({
  control,
  label,
  name,
  Icon,
  description,
  className,
  labelClassName,
  isEditing = true,
  ...inputProps
}: FormInputProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && isEditing && (
            <FormLabel htmlFor={name.toString()} className={cn(labelClassName)}>
              {label}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative h-fit">
              {Icon && (
                <div className="absolute start-3 top-1/2 transform -translate-y-1/2">
                  {Icon}
                </div>
              )}
              <Input
                onDoubleClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                id={name.toString()}
                {...field}
                {...inputProps}
                className={cn("py-3 pr-4", Icon && "ps-10", className)}
              />
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
