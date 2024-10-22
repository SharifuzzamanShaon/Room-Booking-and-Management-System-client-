import Header from "@/components/Header";
import Protected from "@/hooks/useProtected";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Protected>
        <Header />
        <main>{children}</main>
      </Protected>
    </div>
  );
};

export default layout;
