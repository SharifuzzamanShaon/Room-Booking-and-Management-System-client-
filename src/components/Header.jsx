"use client";
import { useState } from "react";
import Link from "next/link";
import AuthModal from "./customModals/AuthModal";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { useGlobalContext } from "../../ContextAPI/GlobalContext";
import UserProfile from "./User/UserProfile";
const Header = () => {
  const [isAuthModal, setAuthModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useGlobalContext();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">
            <span className="hover:text-blue-300">Room Booking</span>
          </Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`md:flex md:space-x-4 ${
            isOpen ? "hidden" : "hidden"
          } md:block`}
        >
          <Link href="/">
            <span className="block py-2 md:py-0 hover:text-blue-300">
              Rooms
            </span>
          </Link>
          <Link href="/booking-history">
            <span className="block py-2 md:py-0 hover:text-blue-300">
              My Bookings
            </span>
          </Link>
          <Link href="/contact">
            <span className="block py-2 md:py-0 hover:text-blue-300">
              Contact
            </span>
          </Link>
        </nav>

        {/* Login Button */}
        {state && state.user ? (
          <UserProfile />
        ) : (
          <div>
            <button
              onClick={() => setAuthModal(true)}
              className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Optional mobile menu styling */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link href="/">
              <span className="hover:text-blue-300">Home</span>
            </Link>
            <Link href="/rooms">
              <span className="hover:text-blue-300">Rooms</span>
            </Link>
            <Link href="/booking-history">
              <span className="hover:text-blue-300">My Bookings</span>
            </Link>
            <Link href="/help">
              <span className="hover:text-blue-300">Help</span>
            </Link>
          </nav>
        </div>
      )}
      {isAuthModal && (
        <AuthModal
          isAuthModal={isAuthModal}
          setAuthModal={setAuthModal}
        ></AuthModal>
      )}
    </div>
  );
};

export default Header;
