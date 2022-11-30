import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const [doubts, setDoubts] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setDoubts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setDoubts(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) return <Spinner message="adding new doubts in your feed" />;

  if (!doubts?.length)
    return (
      <div className="flex flex-col align-center items-center">
        <h2 className="text-sky-600 text-xl">no pins available!</h2>
      </div>
    );

  return <>{doubts && <MasonryLayout doubts={doubts} />}</>;
}
