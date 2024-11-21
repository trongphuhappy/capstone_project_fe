import { Metadata } from "next";
import Admin from "./components/dashboard";


export const metadata: Metadata = {
  title: "Admin",
  description: "Admin for Neightbor",
};

export default function HomePage() {
  return (
    <div>
      <Admin />
    </div>
  );
}
