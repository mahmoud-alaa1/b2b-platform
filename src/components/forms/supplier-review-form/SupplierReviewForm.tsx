"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  supplierReviewSchema,
  supplierReviewSchemaInput,
  supplierReviewSchemaOutput,
} from "@/schemas/supplierReviewsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "@/components/forms-fields/FormInput";
import FormTextArea from "@/components/forms-fields/FormTextArea";
import FormDatePicker from "@/components/forms-fields/FormDatePicker";
import {
  Star,
  Package,
  DollarSign,
  MessageSquare,
  MapPin,
  Hash,
  Send,
  Award,
  TrendingUp,
} from "lucide-react";
import useSupplierReview from "@/hooks/reviews/useSupplierReview";
import FormRating from "@/components/forms-fields/FormRating";
import { setFormErrors } from "@/utils/handleApiError";

export default function SupplierReviewForm({
  dealId,
}: {
  dealId: string | number;
}) {
  const { mutate: submitReview, isPending } = useSupplierReview({
    dealId,
  });

  const form = useForm<
    supplierReviewSchemaInput,
    undefined,
    supplierReviewSchemaOutput
  >({
    resolver: zodResolver(supplierReviewSchema),
    defaultValues: {
      dealDoneAt: "",
      quantity: 1,
      price: 1,
      dateOfDelivered: new Date(),
      rating: 5,
      comment: "",
    },
  });

  const watchedPrice = Number(form.watch("price"));
  const watchedQuantity = Number(form.watch("quantity"));

  const totalValue = watchedPrice * watchedQuantity;

  async function onSubmit(values: supplierReviewSchemaOutput) {
    console.log(values);
    submitReview(values, {
      onSuccess: () => {
        form.reset();
      },
      onError: (err) => {
        setFormErrors(form, err);
      },
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r p-2 from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          تقييم التعامل مع العميل
        </h1>
        <p className="text-gray-600 p-2">
          شارك تجربتك مع هذا العميل لمساعدة الآخرين في اتخاذ قرارات أفضل
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isPending} className="space-y-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      معلومات الصفقة
                    </h3>
                    <p className="text-sm text-gray-600">
                      تفاصيل التعامل التجاري
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 ">
                  <FormInput
                    control={form.control}
                    name="dealDoneAt"
                    label="مكان إتمام الصفقة"
                    placeholder="مثال: سوهاج شارع 15"
                    Icon={<MapPin className="w-4 h-4" />}
                    description="أدخل المكان الذي تمت فيه الصفقة"
                    className="bg-white"
                  />

                  <FormDatePicker
                    control={form.control}
                    name="dateOfDelivered"
                    label="تاريخ التسليم"
                    placeholder="اختر تاريخ التسليم"
                  />

                  <FormInput
                    control={form.control}
                    name="quantity"
                    label="الكمية"
                    placeholder="1"
                    type="number"
                    Icon={<Hash className="w-4 h-4" />}
                    description="عدد الوحدات المطلوبة"
                    className="bg-white"
                    min={1}
                    max={2147483647}
                  />

                  <FormInput
                    control={form.control}
                    name="price"
                    label="السعر للوحدة الواحدة (ج.م)"
                    placeholder="0.00"
                    type="number"
                    Icon={<DollarSign className="w-4 h-4" />}
                    description="سعر الوحدة الواحدة"
                    className="bg-white"
                    min={1}
                    max={2147483647}
                  />
                </div>

                {totalValue > 0 && (
                  <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        إجمالي قيمة الصفقة:
                      </span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-lg font-bold text-green-600">
                          {totalValue.toLocaleString("ar-SA")} ج.م
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      التقييم العام
                    </h3>
                    <p className="text-sm text-gray-600">
                      ما مدى رضاك عن التعامل؟
                    </p>
                  </div>
                </div>

                <FormRating name="rating" showText={false} />
              </CardContent>
            </Card>

            {/* Comment Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">تعليقك</h3>
                    <p className="text-sm text-gray-600">شارك تفاصيل تجربتك</p>
                  </div>

                  <p></p>
                </div>

                <FormTextArea
                  control={form.control}
                  name="comment"
                  label="تفاصيل التجربة"
                  placeholder="اكتب تفاصيل تجربتك مع هذا المورد، مثل جودة المنتج، سرعة التسليم، التعامل، إلخ..."
                  description="كن صادقاً وموضوعياً في تقييمك. اذكر النقاط الإيجابية والسلبية لتكون مفيداً للآخرين."
                  rows={100}
                />
              </CardContent>
            </Card>

            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]">
                {isPending ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    إرسال التقييم
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                تقييمك سيساعد في بناء مجتمع تجاري موثوق وشفاف 🤝
              </p>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
