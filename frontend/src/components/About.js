import React from "react";
import nishant from "../assets/nishant.webp";

import { FaHeart } from "react-icons/fa";
import {
  AiOutlineLinkedin,
  AiOutlineLink,
  AiOutlineGithub,
} from "react-icons/ai";

function getRandomRng() {
  return Math.floor(Math.random() * 1000) + 0;
}
let randomImage = `https://picsum.photos/seed/${getRandomRng()}/1920/1080`;

export default function About() {
  return (
    <div className="flex justify-start items-center flex-col h-screen h-[100%] sm:h-[100%] md:h-[100%]">
      <div className="relative w-full h-full">
        <img
          src={randomImage}
          className="w-full h-full object-cover blur-sm"
          loading="lazy"
          alt="random bg"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay/50">
          <div className="p-5">
            <div className="max-w-xs border-t-4 border-sky-600 rounded w-full">
              <div className="bg-white shadow-xl py-3 rounded-b-lg dark:bg-gray-800">
                <div className="photo-wrapper p-2">
                  <img
                    className="rounded-full shadow-sm w-28 h-28 mx-auto mt-2"
                    src={nishant}
                    alt="nishant jadhav"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col items-center p-2 text-center">
                  <h3 className="flex items-center text-center text-md text-gray-900 font-medium leading-8 p-5 dark:text-gray-50/90">
                    made with <FaHeart className="ml-1 mr-1 text-red-600" /> by
                    <u className="ml-1">Nishant Jadhav</u>
                  </h3>
                  <div className="w-[90%] bg-sky-600/50 h-[1px] m-2"></div>
                  <div className="flex flex-row w-full cursor-pointer text-3xl items-center justify-center dark:text-gray-50/50">
                    <a
                      href="https://linktr.ee/nisoojadhav"
                      alt="linktr.ee/nisoojadhav"
                      className="m-2 dark:hover:text-gray-50"
                    >
                      <AiOutlineLink />
                    </a>
                    <a
                      href="https://linkedin.com/in/nisoojadhav"
                      alt="github"
                      className="m-2 dark:hover:text-gray-50"
                    >
                      <AiOutlineLinkedin />
                    </a>
                    <a
                      href="https://github.com/nisoojadhav"
                      alt="github"
                      className="m-2 dark:hover:text-gray-50"
                    >
                      <AiOutlineGithub />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
