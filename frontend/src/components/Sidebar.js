import React from "react";
import { NavLink, Link } from "react-router-dom";

import { categories } from "../utils/data";
import logo from "../assets/logo.png";
import { FaHome } from "react-icons/fa";
import { BsNewspaper, BsSun, BsMoon } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { HiChatAlt2 } from "react-icons/hi";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-zinc-500 hover:text-black transition-all duration-200 ease-in-out capitalize dark:hover:text-white";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold text-slate-900 border-r-2 border-sky-600 transition-all duration-200 ease-in-out capitalize dark:text-white dark:border-r-3 dark:border-sky-600";

export default function Sidebar({
  user,
  closeToggle,
  darkTheme,
  setDarkTheme,
}) {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar select-none dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-60 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" loading="lazy" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <FaHome />
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <AiOutlineInfoCircle />
            About
          </NavLink>
          <NavLink
            to="/articles"
            onClick={handleCloseSidebar}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <BsNewspaper className="text-lg" />
            read articles
          </NavLink>
          <NavLink
            to="/chat"
            onClick={handleCloseSidebar}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <HiChatAlt2 className="animate-bounce text-lg" />
            enter chatroom
          </NavLink>

          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm bg-white"
                alt="category"
                loading="lazy"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
        <div className="bg-gray-600 h-[1px] mt-5 mx-4 mb-0"></div>
        <div className="flex flex-col">
          <button
            onClick={() => {
              document.querySelector("body").classList.toggle("dark");
              setDarkTheme(!darkTheme);
            }}
            className="flex sm:w-[40%] md:w-6/12 text-2xl w-1/4 text-sky-400 font-bold dark:text-sky-400 rounded-full hover:shadow-lg 
          pt-1 pb-1 pr-0 pl-1 my-2 hover:bg-gray-100 hover:dark:bg-gray-600 shadow-lg border border-sky-600 ml-5"
          >
            {darkTheme ? (
              <div className="flex items-center">
                <BsSun className="p-0 m-0 mr-2" />{" "}
                <p className="text-lg">light</p>
              </div>
            ) : (
              <div className="flex items-center">
                <BsMoon className="p-0 m-0 mr-2" />{" "}
                <p className="text-lg pr-1">dark</p>
              </div>
            )}
          </button>
        </div>
        <div className="bg-gray-600 h-[1px] mt-0 mx-4 mb-0"></div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 dark:bg-gray-800 dark:text-white"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
            loading="lazy"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
}
