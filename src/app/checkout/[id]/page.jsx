"use client";
import ReservationDatePick from "@/components/ReservationDatePick";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutPage = ({ params }) => {
  const query = params.id;
  const [formattedDates, setFormattedDates] = useState({
    start: null,
    end: null,
  });
  const [roomId, setRoomId] = useState(null);
  const [availableAfter, setAvailableAfter] = useState("");

  useEffect(() => {
    const decodedStr = decodeURIComponent(query);
    const params = new URLSearchParams(decodedStr);
    const id = params.get("id");
    const availableAfterStr = params.get("availableAfter");
    const formattedAvailableAfter = dayjs(availableAfterStr).format(
      "ddd, DD MMM YYYY HH:mm:ss [GMT]"
    );
    setRoomId(id);
    setAvailableAfter(formattedAvailableAfter);
  }, [params]);

  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleBooking = async () => {
    try {
      if (!formattedDates.end && !formattedDates.start) {
        toast.error("select check-in and check-out time");
        return;
      }
      const bookingData = {
        roomId: roomId,
        startDate: formattedDates.start,
        endDate: formattedDates.end,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/book-room-by-use/book`,
        bookingData,
        config
      );
      if (response?.data.success === true) {
        toast.success("Room Booked successfully");
      }
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 font-Poppins">
      <h2 className="text-2xl font-bold mb-4">Room Booking Checkout</h2>
      <section className="reservation-dates mb-6 text-white">
        <h3 className="text-xl font-semibold">Select Reservation Dates</h3>
        {availableAfter ? (
          <ReservationDatePick
            availableAfter={availableAfter}
            setFormattedDates={setFormattedDates}
            formattedDates={formattedDates}
          />
        ) : (
          <ReservationDatePick
            setFormattedDates={setFormattedDates}
            formattedDates={formattedDates}
          />
        )}
      </section>

      {/* Guest Information Section */}
      <section className="guest-info mb-6">
        <h3 className="text-xl font-semibold">Guest Information</h3>
        <form>
          <label className="block mb-2">
            Name: {`optional`}
            <input
              type="text"
              className="block border p-2 w-full mb-4"
              value={guestInfo.name}
              onChange={(e) =>
                setGuestInfo({ ...guestInfo, name: e.target.value })
              }
              required
            />
          </label>
         
          <label className="block mb-2">
            Phone: {`optional`}
            <input
              type="text"
              className="block border p-2 w-full mb-4"
              value={guestInfo.phone}
              onChange={(e) =>
                setGuestInfo({ ...guestInfo, phone: e.target.value })
              }
              required
            />
          </label>
        </form>
        <button
          // type="submit"
          onClick={handleBooking}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Confirm Booking
        </button>
      </section>
    </div>
  );
};

export default CheckoutPage;
