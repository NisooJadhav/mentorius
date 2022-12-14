import React from "react";

import Doubt from "./Doubt";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  3000: 5,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ doubts }) => {
  //console.log(doubts);

  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={breakpointColumnsObj}
    >
      {doubts?.map((doubt) => (
        <Doubt key={doubt._id} doubt={doubt} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
