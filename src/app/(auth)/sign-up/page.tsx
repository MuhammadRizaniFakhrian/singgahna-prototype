
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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/atomics/use-toast";
import { useRegisterMutation } from "@/services/auth.service";
import { signIn } from "next-auth/react";

const schema = yup.object().shape({
  name: yup.string().min(5).required(),
  phone: yup.string().min(10).max(12).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

type FormData = yup.InferType<typeof schema>;

function SignUp() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();

  async function onSubmit(values: FormData) {
    try {
      const res = await register({
        ...values,
        password_confirmation: values.password,
      }).unwrap();

      if (res.success) {
        const user = res.data;

        await signIn("credentials", {
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token,
          redirect: false,
        });

        toast({
          title: "Pendaftaran berhasil!",
          description: "Selamat datang di Singgahna.",
          open: true,
        });

        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Pendaftaran gagal",
        description:
          error?.data?.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F5F2E9] px-6 py-16 lg:px-28">

      {/* Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-1/2 bg-[url('/images/hero-kos2.jpg')] bg-cover bg-center bg-no-repeat lg:block"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2E9] via-[#F5F2E9]/50 to-transparent" />
      </div>

      {/* Sign Up Form */}
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
            title="Buat Akun Baru"
            subtitle="Bergabung dengan Singgahna dan temukan kos yang sesuai dengan kebutuhanmu."
            section=""
          />

          {/* Registration Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-[30px]"
            >
              <div className="space-y-5">

                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nama Lengkap"
                          icon="/icons/profile.svg"
                          variant="auth"
                          className={
                            form.formState.errors.name
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

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nomor Telepon"
                          icon="/icons/call.svg"
                          variant="auth"
                          className={
                            form.formState.errors.phone
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

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Alamat Email"
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

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Kata Sandi"
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

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-[21px] text-[#52635A] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Saya menyetujui syarat dan ketentuan
                </label>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#263A32] text-white shadow-[0px_6px_15px_rgba(38,58,50,0.15)] hover:bg-[#354C41]"
                >
                  {isLoading ? "Mendaftarkan..." : "Daftar"}
                </Button>

                <Link href="/sign-in" className="block">
                  <Button
                    variant="third"
                    type="button"
                    className="w-full border border-[#E2E8DC] text-[#263A32] hover:bg-[#E8EDDF]"
                  >
                    Masuk ke Akun Saya
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

export default SignUp;
