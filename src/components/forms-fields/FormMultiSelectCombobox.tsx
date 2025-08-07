import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronDown, X } from "lucide-react";
import Spinner from "../ui/spinner";
import useInfinite from "@/hooks/useInfinite";
import { useState, useMemo } from "react";

interface FormInfiniteMultiComboboxProps<TFormValues extends FieldValues, TData> {
    label?: string;
    description?: string;
    labelClassName?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    queryKey: string[];
    fetchFn: (pageNumber: number) => Promise<IPaginatedResponse<TData>>;
    getOptionLabel: (item: TData) => string;
    getOptionValue: (item: TData) => string | number;
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    maxDisplayItems?: number;
    showCount?: boolean;
    onOptionsChange?: (options: TData[]) => void;
}

export default function FormInfiniteMultiCombobox<
    TFormValues extends FieldValues,
    TData
>({
    control,
    name,
    label,
    description,
    placeholder,
    className,
    labelClassName,
    disabled,
    queryKey,
    fetchFn,
    getOptionLabel,
    getOptionValue,
    maxDisplayItems = 2,
    showCount = true,
    onOptionsChange,
}: FormInfiniteMultiComboboxProps<TFormValues, TData>) {
    const { data, isFetching, ref } = useInfinite<TData>({
        queryKey,
        fetchFn: (pageNumber) => fetchFn(pageNumber),
    });

    const options = useMemo(
        () => data?.pages.flatMap((page) => page.data) ?? [],
        [data]
    );
    const lastPage = data?.pages[data.pages.length - 1];
    const hasMoreData =
        lastPage && lastPage.meta.currentPage < lastPage.meta.totalPages;

    const [open, setOpen] = useState(false);

    // Notify parent of available options
    useMemo(() => {
        if (onOptionsChange && options.length > 0) {
            onOptionsChange(options);
        }
    }, [options, onOptionsChange]);

    // Helper function to get selected options
    const getSelectedOptions = (selectedValues: (string | number)[]) => {
        return options.filter(option =>
            selectedValues.includes(getOptionValue(option))
        );
    };

    // Helper function to format display text
    const getDisplayText = (selectedValues: (string | number)[]) => {
        if (!selectedValues || selectedValues.length === 0) {
            return placeholder || "اختر...";
        }

        const selectedOptions = getSelectedOptions(selectedValues);

        if (showCount && selectedValues.length > maxDisplayItems) {
            return `تم اختيار ${selectedValues.length} عنصر`;
        }

        return selectedOptions
            .slice(0, maxDisplayItems)
            .map(option => getOptionLabel(option))
            .join("، ") + (selectedValues.length > maxDisplayItems ? "..." : "");
    };

    // Toggle selection
    const toggleOption = (
        optionValue: string | number,
        currentValues: (string | number)[],
        onChange: (values: (string | number)[]) => void
    ) => {
        const isSelected = currentValues.includes(optionValue);

        if (isSelected) {
            // Remove from selection
            onChange(currentValues.filter(value => value !== optionValue));
        } else {
            // Add to selection
            onChange([...currentValues, optionValue]);
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const selectedValues: (string | number)[] = Array.isArray(field.value) ? field.value : [];
                const selectedOptions = getSelectedOptions(selectedValues);

                return (
                    <FormItem dir="rtl" className="w-full">
                        {description && <FormDescription>{description}</FormDescription>}

                        {label && (
                            <FormLabel htmlFor={name} className={cn("mb-1", labelClassName)}>
                                {label}
                            </FormLabel>
                        )}
                        <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between hover:scale-100 h-auto min-h-[40px] px-3 py-2",
                                            selectedValues.length === 0 && "text-muted-foreground",
                                            className
                                        )}
                                        disabled={disabled}
                                    >
                                        <span className="truncate flex-1 text-right">
                                            {getDisplayText(selectedValues)}
                                        </span>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {selectedValues.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        field.onChange([]);
                                                    }}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                        </div>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0" dir="rtl">
                                    <Command >
                                        <CommandInput
                                            placeholder="ابحث..."
                                            className="h-9"
                                            disabled={disabled}
                                        />
                                        <CommandEmpty>لا توجد نتائج</CommandEmpty>
                                        <CommandGroup className="h-60 overflow-auto">
                                            {options.map((item) => {
                                                const value = getOptionValue(item);
                                                const label = getOptionLabel(item);
                                                const isSelected = selectedValues.includes(value);

                                                return (
                                                    <CommandItem
                                                        key={label}
                                                        value={label}
                                                        onSelect={() => {
                                                            toggleOption(
                                                                value,
                                                                selectedValues,
                                                                field.onChange
                                                            );
                                                        }}
                                                        className={cn(
                                                            "flex items-center justify-between cursor-pointer",
                                                            isSelected && "bg-accent"
                                                        )}
                                                    >
                                                        <span className="flex-1 text-right">
                                                            {label}
                                                        </span>
                                                        <div
                                                            className={cn(
                                                                "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                                isSelected
                                                                    ? "bg-primary text-primary"
                                                                    : "opacity-50 [&_svg]:invisible"
                                                            )}
                                                        >
                                                            <Check className="h-3 w-3 " />
                                                        </div>
                                                    </CommandItem>
                                                );
                                            })}
                                            {isFetching && (
                                                <div className="flex justify-center py-2">
                                                    <Spinner />
                                                </div>
                                            )}
                                            {!isFetching && !hasMoreData && (
                                                <div className="text-muted-foreground py-2 text-center text-sm">
                                                    لا يوجد المزيد من البيانات
                                                </div>
                                            )}
                                            <div ref={ref} className="h-1" />
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}