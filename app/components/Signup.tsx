// components/SignupForm.tsx
"use client";

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { BsSun, BsMoon, BsEye, BsEyeSlash } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const criteria = {
    hasUpperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
    hasMinLength: password.length >= 8,
    hasNumber: /\d/.test(password),
  };

  const allValid = name && email && Object.values(criteria).every(Boolean);

  useEffect(() => {
    const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || (!savedTheme && systemPref);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      alert("Account created successfully!");
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="mt-4 mb-6 flex flex-col items-center">
        <span className="text-3xl font-bold">▲</span>
        <h1 className="text-2xl font-semibold">Acme</h1>
      </div>

      <div className="w-full max-w-md rounded-xl border p-8 mb-6 shadow-sm dark:border-gray-700">
        <h2 className="mb-2 text-xl font-semibold">Sign up</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Already have an account? <a href="/login" className="font-medium underline">Log in</a>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 pr-10 text-sm shadow-sm focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            <ul className="mt-2 space-y-1 pl-5 text-xs">
              <li className={criteria.hasUpperLower ? "text-green-500" : "text-gray-500 dark:text-gray-400"}>
                <AiOutlineCheck className="inline mr-1" /> Mix of uppercase & lowercase letters
              </li>
              <li className={criteria.hasMinLength ? "text-green-500" : "text-gray-500 dark:text-gray-400"}>
                <AiOutlineCheck className="inline mr-1" /> Minimum 8 characters long
              </li>
              <li className={criteria.hasNumber ? "text-green-500" : "text-gray-500 dark:text-gray-400"}>
                <AiOutlineCheck className="inline mr-1" /> Contain at least 1 number
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={!allValid || loading}
            className={`w-full rounded px-4 py-2 text-white ${allValid ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-between">
          <hr className="w-1/3 border-gray-300 dark:border-gray-600" />
          <span className="text-xs text-gray-400">Or continue with</span>
          <hr className="w-1/3 border-gray-300 dark:border-gray-600" />
        </div>

        <div className="flex flex-col gap-2">
          <button className="flex w-full items-center justify-center gap-2 rounded border px-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-800">
            <FcGoogle className="text-lg" /> Google
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded border px-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-800">
            <FaMicrosoft className="text-blue-600 text-lg" /> Microsoft
          </button>
        </div>

        <div className="mt-6 rounded-b-xl border-t pt-4 text-center text-xs text-gray-400 dark:border-gray-700">
          By signing up, you agree to our <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.<br />
          Need help? <a href="#" className="underline">Get in touch.</a>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-4 right-4 rounded-full border p-2 shadow-md dark:border-gray-500 dark:bg-gray-700"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {darkMode ? <BsSun /> : <BsMoon />}
      </button>
    </div>
  );
}
