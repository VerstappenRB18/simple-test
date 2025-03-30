// app/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Acme</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-center max-w-md">
        A simple authentication and dashboard system built with Next.js, Tailwind CSS, and MongoDB.
      </p>
      <button
        onClick={() => router.push("/login")}
        className="rounded bg-black px-6 py-2 text-white hover:bg-gray-800"
      >
        Go to Login
      </button>
    </div>
  );
}
