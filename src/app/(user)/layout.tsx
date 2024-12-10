import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatBot from "@/components/chatbot/ChatBot";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
