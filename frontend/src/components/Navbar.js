import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoMdAdd, IoMdSearch } from "react-icons/io";

export default function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 dark:bg-black/90">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none shadow-sm focus-within:shadow-md dark:bg-gray-800 dark:shadow-md dark:focus-within:shadow-lg dark:shadow-black">
        <IoMdSearch fontSize={21} className="ml-1 dark:text-gray-50" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none dark:bg-gray-800 dark:text-gray-50/80"
        />

        <div className="flex gap-3">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.image}
              alt="user-img"
              className="w-14 h-12 rounded-lg transition-all duration-500"
              loading="lazy"
            />
          </Link>
          <Link
            to="create-doubt"
            className="bg-sky-500 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center transition-all duration-500 ease-in-out hover:bg-sky-600"
          >
            <IoMdAdd className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}
