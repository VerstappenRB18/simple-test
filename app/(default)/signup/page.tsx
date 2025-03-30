import SignupForm from "@/app/components/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup | Testing Page",
};

export default function SignupPage() {
  return <SignupForm />;
}