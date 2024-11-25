import AuthCarousel from "@/components/auth-carousel";
import { X } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative text-base flex flex-col lg:flex-row items-center min-h-screen">
      <section className="relative w-full lg:w-[45%] h-[80vh] lg:h-full">
        <AuthCarousel />
      </section>

      <section className="w-full lg:w-[55%] min-h-screen overflow-y-auto flex justify-center items-center relative">
        <div className="absolute top-5 right-10 p-2 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer">
          <Link href="/">
            <X />
          </Link>
        </div>
        <div className="flex items-center min-h-full bg-white w-full">
          {children}
        </div>
      </section>
    </div>
  );
}
