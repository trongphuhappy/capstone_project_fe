import Home from "@/app/page";
import ActiveAuthSignup from "@/app/active/active-auth-signup/components/active-auth-signup";

export default function ActiveAuthSignupPage({ params }: any) {
  return (
    <div>
      <ActiveAuthSignup email={decodeURIComponent(params?.email)}>
        <Home />
      </ActiveAuthSignup>
    </div>
  );
}
