import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import { doubtDetailMoreDoubtQuery, doubtDetailQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import { MdDownloadForOffline } from "react-icons/md";
import { HiArrowUp } from "react-icons/hi";
import Spinner from "./Spinner";

export default function DoubtDetail({ user }) {
  const [doubts, setDoubts] = useState(null);
  const [doubtDetail, setDoubtDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { doubtId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(doubtId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchDoubtDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  const fetchDoubtDetails = () => {
    let query = doubtDetailQuery(doubtId);

    if (query) {
      client.fetch(query).then((data) => {
        setDoubtDetail(data[0]);

        if (data[0]) {
          query = doubtDetailMoreDoubtQuery(data[0]);

          client.fetch(query).then((res) => setDoubts(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchDoubtDetails();
  }, [doubtId]);

  if (!doubtDetail) return <Spinner message="loading doubt..." />;

  return (
    <div
      className="flex xl-flex-row flex-col m-auto bg-white dark:bg-gray-800"
      style={{ maxWidth: "1500px", borderRadius: "32px" }}
    >
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={doubtDetail?.image && urlFor(doubtDetail.image).url()}
          className="rounded-md w-3/4 shadow-sm md:rounded-1xl hover:bgOverlay cursor-pointer brightness-[90%] hover:brightness-100 transition-all duration-300"
          alt="user post"
          loading="lazy"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center text-2xl">
            <a
              href={`${doubtDetail.image?.asset?.url}?dl=`}
              download
              className="bg-white rounded-full hover:bg-sky-500 hover:text-white duration-300 transition-all"
              alt="download image"
              aria-label="download image"
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a
            href={doubtDetail.destination}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-sky-600 hover:text-sky-800 md:text-lg text-md"
          >
            {doubtDetail.destination}
            <HiArrowUp className="ml-1 rotate-90 hover:rotate-45 text-lg transition-all duration-300" />
          </a>
        </div>
        <div>
          <h1 className="text-2xl font-bold break-words mt-3 dark:text-gray-50 dark:font-normal">
            {doubtDetail.title}
          </h1>
          <p className="text-gray-500 text-lg mt-5 mb-2 dark:text-gray-50/80">
            {doubtDetail.about}
          </p>
        </div>
        <Link
          to={`/user-profile/${doubtDetail.postedBy?._id}`}
          className="flex gap-2 mt-3 items-center bg-white dark:bg-gray-800"
        >
          <img
            className="w-8 h-8 rounded-full object-cover mb-1"
            src={doubtDetail.postedBy?.image}
            alt="user-profile"
            loading="lazy"
          />
          <p className="font-semibold capitalize mb-1 dark:bg-gray-800 dark:text-white dark:font-normal">
            {doubtDetail.postedBy?.userName}
          </p>
        </Link>

        <div className="h-[1px] mt-1 bg-zinc-500/25"></div>
        <p className="text-gray-500 mt-2 text-md">category: </p>
        <a
          href={`/category/${doubtDetail.category}`}
          className="text-gray-400 text-md hover:text-sky-500"
        >
          #{doubtDetail.category}
        </a>
        <div className="h-[1px] mt-1 bg-zinc-500/25"></div>

        <h2 className="mt-5 text-2xl dark:text-gray-50/80">Comments:</h2>
        <div className="max-h-370 overflow-y-auto">
          {doubtDetail?.comments?.map((comment, i) => (
            <div
              className="flex gap-2 mt-5 items-center bg-white rounded-lg dark:bg-gray-800"
              key={i}
            >
              <img
                src={comment.postedBy.image}
                alt="user profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                loading="lazy"
              />
              <div className="flex flex-col">
                <p className="font-bold dark:bg-gray-800 dark:text-gray-50/90 dark:font-normal">
                  {comment.postedBy.userName}
                </p>
                <p className="dark:font-normal dark:text-gray-50/80">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-6 gap-3">
          <Link to={`/user-profile/${doubtDetail.postedBy?._id}`}>
            <img
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              // src={doubtDetail.postedBy?.image}
              src={user.image}
              alt="user-profile"
              loading="lazy"
            />
          </Link>
          <input
            type="text"
            placeholder="add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-100/50"
          />
          <button
            type="button"
            className="bg-sky-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none hover:bg-sky-600"
            onClick={addComment}
          >
            {addingComment ? "posting the comment..." : "Post"}
          </button>
        </div>
      </div>
      {doubts?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4 dark:text-gray-50/80">
            more like this
          </h2>
          <MasonryLayout doubts={doubts} />
        </>
      ) : (
        <Spinner message="loading more doubts..." />
      )}
    </div>
  );
}
