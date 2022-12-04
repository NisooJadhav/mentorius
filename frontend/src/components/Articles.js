import React from "react";
import logo from "../assets/favicon.png";

import $ from "jquery";
import { BsSearch } from "react-icons/bs";

import "../chat.css";

export default function Articles() {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";
  const results = document.querySelector(".results");
  const error = document.querySelector(".error");
  let keyword = document.getElementById("search_value");
  let loader = document.getElementById("loader-wrapper");

  function fetchWiki(e) {
    e.preventDefault();
    let searchFor = keyword.value;
    if (!searchFor) {
      $(".error").html("<h2 className='error'>enter proper keyword</h2>");
      $(".error").fadeIn(1000);
      $(".error").fadeOut(4000);
      return;
    }
    fetchWikis(searchFor);
  }

  const fetchWikis = async (value) => {
    try {
      loader.style.display = "flex";

      const response = await fetch(`${url},${value}`);

      const data = await response.json();
      const result = data.query.search;
      if (result.length < 1) {
        error.innerHTML = "<h2 className='error'>no results found</h2>";
        $(".error").fadeIn(1000);
        $(".error").fadeOut(4000);
        return;
      }
      renderResults(result);
    } catch (error) {
      $(".error").html("<h2 className='error'>there was an error :( </h2>");
      $(".error").fadeIn(1000);
      return;
    } finally {
      loader.style.display = "none";
    }
  };

  const renderResults = async (wiki) => {
    const cards = wiki
      .map((wiki) => {
        const { title, snippet, pageid } = wiki;
        return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
              <h4>${title}</h4>
              <p>
                ${snippet}
              </p>
            </a><hr>`;
      })
      .join("");

    results.innerHTML = `<div className="articles">
          ${cards}
        </div>`;
  };

  return (
    <div className="bgOverlay">
      <div className="block absolute z-0  h-[100%] w-[80%] min-h-[50%] min-w-[50%] select-none">
        <img
          src={logo}
          alt="logo"
          className="w-1/4 opacity-20 dark:opacity-40 m-[5%]"
        />
      </div>

      <div className="z-1 flex flex-col items-center align-center relative">
        <center>
          <h1 className="text-2xl z-2 md:p-10 md:pb-0 mb-0 dark:text-white pt-2">
            Articles
          </h1>

          <div className="h-[1px] dark:bg-sky-500 md:w-[50%] w-[50%] bg-sky-500 animate-ping pt-0 mt-0"></div>

          <div className="flex flex-col items-center align-center">
            <form
              action=""
              className="mt-2 flex flex-row dark:bg-gray-800 dark:text-gray-50/80"
              onSubmit={fetchWiki}
            >
              <input
                type="text"
                placeholder="search"
                className="p-2 md:w-full sm:w-6/12 bg-white outline-none dark:bg-gray-800 dark:text-gray-50/80 shadow-sm text-2xl"
                id="search_value"
                required
              />
              <button
                type="submit"
                onClick={fetchWiki}
                className="bg-white shadow-sm text-2xl p-3 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-50/50"
              >
                <BsSearch className="ml-1 dark:text-gray-50" />
              </button>
            </form>
          </div>
          <div className="loader-wrapper" id="loader-wrapper">
            <span className="loader"></span>
          </div>
          <div className="allWikis">
            <div className="results">
              <div className="error"></div>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}
