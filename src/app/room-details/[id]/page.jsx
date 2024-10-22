"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RoomDetails = ({ params }) => {
  const [RoomDetails, setRoomDetails] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const { id } = params; // Extract room ID from params

  useEffect(() => {
    getRoomDetails();
  }, [id]);
  const getRoomDetails = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/get-room-details-&-status/${id}`,
      config
    ); // Adjust the URL as needed
    setRoomDetails(response.data.room);
    setBookingStatus(response.data.bookingDetails);
  };
  if (!RoomDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    ); // Show loading while fetching data
  }

  return (
    <>
      <h1 className="text-xl font-bold text-center my-3">Room Details</h1>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 relative">
          {/* Go Back Button - Positioned on top */}
          <div className="top-4 left-4 z-10 mb-2">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-full hover:bg-gray-800 shadow-lg"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>

          {/* Content Container */}
          <div className="w-full lg:max-w-4xl flex flex-col lg:flex-row items-center lg:items-start gap-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative z-0">
            {/* Left Column - Image */}
            <div className="flex-shrink-0">
              <Image
                src={RoomDetails?.picture}
                alt={RoomDetails?.title}
                width={400}
                height={400}
                className="rounded-lg shadow-md object-cover"
              />
            </div>

            {/* Right Column - Details */}
            <div className="flex-grow text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                {RoomDetails?.title}
              </h1>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-2 shadow-sm">
                <p className="text-2xl font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Price:{" "}
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    ${RoomDetails?.price}
                  </span>
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-2 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Description:
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                  {RoomDetails?.description ||
                    "This room offers comfortable living space with all essential facilities and a beautiful view."}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-2 shadow-md">
                <h2 className="text-2xl font-semibold mb-2">Status: </h2>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div
                    className={`px-4 py-2 rounded-lg text-lg font-medium ${
                      bookingStatus?.status === "booked"
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {bookingStatus?.status === "booked" ? (
                      <span>Available after: {bookingStatus?.endDate}</span>
                    ) : (
                      <span>Available Now</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">Facilities:</h2>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {RoomDetails?.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-md"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="my-6">
                <Link
                  href={`/checkout/id=${RoomDetails._id}${
                    bookingStatus
                      ? `&availableAfter=${encodeURIComponent(
                          bookingStatus.endDate
                        )}`
                      : ""
                  }`}
                >
                  <button className="inline-flex items-center px-5 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition ease-in-out duration-200">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
