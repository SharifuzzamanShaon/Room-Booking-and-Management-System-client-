import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          src={room.picture}
          width={400} // Adjust as necessary
          height={300} // Adjust as necessary
          className="rounded-t-lg"
          alt={room.title}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {room.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Rent: ${room.rent}
        </p>
        <ul className="mb-3 text-gray-600 dark:text-gray-300">
          {room.facilities.map((facility, index) => (
            <li key={index} className="text-sm">
              - {facility}
            </li>
          ))}
        </ul>
        <Link
          href={`/room-details/${room._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
