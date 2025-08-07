'use client';

import FormInput from "@/components/forms-fields/FormInput";
import { conditionalRegisterSchemaType } from "@/schemas/authSchema";
import { useFormContext } from "react-hook-form";
import { MapPin, Tag, Star, Target, X } from "lucide-react";
import { motion } from "motion/react";
import FormDropzone from "@/components/forms-fields/form-dropzone/FormDropzone";
import { getCategories } from "@/services/categoriesServices";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FormInfiniteMultiCombobox from "@/components/forms-fields/FormMultiSelectCombobox";

const SUPPLIER_BENFITS = [
    "عرض خدماتك لعملاء محتملين",
    "إدارة طلبات العملاء بكفاءة",
    "بناء سمعة مهنية قوية",
    "أدوات تسويق متقدمة"
];

const CLIENT_BENEFITS = [
    "الوصول إلى موردين معتمدين",
    "مقارنة الأسعار والخدمات",
    "نظام تقييم شفاف",
    "دعم فني متخصص"
]

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export function Step3TypeInfo() {
    const { control, watch, setValue } = useFormContext<conditionalRegisterSchemaType>();
    const accountType = watch("accountType");
    const selectedCategoryIds = watch("categories") || [];

    // Helper function to get category name by ID from fetched options
    const getCategoryNameById = (categoryId: string | number, allOptions: ICategory[] = []): string => {
        const category = allOptions.find(cat => cat.categoryId === categoryId);
        return category?.categoryName || `Category ${categoryId}`;
    };

    const removeCategory = (categoryIdToRemove: string | number) => {
        const updatedCategories = selectedCategoryIds.filter(
            (id: string | number) => id !== categoryIdToRemove
        );
        setValue("categories", updatedCategories, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full space-y-8 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="text-center space-y-4" variants={itemVariants}>
                <div className="w-16 h-16 mx-auto bg-indigo-500 rounded-2xl flex items-center justify-center mb-4">
                    {accountType === "Suppliers" ? (
                        <Tag className="w-8 h-8 text-white" />
                    ) : (
                        <Target className="w-8 h-8 text-white" />
                    )}
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {accountType === "Suppliers" ? "خدماتك وموقعك" : "احتياجاتك التجارية"}
                </h2>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                    {accountType === "Suppliers"
                        ? "حدد خدماتك وموقع عملك لنساعدك في الوصول للعملاء المناسبين"
                        : "أخبرنا عن نوع شركتك واحتياجاتك لنوفر لك أفضل الموردين"
                    }
                </p>
            </motion.div>

            <div className="w-full max-w-4xl space-y-8">
                <FormDropzone<conditionalRegisterSchemaType>
                    control={control}
                    name="documents"
                    label="المستندات"
                    description="قم بتحميل المستندات الداعمة مثل السجل التجاري، الهوية، وغيرها."
                    accept={{ 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg', '.jpeg'] }}
                />

                {/* Location Input */}
                <FormInput<conditionalRegisterSchemaType>
                    control={control}
                    name="location"
                    label="الموقع"
                    placeholder={accountType === "Suppliers" ? "أدخل موقع عملك" : "أدخل موقع شركتك"}
                    Icon={<MapPin className="w-5 h-5 text-gray-500" />}
                />

                {/* Categories/Business Type Section */}
                <motion.div className="space-y-6" variants={itemVariants}>
                    {accountType === "Suppliers" ? (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-indigo-600" />
                                ما هي خدماتك؟
                            </h3>
                            <p className="text-gray-600 mb-6">اختر الخدمات التي تقدمها (يمكنك اختيار أكثر من خدمة)</p>

                            <FormInfiniteMultiCombobox<conditionalRegisterSchemaType, ICategory>
                                control={control}
                                name="categories"
                                label="الخدمات"
                                queryKey={["categories"]}
                                fetchFn={(pageNumber) => getCategories({
                                    page: pageNumber,
                                })}
                                getOptionLabel={(item) => item.categoryName}
                                getOptionValue={(item) => item.categoryId}
                            />

                            {/* Selected Categories Tags */}
                            {selectedCategoryIds.length > 0 && (
                                <motion.div
                                    className="space-y-3"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h4 className="text-sm font-medium text-gray-700">
                                        الخدمات المختارة ({selectedCategoryIds.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCategoryIds.map((categoryId: string | number, index: number) => (
                                            <motion.div
                                                key={`selected-category-${categoryId}`}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                            >
                                                <Badge
                                                    variant="secondary"
                                                    className="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                                                >
                                                    <Tag className="w-3 h-3" />
                                                    <span className="font-medium">
                                                        {/* You'll need to pass the fetched options to get the name */}
                                                        {getCategoryNameById(categoryId)}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className=" p-0 w-4 h-4 ml-1 hover:bg-transparent"
                                                        onClick={() => removeCategory(categoryId)}
                                                    >
                                                        <X className="w-3 h-3 text-indigo-600 hover:text-red-600 transition-colors" />
                                                        <span className="sr-only">إزالة الفئة</span>
                                                    </Button>
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Clear All Button */}
                                    {selectedCategoryIds.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                            onClick={() => setValue("categories", [], {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            })}
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            مسح جميع الفئات
                                        </Button>
                                    )}
                                </motion.div>
                            )}


                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Categories here for Clients */}
                        </div>
                    )}
                </motion.div>

                {/* Benefits Section */}
                <motion.div
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200"
                    variants={itemVariants}
                >
                    <h3 className="font-bold text-indigo-900 text-xl mb-4 flex items-center gap-2">
                        <Star className="w-6 h-6 text-indigo-600" />
                        {accountType === "Suppliers" ? "مميزات الموردين:" : "مميزات العملاء:"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {accountType === "Suppliers" ? (
                            <>
                                {SUPPLIER_BENFITS.map((benefit, index) => (
                                    <div key={index + 'SUPPLIER_BENFITS'} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                        <span className="text-indigo-800">{benefit}</span>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {CLIENT_BENEFITS.map((benefit, index) => (
                                    <div key={index + 'CLIENT_BENEFITS'} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                        <span className="text-indigo-800">{benefit}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}