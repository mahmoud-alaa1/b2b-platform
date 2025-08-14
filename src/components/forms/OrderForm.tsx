"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import FormInput from "../forms-fields/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import Spinner from "../ui/spinner";
import { orderSchema, orderSchemaInput, orderSchemaOutput } from "@/schemas/orderSchema";
import { useOrderForm } from "@/store/orderFormStore";
import usePostOrder from "@/hooks/usePostOrder";
import { useEffect } from "react";
import { format } from "date-fns";
import FormDatePicker from "../forms-fields/FormDatePicker";
import FormTextArea from "../forms-fields/FormTextArea";
import FormInfiniteSelect from "../forms-fields/FormInfiniteSelect";
import { getCategories } from "@/services/categoriesServices";

// ✅ هنا نترك TypeScript يستدل على النوع تلقائياً
const defaultValues = {
  contactPersonName: "",
  contactPersonPhone: "",
  quantity: 0,
  deadline: new Date(),
  description: "",
  numSuppliersDesired: 0,
  requiredLocation: "",
  categoryId: 0,
};

export default function OrderForm() {
  const { formData, setFormData, clearFormData } = useOrderForm();
  const { isPending, mutate } = usePostOrder();

  const form = useForm<orderSchemaInput, undefined, orderSchemaOutput>({
    resolver: zodResolver(orderSchema),
    defaultValues: formData || defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      setFormData(data as orderSchema);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormData]);

  function onSubmit(values: orderSchemaOutput) {
    const dataOfDeadline = format(
      values.deadline,
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    );
    mutate(
      { ...values, deadline: dataOfDeadline },
      {
        onSuccess: () => {
          clearFormData();
          form.reset();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 md:p-10 border-primary/50 border my-16 rounded-xl shadow-2xl bg-white mx-auto max-w-5xl rtl space-y-8"
        dir="rtl"
      >
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            قدم طلب المنتج الخاص بك
          </h2>

          <p className="text-gray-500 text-sm">
            يرجى تعبئة جميع الحقول لإرسال طلبك إلى الموردين المناسبين.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInfiniteSelect<orderSchemaInput, ICategory>
            control={form.control}
            name="categoryId"
            queryKey={["categories"]}
            fetchFn={(page) =>
              getCategories({
                page,
              })
            }
            getOptionLabel={(item) => item.categoryName}
            getOptionValue={(item) => String(item.categoryId)}
            label=" الفئة المطلوبة"
            placeholder="مثال: أثاث فندقي"
          />

          <FormInput<orderSchemaInput>
            control={form.control}
            name="numSuppliersDesired"
            placeholder="مثال: 10"
            type="number"
            label="عدد الموردين المطلوب التفاوض معهم"
          />

          <div className="md:col-span-2">
            <FormTextArea<orderSchemaInput>
              control={form.control}
              name="description"
              placeholder="مثال: عدد 1500 مقاعد صناعية لقاعه الاستقبال فى الفندق"
              label="وصف الطلب"
            />
          </div>

          <FormInput<orderSchemaInput>
            control={form.control}
            name="quantity"
            placeholder=" مثال: 10"
            type="number"
            label="الكمية المطلوبة"
          />

          <FormInput<orderSchemaInput>
            control={form.control}
            name="contactPersonName"
            placeholder="مثال: محمد احمد"
            label="اسم المقدم الطلب"
            type="text"
          />

          <FormInput<orderSchemaInput>
            control={form.control}
            name="requiredLocation"
            placeholder="مثال: القاهرة - مدينة نصر"
            label="الموقع المطلوب للتسليم"
            type="text"
          />

          <FormInput<orderSchemaInput>
            control={form.control}
            name="contactPersonPhone"
            placeholder=" مثال: 0123456789"
            type="tel"
            dir="rtl"
            label="رقم الهاتف للتواصل"
          />
          <FormDatePicker<orderSchemaInput>
            control={form.control}
            name="deadline"
            placeholder="مثال: 2024-01-01"
            label="موعد التسليم"
            type="date"
          />
        </div>
        <Button
          disabled={isPending}
          className="md:w-fit w-full py-3 rounded text-white font-medium text-md bg-primary  cursor-pointer transition"
        >
          {isPending ? <Spinner /> : "إرسال الطلب"}
        </Button>
      </form>
    </Form>
  );
}