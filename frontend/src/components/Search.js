import React, { useState, useEffect } from "react";

import { client } from "../client";

import MasonryLayout from "./MasonryLayout";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

export default function Search({ searchTerm }) {
  const [doubts, setDoubts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());

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
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="searching doubts" />}
      {doubts?.length !== 0 && <MasonryLayout doubts={doubts} />}
      {doubts?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Doubts found!</div>
      )}
    </div>
  );
}
