// app/room-details/layout.jsx
import Header from "@/components/Header";
import React from "react";

const RoomDetailsLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};

export default RoomDetailsLayout;
