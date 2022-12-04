import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";

import {
  userCreatedDoubtsQuery,
  userQuery,
  userSavedDoubtsQuery,
} from "../utils/data";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

function getRandomRng() {
  return Math.floor(Math.random() * 1000) + 0;
}
let randomImage = `https://picsum.photos/seed/${getRandomRng()}/1920/1080`;

const activeBtnStyles =
  "bg-sky-600 text-white font-bold p-1 pl-1 pr-1 rounded-full w-20 outline-none";
const nonActiveBtnStyles =
  "mr-4 opacity-50 hover:opacity-100 font-bold p-2 rounded-full w-20 outline-none dark:text-gray-50/80 dark:font-normal";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [doubts, setDoubts] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();

  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdDoubtsQuery = userCreatedDoubtsQuery(userId);
      client.fetch(createdDoubtsQuery).then((data) => {
        setDoubts(data);
      });
    } else if (text === "Saved") {
      const savedDoubtsQuery = userSavedDoubtsQuery(userId);
      client.fetch(savedDoubtsQuery).then((data) => {
        setDoubts(data);
      });
    } else {
      const createdDoubtsQuery = userCreatedDoubtsQuery(userId);
      client.fetch(createdDoubtsQuery).then((data) => {
        setDoubts(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");

    googleLogout();
  };

  if (!user) {
    return <Spinner message="loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-370 2xl:h-420 bg-gradient-to-b from-sky-800 to-black">
              <img
                src={randomImage}
                className="w-full h-370 2xl:h-420 object-cover opacity-30"
                alt="profile banner"
                loading="lazy"
              />
            </div>
            <div className="relative w-25 h-25 object-cover">
              <img
                src={user.image}
                className="w-25 h-25 -mt-10 shadow-lg object-cover rounded-full"
                alt="user pic"
                loading="lazy"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mt-3 mb-5 dark:text-gray-50 dark:font-normal">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0">
              {userId === User.sub && (
                <button
                  type="button"
                  className="flex flex-row bg-gray-100/90 hover:bg-gray-50 p-2 rounded-lg cursor-pointer outline-none shadow-md m-2 dark:bg-gray-800 dark:text-white"
                  onClick={logout}
                >
                  <AiOutlineLogout
                    fontSize={21}
                    className="mr-1 dark:text-white"
                  />{" "}
                  log out
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : nonActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : nonActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>

          <div className="px-2">
            <MasonryLayout doubts={doubts} />
          </div>

          {doubts?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              no doubts by this user!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
