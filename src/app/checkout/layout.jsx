"use client";
import Header from "@/components/Header";
import Protected from "@/hooks/useProtected";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <Protected>
        <Header></Header>
        <main>{children}</main>
      </Protected>
    </>
  );
};

// Export the layout component as the default export
export default layout;
