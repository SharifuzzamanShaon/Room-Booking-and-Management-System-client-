// components/RoomCarousel.js
import Image from "next/image";
import RoomCard from "./RoomCard";

const DisplayRooms = ({ rooms }) => {
  const isLoading = rooms.length === 0; // If no rooms, assume loading
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Available Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading state when rooms are not available yet
          <div className="col-span-full text-center">
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        ) : (
          // Display room cards when rooms are available
          rooms.map((room) => <RoomCard key={room._id} room={room} />)
        )}
      </div>
    </div>
  );
};

export default DisplayRooms;
