import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import { categories } from "../utils/data";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from "./Spinner";

export default function CreateDoubt({ user }) {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("image upload error", error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const saveDoubt = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "doubt",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };

      client.create(doc).then(() => {
        navigate("/");
        window.location.reload();
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      {fields && (
        <p className="text-sky-600 mb-5 text-xl transition-all duration-150 ease-in">
          Fill in all fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-50/10">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full dark:bg-gray-800">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 dark:bg-gray-900 shadow-sm shadow-white">
            {loading && <Spinner />}
            {wrongImageType && <p>wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full dark:bg-gray-900">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl dark:text-gray-50/50">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg dark:text-gray-50/50">
                      click to upload
                    </p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, PNG, GIF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full ">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                  loading="lazy"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-300 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdOutlineDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg  dark:bg-gray-800">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full "
                alt="user profile"
                loading="lazy"
              />
              <p className="font-bold dark:font-normal dark:text-white">
                {user.userName}
              </p>
            </div>
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="add title"
            className="border-b-2 text-2xl sm:text-3xl border-gray-200 font-bold p-2 dark:bg-gray-900 dark:text-gray-50 rounded-lg"
          />
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="add description"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 dark:bg-gray-900 dark:text-gray-50 rounded-lg"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="add destination link"
            className="outline-none text-base sm:text-lg border-gray-200 border-b-2 p-2 dark:bg-gray-900 dark:text-gray-50 rounded-lg"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl dark:font-normal dark:text-gray-50/50">
                choose doubt category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer dark:bg-gray-900 dark:text-gray-50"
              >
                <option value="other" className="bg-white dark:bg-gray-600">
                  select category
                </option>

                {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black dark:bg-gray-900 dark:text-gray-50"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={saveDoubt}
                className="bg-sky-500 text-white font-bold p-2 rounded-full w-28 outline-none hover:bg-sky-600"
              >
                Save Doubt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
