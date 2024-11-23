import { Metadata } from "next";
import AdminManageProduct from "./components/manage-products";

export const metadata: Metadata = {
  title: "Manage Products",
  description: "Manage Products for Neightbor",
};

export default function HomePage() {
  return (
    <div>
     <AdminManageProduct />
    </div>
  );
}
