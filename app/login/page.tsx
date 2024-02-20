"use client";

import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "../utils/validationSchema";
import { z } from "zod";

type user = z.infer<typeof userLoginSchema>;

const LoginUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<user>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen place-items-center justify-center align-middle">
      <div className="bg-white py-10 px-12 rounded-2xl flex flex-col">
        <h2 className="text-center text-xl font-bold py-3 px-20">
          Login to your account
        </h2>

        <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-3">
            <label
              className="label font-medium text-base py-[2px]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-sm mt-1 text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="pt-3">
            <label
              className="label font-medium text-base py-[2px]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Password"
              maxLength={50}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-sm mt-1 text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex pt-3 space-x-2">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Rememer me</label>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-7">
            Login
          </button>

          <p className="text-sm font-medium text-center mt-7">
            New to Help-Desk?{" "}
            <Link href="/register" className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginUserPage;
