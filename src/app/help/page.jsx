import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Help & Support
        </h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Booking Limitations
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            You can book a room for a maximum of <strong>7 days</strong> in a
            single booking.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Frequently Asked Questions
          </h2>
          <ul className="list-disc pl-6 mt-2">
            <li className="mt-1 text-gray-700 dark:text-gray-300">
              <strong>Can I extend my booking?</strong>
              Yes, you can extend your booking by making a new reservation after
              your initial booking period ends.
            </li>
            <li className="mt-1 text-gray-700 dark:text-gray-300">
              <strong>What if I need to cancel my booking?</strong>
              Cancellations must be made at least 24 hours in advance for a full
              refund.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Contact Us
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            If you have any further questions or need assistance, please feel
            free to reach out to our support team at:
          </p>
          <p className="mt-1 text-lg font-medium text-gray-800 dark:text-gray-200">
            Email: support@example.com
          </p>
        </div>

        <div className="flex justify-center">
          <Link href={"/"}>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
            Go Back to Home
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
