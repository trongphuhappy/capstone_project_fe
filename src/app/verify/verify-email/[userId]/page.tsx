import Home from "@/app/page";
import VerifyEmail from "@/app/verify/verify-email/components/verify-email";

export default function VerifyEmailPage({ params }: any) {
  return (
    <div>
      <VerifyEmail userId={decodeURIComponent(params?.userId)}>
        <Home />
      </VerifyEmail>
    </div>
  );
}
