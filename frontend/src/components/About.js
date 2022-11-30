import React from "react";
import nishant from "../assets/nishant.webp";

import { FaHeart } from "react-icons/fa";

export default function About() {
  return (
    <div className="p-0 m-0">
      <div className="flex items-center h-screen w-full justify-center hide-scrollbar">
        <div className="max-w-xs border-t-4 border-sky-600 rounded w-full">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={nishant}
                alt="nishant jadhav"
              />
            </div>
            <div className="flex flex-col items-center p-2 text-center">
              <h3 className="flex items-center text-center text-md text-gray-900 font-medium leading-8">
                made with <FaHeart className="ml-1 mr-1" /> by
                <u> Nishant Jadhav</u>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
