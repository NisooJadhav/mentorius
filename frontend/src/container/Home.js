import React, { useState, useEffect, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import ChatRoom from "../components/ChatRoom";
import About from "../components/About";

import Doubts from "./Doubts";
import { client } from "../client";
import logo from "../assets/logo.png";

import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import Articles from "../components/Articles";

export default function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  const [darkTheme, setDarkTheme] = useState(false);
  
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out dark:bg-black/90">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar
          user={user && user}
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
        />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md dark:text-gray-50/50 dark:hover:text-gray-50">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-40" />
          </Link>
          <Link to={`user-profile/${user?._id}`} className="md:m-50">
            <img
              src={user?.image}
              alt="logo"
              className="w-8 h-8 rounded-full"
              loading="lazy"
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2 dark:text-white">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Doubts user={user && user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </div>
    </div>
  );
}
