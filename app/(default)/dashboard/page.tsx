import Dashboard from "@/app/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Testing Page",
};

export default function DashboardPage() {
  return <Dashboard />;
}