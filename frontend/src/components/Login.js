import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { client } from "../client";

import logo from "../assets/logo.png";
import bgVideo from "../assets/bg.mp4";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);
    const { name, sub, picture } = decoded;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    localStorage.setItem("user", JSON.stringify(decoded));

    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });
    // console.log(decoded);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={bgVideo}
          type="video/mp4"
          controls={false}
          muted
          autoPlay
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="500" alt="logo" loading="lazy" />
          </div>

          <div className="drop-shadow-2xl mt-3 text-lg">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
