import Header from "@/components/header";
import ChatSupport from "@/components/ui/chat/chat-support";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
      <ChatSupport />
    </>
  );
};

export default DashboardLayout;
