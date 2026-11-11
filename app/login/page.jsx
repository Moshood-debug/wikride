"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Eye, EyeOff, Car } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAuthStore } from "@/store/useAuthStore";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useApiMutation("/auth/login", "post");
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          setAuth(response.data.data);
          setLoginSuccess(true);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        },
        onError: (error) => {
          setLoginError(error);
          setLoginSuccess(false);
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md surface p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="h-9 w-9 rounded-xl bg-brand-blue text-white flex items-center justify-center">
              <Car size={18} />
            </span>
            <span className="text-base font-semibold tracking-tight text-primary-accent">
              Wikride
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-primary-accent tracking-tight">
            Sign in
          </h1>
          <p className="text-sm text-text-gray mt-1">
            Access is restricted to authorized company personnel only.
          </p>
        </div>

        {loginSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm">
            <p className="font-semibold">Authentication approved</p>
            <p className="text-emerald-700/80 mt-0.5">
              Redirecting you to the dashboard...
            </p>
          </div>
        ) : (
          <form suppressHydrationWarning onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs font-medium space-y-1">
                <p>{loginError.message}</p>
                {loginError.attempts_remaining !== undefined &&
                  loginError.attempts_remaining !== null && (
                    <p className="text-rose-600/80">
                      Attempts remaining: {loginError.attempts_remaining}
                    </p>
                  )}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-primary-accent" htmlFor="email">
                Work email address
              </label>
              <input
                suppressHydrationWarning
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`field ${errors.email ? "border-red-300 bg-red-50" : ""}`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs font-medium mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-primary-accent" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => console.log("Forgot password clicked")}
                  className="text-xs text-brand-blue hover:underline font-medium transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  suppressHydrationWarning
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`field pr-10 ${errors.password ? "border-red-300 bg-red-50" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-text-gray transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs font-medium mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button type="submit" disabled={isPending} className="btn-primary w-full h-11">
                {isPending ? (
                  <Loader2 className="animate-spin text-white/80" size={16} />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
