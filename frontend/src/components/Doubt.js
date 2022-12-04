import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";

import { doubtDetailMoreDoubtQuery, doubtDetailQuery } from "../utils/data";

import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Doubt = ({ doubt }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate(); 

  const { postedBy, image, _id, destination } = doubt;

  //console.log(doubt);

  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const deleteDoubt = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  let alreadySaved = doubt?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const saveDoubt = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/doubt-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img
            className="rounded-lg w-full "
            src={urlFor(image).width(720).url()}
            alt="user-post"
            loading="lazy"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();  
                  }}
                  className="bg-white w-7 h-7 rounded-full flex items-center justify-center text-dark text-sm opacity-75 hover:opacity-100 hover:shadow-sm hover:bg-sky-600 hover:text-white outline-none transition-all duration-300"
                >
                  <MdDownloadForOffline className="w-7 h-7 text-sm"/>
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-sky-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {doubt?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveDoubt(_id);
                  }}
                  type="button"
                  className="bg-sky-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {doubt?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-1 pl-2 pr-3 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  <BsFillArrowUpRightCircleFill className="border-none outline-none text-lg"/>
                  {destination.length > 25
                    ? `${destination.slice(0, 25)}...`
                    : destination}
                </a>
              ) : undefined}
              {postedBy?._id === user?.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDoubt(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
          loading="lazy"
        />
        <p className="font-semibold capitalize dark:text-gray-50 dark:font-normal">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Doubt;
