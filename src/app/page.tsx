import HomePage from "@/app/(user)/homepage/components/home-component";
import UserLayout from "@/app/(user)/layout";

export default function Home() {
  return (
    <UserLayout>
      <HomePage />
    </UserLayout>
  );
}
