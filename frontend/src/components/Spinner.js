import React from "react";

import { Circles } from "react-loader-spinner";

export default function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles
        type="Circles"
        color="rgb(2 132 199)"
        height={60}
        width={200}
        className="m-5 bg-sky-600"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}
