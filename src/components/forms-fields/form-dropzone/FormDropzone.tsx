"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn, formatFileSize, getFileIcon } from "@/lib/utils";
import { Upload, File, X, } from "lucide-react";
import Image from "next/image";

interface FileWithPreview extends File {
    preview?: string;
}

// Utility functions



// FileItem Component
interface FileItemProps {
    file: FileWithPreview;
    index: number;
    onRemove: (index: number) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, index, onRemove }) => {
    return (
        <div className="flex  items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 space-x-reverse flex-1 min-w-0">
                {/* File Icon */}
                <div className="flex-shrink-0">
                    {getFileIcon(file)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate w-30 ">
                        {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                    </p>
                </div>

                {/* Image Preview */}
                {file.preview && (
                    <div className="flex-shrink-0">
                        <div className="relative w-12 h-12">
                            <Image
                                fill
                                src={file.preview}
                                alt={file.name}
                                className="w-12 h-12 object-cover rounded-lg border"
                                onLoad={() => URL.revokeObjectURL(file.preview!)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Remove Button */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 mx-2"
            >
                <X className="w-4 h-4" />
            </Button>
        </div>
    );
};

// FileList Component
interface FileListProps {
    files: FileWithPreview[];
    onRemoveFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
    if (files.length === 0) return null;

    return (
        <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
                الملفات المحددة ({files.length})
            </h4>
            <div className="grid gap-3">
                {files.map((file, index) => (
                    <FileItem
                        key={`${file.name}-${index}`}
                        file={file}
                        index={index}
                        onRemove={onRemoveFile}
                    />
                ))}
            </div>
        </div>
    );
};

interface FileDropzoneProps {
    files: FileWithPreview[];
    onFilesChange: (files: FileWithPreview[]) => void;
    accept?: Record<string, string[]>;
    maxFiles?: number;
    maxSize?: number;
    multiple?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
    files,
    onFilesChange,
    accept,
    maxFiles = 5,
    maxSize = 2 * 1024 * 1024,
    multiple = true,
    disabled = false,
    placeholder = "اسحب وأفلت الملفات هنا أو انقر للاختيار",
}) => {
    const [dragActive, setDragActive] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file =>
            Object.assign(file, {
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
            })
        );

        if (multiple) {
            const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
            onFilesChange(updatedFiles);
        } else {
            onFilesChange(newFiles.slice(0, 1));
        }
        setDragActive(false);
    }, [files, onFilesChange, multiple, maxFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles: multiple ? maxFiles : 1,
        maxSize,
        multiple,
        disabled,
        onDragEnter: () => setDragActive(true),
        onDragLeave: () => setDragActive(false),
    });

    const removeFile = (indexToRemove: number) => {
        const updatedFiles = files.filter((_, index) => index !== indexToRemove);
        onFilesChange(updatedFiles);
    };

    return (
        <div className="space-y-4">
            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                    isDragActive || dragActive
                        ? "border-blue-400 bg-blue-50 scale-105"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
                    disabled && "opacity-50 cursor-not-allowed",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
            >
                <input {...getInputProps()} />

                {/* Upload Icon */}
                <div className={cn(
                    "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-200",
                    isDragActive || dragActive ? "bg-blue-100" : "bg-gray-100"
                )}>
                    <Upload className={cn(
                        "w-8 h-8 transition-colors duration-200",
                        isDragActive || dragActive ? "text-blue-600" : "text-gray-600"
                    )} />
                </div>

                {/* Main Text */}
                <div className="space-y-2">
                    <p className={cn(
                        "text-lg font-medium transition-colors duration-200",
                        isDragActive || dragActive ? "text-blue-700" : "text-gray-700"
                    )}>
                        {isDragActive ? "أفلت الملفات هنا" : placeholder}
                    </p>
                    <p className="text-sm text-gray-500">
                        أو <span className="text-blue-600 font-medium">انقر للاختيار من جهازك</span>
                    </p>
                </div>

                {/* File Restrictions */}
                <div className="mt-4 text-xs text-gray-400 space-y-1">
                    {maxSize && (
                        <p>الحد الأقصى لحجم الملف: {formatFileSize(maxSize)}</p>
                    )}
                    {multiple && maxFiles && (
                        <p>عدد الملفات المسموح: {maxFiles} ملف كحد أقصى</p>
                    )}
                </div>
            </div>

            {/* File List */}
            <FileList files={files} onRemoveFile={removeFile} />
        </div>
    );
};

// Main FormDropzone Component
interface FormDropzoneProps<TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    label?: string;
    description?: string;
    placeholder?: string;
    accept?: Record<string, string[]>;
    maxFiles?: number;
    maxSize?: number;
    multiple?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function FormDropzone<TFormValues extends FieldValues>({
    control,
    name,
    label,
    description,
    placeholder = "اسحب وأفلت الملفات هنا أو انقر للاختيار",
    accept,
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024, // 5MB
    multiple = true,
    disabled = false,
    className,
}: FormDropzoneProps<TFormValues>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const files = multiple ? (field.value || []) : (field.value ? [field.value] : []);

                const handleFilesChange = (newFiles: FileWithPreview[]) => {
                    if (multiple) {
                        field.onChange(newFiles);
                    } else {
                        field.onChange(newFiles[0] || null);
                    }
                };

                return (
                    <FormItem className={className}>
                        {label && (
                            <FormLabel className="text-base font-semibold text-gray-900">
                                {label}
                            </FormLabel>
                        )}
                        <FormControl>
                            <FileDropzone
                                files={files}
                                onFilesChange={handleFilesChange}
                                accept={accept}
                                maxFiles={maxFiles}
                                maxSize={maxSize}
                                multiple={multiple}
                                disabled={disabled}
                                placeholder={placeholder}
                            />
                        </FormControl>
                        {description && (
                            <FormDescription className="text-gray-600">
                                {description}
                            </FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
