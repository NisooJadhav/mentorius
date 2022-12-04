import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar, Search, Feed, CreateDoubt, DoubtDetail } from "../components";

export default function Doubts({ user }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50 ">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>

      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/doubt-detail/:doubtId"
            element={<DoubtDetail user={user} />}
          />
          <Route path="/create-doubt" element={<CreateDoubt user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
