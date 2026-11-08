
"use client";

import { Button } from "@/components/atomics/button";
import { Checkbox } from "@/components/atomics/checkbox";
import { Input } from "@/components/atomics/input";
import Title from "@/components/atomics/title";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/atomics/form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/atomics/use-toast";
import { useLoginMutation } from "@/services/auth.service";
import { signIn } from "next-auth/react";
import { Suspense } from "react";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

type FormData = yup.InferType<typeof schema>;

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  async function onSubmit(values: FormData) {
    try {
      const res = await login(values).unwrap();

      if (res.success) {
        const user = res.data;

        const loginRes = await signIn("credentials", {
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token,
          callbackUrl: searchParams.get("callbackUrl") || "/",
          redirect: false,
        });

        toast({
          title: "Selamat datang!",
          description: "Berhasil masuk ke akun Singgahna.",
          open: true,
        });

        router.push(loginRes?.url || "/");
      }
    } catch (error: any) {
      toast({
        title: "Login gagal",
        description:
          error?.data?.message || "Email atau password tidak sesuai.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F5F2E9] px-6 py-24 lg:px-28">

      {/* Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-1/2 bg-[url('/images/hero-kos2.jpg')] bg-cover bg-center bg-no-repeat lg:block"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2E9] via-[#F5F2E9]/50 to-transparent" />
      </div>

      {/* Sign In Form */}
      <div className="relative z-10 w-full">
        <div className="flex max-w-full flex-col items-center space-y-[30px] rounded-[30px] border border-[#E6E9E0] bg-white p-8 shadow-[0px_15px_40px_rgba(38,58,50,0.08)] lg:min-w-[460px] lg:max-w-[460px]">

          {/* Logo */}
          <Image
            src="/images/singgahna2.png"
            alt="Singgahna"
            width={90}
            height={72}
            className="h-[72px] w-[90px] object-contain"
            priority
          />

          {/* Title */}
          <Title
            title="Selamat Datang Kembali"
            subtitle="Masuk ke akun Singgahna untuk menemukan kos impianmu."
            section=""
          />

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-[30px]"
            >
              <div className="space-y-5">

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Email Address"
                          icon="/icons/sms.svg"
                          variant="auth"
                          className={
                            form.formState.errors.email
                              ? "border-destructive"
                              : "border-[#E2E8DC] focus-visible:ring-[#8A9B76]"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          icon="/icons/lock-circle.svg"
                          variant="auth"
                          className={
                            form.formState.errors.password
                              ? "border-destructive"
                              : "border-[#E2E8DC] focus-visible:ring-[#8A9B76]"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-[21px] text-[#52635A] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#263A32] text-white shadow-[0px_6px_15px_rgba(38,58,50,0.15)] hover:bg-[#354C41]"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>

                <Link href="/sign-up" className="block">
                  <Button
                    variant="third"
                    type="button"
                    className="w-full border border-[#E2E8DC] text-[#263A32] hover:bg-[#E8EDDF]"
                  >
                    Create New Account
                  </Button>
                </Link>
              </div>
            </form>
          </Form>

        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SignInContent />
    </Suspense>
  );
}