"use client";
import Header from "@/components/Header";
import Heading from "../utils/Heading";
import { useEffect, useState } from "react";
import DisplayRooms from "@/components/DisplayRooms";
import axios from "axios";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getAllRoom();
    
   
  }, []);
  const getAllRoom = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/get-all-rooms`,
      config
    ); // Adjust the URL as needed
    setRooms(response.data.rooms);
  };
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <Heading
        title={"Room booking app"}
        description={"All about booking room"}
        keywords="booking, hotel, room-rent"
      ></Heading>
      <Header></Header>
      <div className="container mx-auto px-4 justify-between items-center min-h-screen py-6">
        <DisplayRooms rooms={rooms} />
      </div>
    </div>
  );
}
