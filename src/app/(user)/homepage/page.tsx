import { Metadata } from "next";
import HomeComponent from "@/app/(user)/homepage/components/home-component";

export const metadata: Metadata = {
  title: "Neightbor",
  description: "Home page for Neightbor",
};

export default function HomePage() {
  return (
    <div>
      <HomeComponent />
    </div>
  );
}
