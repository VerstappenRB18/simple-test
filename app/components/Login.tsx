"use client";

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("loggedIn", "true"); // Save login status
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
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

      <div className="w-full max-w-md rounded-xl border p-8 shadow-sm dark:border-gray-700">
        <h2 className="mb-2 text-xl font-semibold">Log in</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Enter your details below to sign into your account.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
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
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Password</label>
              <a href="#" className="text-sm text-gray-600 hover:underline dark:text-gray-300">
                Forgot your password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800"
              required
            />
          </div>

          {error && (
            <div className="rounded bg-red-100 px-4 py-2 text-sm text-red-700 dark:bg-red-800 dark:text-red-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2.25m0 3.75h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            {loading ? "Logging in..." : "Log in"}
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

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <a href="/signup" className="font-medium underline">
            Sign up
          </a>
        </p>
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
