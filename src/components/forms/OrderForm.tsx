"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import FormInput from "../forms-fields/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import Spinner from "../ui/spinner";
import {
  orderSchema,
  orderSchemaInput,
  orderSchemaOutput,
} from "@/schemas/orderSchema";
import usePostOrder from "@/hooks/deals/clients/usePostOrder";
import { format } from "date-fns";
import FormDatePicker from "../forms-fields/FormDatePicker";
import FormTextArea from "../forms-fields/FormTextArea";
import { getCategories } from "@/services/categoriesServices";
import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  User,
  Users,
  Grid3X3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import FormInfiniteCombobox from "../forms-fields/FormInfiniteCombobox";
import { setFormErrors } from "@/utils/handleApiError";

const defaultValues = {
  contactPersonName: "",
  contactPersonPhone: "",
  deadline: new Date(),
  description: "",
  numSuppliersDesired: 0,
  requiredLocation: "",
  categoryId: 0,
};

const formSteps = [
  {
    id: 1,
    title: "تفاصيل المنتج",
    fields: ["categoryId", "description", "quantity"],
  },
  {
    id: 2,
    title: "التسليم والمواصفات",
    fields: ["requiredLocation", "deadline", "numSuppliersDesired"],
  },
  {
    id: 3,
    title: "معلومات التواصل",
    fields: ["contactPersonName", "contactPersonPhone"],
  },
];

export default function OrderForm() {
  const { isPending, mutate } = usePostOrder();
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<orderSchemaInput, undefined, orderSchemaOutput>({
    resolver: zodResolver(orderSchema),
    defaultValues: defaultValues,
  });

  const watchedValues = form.watch();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calculate progress
  const totalFields = Object.keys(defaultValues).length;
  const filledFields = Object.entries(watchedValues).filter(([key, value]) => {
    if (key === "deadline") return value instanceof Date;
    if (typeof value === "number") return value > 0;
    if (typeof value === "string") return value.trim() !== "";
    return !!value;
  }).length;
  const progress = (filledFields / totalFields) * 100;

  // Check current step completion
  const currentStepFields =
    formSteps.find((step) => step.id === currentStep)?.fields || [];
  const isCurrentStepComplete = currentStepFields.every((field) => {
    const value = watchedValues[field as keyof typeof watchedValues];
    if (field === "deadline") return value instanceof Date;
    if (typeof value === "number") return value > 0;
    if (typeof value === "string") return value.trim() !== "";
    return !!value;
  });

  function onSubmit(values: orderSchemaOutput) {
    const dataOfDeadline = format(
      values.deadline,
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    );
    mutate(
      { ...values, deadline: dataOfDeadline },
      {
        onSuccess: () => {
          form.reset();
          setCurrentStep(1);
        },
        onError: (err) => {
          setFormErrors(form, err);
        },
      }
    );
  }

  const nextStep = () => {
    if (currentStep < 3 && isCurrentStepComplete) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
        {/* Header Section */}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                تقدم النموذج
              </span>
              <span className="text-sm font-bold text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
              {formSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    index < formSteps.length - 1 ? "flex-1" : ""
                  }`}>
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${
                      currentStep >= step.id
                        ? "bg-indigo-500 border-indigo-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }
                  `}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="mr-3">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-indigo-600"
                          : "text-gray-400"
                      }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < formSteps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        currentStep > step.id ? "bg-indigo-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} dir="rtl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Step 1: Product Details */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Grid3X3 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        تفاصيل المنتج
                      </h3>
                      <p className="text-gray-600">
                        حدد نوع المنتج والكمية المطلوبة
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormInfiniteCombobox<orderSchemaInput, ICategory>
                        name="categoryId"
                        queryKey={["categories"]}
                        fetchFn={(page, search) =>
                          getCategories({ page, search })
                        }
                        getOptionLabel={(item) => item.categoryName}
                        getOptionValue={(item) => String(item.categoryId)}
                        label="الفئة المطلوبة"
                        placeholder="اختر فئة المنتج..."
                      />
                      <div className="md:col-span-2">
                        <FormTextArea<orderSchemaInput>
                          control={form.control}
                          name="description"
                          placeholder="وصف تفصيلي للمنتج المطلوب..."
                          label="وصف الطلب"
                        />
                      </div>

                   
                      <FormInput<orderSchemaInput>
                        control={form.control}
                        name="numSuppliersDesired"
                        placeholder="عدد الموردين..."
                        type="number"
                        label="عدد الموردين المطلوب"
                        Icon={<Users className="w-5 h-5" />}
                        min={1}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery & Specifications */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        التسليم والمواصفات
                      </h3>
                      <p className="text-gray-600">
                        حدد مكان وموعد التسليم المطلوب
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:col-span-2">
                        <FormInput<orderSchemaInput>
                          control={form.control}
                          name="requiredLocation"
                          placeholder="مكان التسليم المطلوب..."
                          label="الموقع المطلوب للتسليم"
                          type="text"
                          Icon={<MapPin className="w-5 h-5" />}
                        />
                      </div>

                      <FormDatePicker<orderSchemaInput>
                        control={form.control}
                        name="deadline"
                        placeholder="اختر تاريخ التسليم..."
                        label="موعد التسليم"
                        type="date"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Information */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        معلومات التواصل
                      </h3>
                      <p className="text-gray-600">أدخل بياناتك للتواصل معك</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormInput<orderSchemaInput>
                        control={form.control}
                        name="contactPersonName"
                        placeholder="اسم الشخص المسؤول..."
                        label="اسم مقدم الطلب"
                        type="text"
                        Icon={<User className="w-5 h-5" />}
                      />
                      <FormInput<orderSchemaInput>
                        control={form.control}
                        name="contactPersonPhone"
                        placeholder="رقم الهاتف للتواصل..."
                        type="tel"
                        dir="rtl"
                        label="رقم الهاتف"
                        Icon={<Phone className="w-5 h-5" />}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-8 py-3 rounded-xl border-2 transition-all duration-300 ${
                      currentStep === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50 hover:border-gray-300"
                    }`}>
                    السابق
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isCurrentStepComplete}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isCurrentStepComplete
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}>
                      التالي
                      <ArrowRight className="w-5 h-5 mr-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isPending || !isCurrentStepComplete}
                      className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <Spinner />
                          <span>جاري الإرسال...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>إرسال الطلب</span>
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
