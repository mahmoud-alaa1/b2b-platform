'use client';

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  registerSchemaType,
  fullRegisterSchema,
  stepSchemas,
} from "@/schemas/authSchema";

import RegistersSteps from "./RegistersSteps";
import { Step1Type } from "./Step1Type";
import Step2BasicInfo from "./Step2BasicInfo";
import { Step3TypeInfo } from "./Step3TypeInfo";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Spinner from "@/components/ui/spinner";
const slideVariants = {
  enter: (dir: "next" | "back") => ({
    x: dir === "next" ? 400 : -400,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: "next" | "back") => ({
    x: dir === "next" ? -400 : 400,
    opacity: 0,
    scale: 0.95,
  }),
};



export function MultiStepForm() {
  const [step, setStep] = useState<number>(0);
  const directionRef = useRef<"next" | "back">("next");

  const totalSteps = stepSchemas.length;
  const isLastStep = step === totalSteps - 1;
  const isFirstStep = step === 0;

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(fullRegisterSchema),
    mode: "onSubmit",
    reValidateMode: "onChange", 
    defaultValues: {
      accountType: "Clients",
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      location: '',
      categories: [],
      documents: [],
    },
  });


  async function handleNext() {
    const currentStepFields = Object.keys(stepSchemas[step].shape) as (keyof registerSchemaType)[];

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

  async function onSubmit(values: registerSchemaType) {
    console.log("Submitted values:", values);

  }


  return (
    <div className="max-w-4xl  p-6" dir="rtl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">


          {/* Main Content Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl "
            layout
          >
            <RegistersSteps step={step} />


            <div className="relative w-[clamp(350px,95vw,600px)] min-h-[500px] overflow-hidden ">
              <AnimatePresence custom={directionRef.current} mode="wait">
                <motion.div
                  key={step}
                  custom={directionRef.current}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className=" inset-0 p-8"
                  layout
                >
                  {step === 0 && <Step1Type />}
                  {step === 1 && <Step2BasicInfo />}
                  {step === 2 && <Step3TypeInfo />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="bg-gray-50 px-8 py-6 border-t">
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="transition  hover:shadow-md disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>



                {/* Next/Submit Button */}
                {isLastStep ? (
                  <Button
                    type="submit"
                    disabled={false}
                    className=" bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition hover:shadow-lg"
                  >
                    {false ? (
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
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl transition  hover:shadow-lg"
                  >
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
