// app/login/page.tsx
import LoginForm from "@/app/components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Testing Page",
};

export default function LoginPage() {
  return <LoginForm />;
}
