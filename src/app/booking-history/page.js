"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [refreshBookingHistor, setRefreshBookingHistory] = useState(false);
  useEffect(() => {
    getBookingHistory();
  }, [refreshBookingHistor]);
  const getBookingHistory = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/book-room-by-use/get-booking-hisotry`,
        config
      );
      if (response?.data.success === true) {
        setBookings(response.data?.bookings);
      }
    } catch (error) {
      if (error) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  const onCancelBooking = async (id) => {
    console.log(id);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/book-room-by-use/cancel/${id}`,
        {},
        config
      );
      console.log(response);

      if (response.data?.success) {
        toast.success("Booking cancelled");
        setRefreshBookingHistory(true);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Booking History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings?.map((booking) => (
          <div
            key={booking._id}
            className="rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <Image
              width={200}
              height={200}
              src={booking.room.picture || "/fallback-image.jpg"}
              alt={booking.room.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-blue-600">
                {booking.room.title}
              </h2>
              <p className="text-gray-500">
                Check-in: {new Date(booking.startDate).toLocaleString()}
              </p>
              <p className="text-gray-500">
                Check-out: {new Date(booking.endDate).toLocaleString()}
              </p>
              <p
                className={`font-medium ${
                  booking.status === "confirmed"
                    ? "text-green-600"
                    : booking.status === "cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status:{" "}
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </p>
              <div className="mt-4">
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => onCancelBooking(booking._id)}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
