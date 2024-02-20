"use client";

import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";

const RegisterUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen place-items-center justify-center align-middle">
      <div className="bg-white py-10 px-12 rounded-2xl flex flex-col">
        <h2 className="text-center text-xl font-bold py-3 px-20">
          Create Account
        </h2>

        <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label
              className="label font-medium text-base py-[2px]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Name"
              className="input input-bordered w-full"
            />
          </div>

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
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex pt-3 space-x-2">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Rememer me</label>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-7">
            Sign Up
          </button>

          <p className="text-sm font-medium text-center mt-7">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterUserPage;
