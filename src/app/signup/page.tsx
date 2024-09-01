"use client";
import { FormEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/lib/actions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [formState, formAction] = useFormState(signup, {
    error: null,
    message: "",
  });
  const { pending } = useFormStatus();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (formState.error == null) return;
    if (formState.error) toast.error(formState.message);
    else {
      toast.success(formState.message);
      setTimeout(() => (window.location.href = "/verify-email"), 1000);
    }
  }, [formState]);

  const inputClass =
    "w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 outline-none invalid:border-red-800";

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <form
        action={formAction}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md flex flex-col items-center gap-6 border border-gray-600"
      >
        <h1 className="text-3xl font-bold text-white">Sign Up</h1>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="name">
            <span className="text-red-500 mr-1">*</span>
            First Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name..."
            required
            autoFocus
            minLength={3}
            maxLength={20}
            pattern="^[a-zA-Z]+$"
            title="Name should only contain letters"
            className={inputClass}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="middlename">
            Middle Name
          </label>
          <input
            type="text"
            name="middlename"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
            placeholder="Middle Name..."
            minLength={3}
            maxLength={20}
            pattern="^[a-zA-Z]+$"
            title="Name should only contain letters"
            className={inputClass}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="lastname">
            <span className="text-red-500 mr-1">*</span>
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name..."
            required
            minLength={3}
            maxLength={20}
            pattern="^[a-zA-Z]+$"
            title="Last name should only contain letters"
            className={inputClass}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="username">
            <span className="text-red-500 mr-1">*</span>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={`${name}${middlename ? `-${middlename[0]}` : ""}${lastname ? `-${lastname}` : ""}`.toLowerCase()}
            placeholder="Username (auto-generated)"
            readOnly
            required
            className={inputClass}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="email">
            <span className="text-red-500 mr-1">*</span>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            required
            pattern="^[a-zA-Z0-9._+-]+\@[a-zA-Z0-9.-]+\.[a-z]{2,}$"
            title="Only Gmail is accepted for now!"
            className={inputClass}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="password">
            <span className="text-red-500 mr-1">*</span>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password..."
              required
              minLength={8}
              title="Password should be at least 8 characters long"
              className={inputClass}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 text-gray-400" />
              ) : (
                <EyeIcon className="w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="password">
            <span className="text-red-500 mr-1">*</span>
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Password..."
            required
            minLength={8}
            title="Password should match the previous one"
            className={inputClass}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="gender">
            Gender
          </label>
          <select name="gender" className={inputClass}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button
          disabled={
            pending || formState.error === false || password !== confirmPassword
          }
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition duration-300 disabled:bg-gray-600"
          type="submit"
          onClick={(event: FormEvent) => {
            if (pending) {
              event.preventDefault();
            }
          }}
        >
          Sign Up
        </button>
        <Link href="/login" className="font-normal underline text-blue-400">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
