"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import usePostOrder from "@/hooks/deals/clients/usePostOrder";
import {
  CompleteOrderInput,
  CompleteOrderOutput,
  completeOrderSchema,
  contactInfoSchema,
  deliveryDetailsSchema,
  productDetailsSchema,
} from "@/schemas/orderSchema";
import ProductDetailsStep from "./ProductDetailsStep";
import DeliveryDetailsStep from "./DeliveryDetailsStep";
import ContactInfoStep from "./ContactInfoStep";
import { SLIDER_VARIANTS } from "@/lib/constants";

const defaultValues = {
  categoryId: undefined,
  description: "",
  quantity: 1,
  numSuppliersDesired: 1,
  requiredLocation: "",
  deadline: new Date(),
  contactPersonName: "",
  contactPersonPhone: "",
};

export function OrdersFormV2() {
  const [step, setStep] = useState<number>(0);
  const directionRef = useRef<"next" | "back">("next");
  const { mutate, isPending, error } = usePostOrder();

  const form = useForm<CompleteOrderInput, undefined, CompleteOrderOutput>({
    resolver: zodResolver(completeOrderSchema),
    defaultValues: defaultValues,
  });

  const stepSchemas = useMemo(() => {
    return [productDetailsSchema, deliveryDetailsSchema, contactInfoSchema];
  }, []);

  const totalSteps = stepSchemas.length;
  const isLastStep = step === totalSteps - 1;
  const isFirstStep = step === 0;

  async function handleNext() {
    const currentStepFields = Object.keys(
      stepSchemas[step].shape
    ) as (keyof CompleteOrderOutput)[];

    const isStepValid = await form.trigger(currentStepFields);
    if (isStepValid) {
      directionRef.current = "next";
      setStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    directionRef.current = "back";
    setStep((prev) => Math.max(prev - 1, 0));
  }

  async function onSubmit(values: CompleteOrderOutput) {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        form.reset();
        setStep(0);
      },
    });
  }

  if (error) {
    Object.entries(error.details || {}).forEach(([key, value]) => {
      form.setError(key as keyof CompleteOrderOutput, {
        message: value,
      });
    });
  }

  return (
    <div className="w-full border rounded-2xl " >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full rounded-2xl">
          {/* Main Content Card */}
          <motion.div className="bg-white rounded-2xl shadow-2xl ">
            <fieldset disabled={isPending} className="space-y-8 w-full">
              <div className="relative overflow-hidden ">
                <AnimatePresence custom={directionRef.current} mode="wait">
                  <motion.div
                    key={step}
                    custom={directionRef.current}
                    variants={SLIDER_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className=" inset-0 p-8">
                    {step === 0 && <ProductDetailsStep />}
                    {step === 1 && <DeliveryDetailsStep />}
                    {step === 2 && <ContactInfoStep />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </fieldset>

            <div className="bg-gray-50 px-8 py-6 border-t rounded-2xl">
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="transition  hover:shadow-md disabled:opacity-50">
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>

                {/* Next/Submit Button */}
                {isLastStep ? (
                  <Button
                    key={`submit-${step}`}
                    type="submit"
                    disabled={isPending}
                    className=" bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition hover:shadow-lg">
                    {isPending ? (
                      <>
                        <Spinner />
                        جاري الإنشاء...
                      </>
                    ) : (
                      <>
                        إنشاء الحساب
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    key={`next-${step}`}
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl transition hover:shadow-lg">
                    التالي
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Step Counter */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-500">
                  الخطوة {step + 1} من {totalSteps}
                </span>
              </div>
            </div>
          </motion.div>
        </form>
      </Form>
    </div>
  );
}
