"use client";
import FormInput from "../forms-fields/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import FormCheckbox from "../forms-fields/FormCheckbox";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import FormPassword from "../forms-fields/FormPassword";
import Link from "next/link";
import { loginSchema } from "@/schemas/authSchema";
import useLogin from "@/hooks/useLogin";
import Spinner from "../ui/spinner";


export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });
  function onSubmit(values: loginSchema) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        dir="ltr"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormInput<loginSchema>
          control={form.control}
          name="email"
          placeholder="البريد الإلكتروني"
          Icon={<Mail className="size-4 text-indigo-500" />}
        />
        <FormPassword<loginSchema>
          control={form.control}
          name="password"
          placeholder="كلمة المرور"
        />
        <div className="flex justify-between">
          <Link
            href="/auth/forgot-password"
            className="text-indigo-500 hover:underline"
          >
            نسيت كلمة المرور؟
          </Link>
          <FormCheckbox<loginSchema>
            control={form.control}
            name="rememberMe"
            label="تذكرني"
          />
        </div>
        <Button
          disabled={isPending}
          className="w-full text-white py-2 rounded transition-colors"
        >
          {isPending ? <Spinner /> : "تسجيل الدخول"}
        </Button>
      </form>
    </Form>
  );
}
