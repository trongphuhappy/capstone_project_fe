import LoginForm from "@/app/(auth)/login/components/login-form";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log In for PawFund",
};

export default function LoginPage() {
  return (
    <div className="w-full">
      <LoginForm />
    </div>
  )
}
