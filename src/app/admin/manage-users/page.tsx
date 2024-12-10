import { Metadata } from "next";
import AdminManageUsers from "./components/manage-users";


export const metadata: Metadata = {
  title: "Manage Products",
  description: "Manage Products for Neightbor",
};

export default function HomePage() {
  return (
    <div>
     <AdminManageUsers />
    </div>
  );
}
