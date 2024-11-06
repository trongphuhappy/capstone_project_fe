import AuthCarousel from "@/components/auth-carousel";
import { X } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative text-base flex items-center">
      <section className="fixed top-0 h-screen w-[45%]">
        <AuthCarousel />
      </section>
      <section className="absolute w-[55%] h-screen top-0 right-0 flex-1">
        <div className="absolute top-5 right-10 p-2 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer">
          <Link href="/">
            <X />
          </Link>
        </div>
        <div className="flex items-center min-h-full bg-white">{children}</div>
      </section>
    </div>
  );
}
