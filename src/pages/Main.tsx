import { Menu, TrendingUp, Star, Clock, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
import MovieNotFound from "../components/MovieNotFound";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sideActive, setSideActive] = useState(false);
  const [watchList, setWatchlist] = useState(0);

  function search(query: string): void {
    setSearchQuery(query);
  }

  async function apiCall() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();

    console.log(data);
  }

  apiCall();

  function disableSideBar(): void {
    const width = window.innerWidth;

    if (width >= 768) {
      setSideActive(false);
    }
    setWatchlist(watchList);
  }

  useEffect(() => {
    window.addEventListener("resize", disableSideBar);

    return () => {
      window.removeEventListener("resize", disableSideBar);
    };
  }, []);

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.add("bg-primary");

    return () => {
      bodyElement.classList.remove("bg-primary");
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 bg-secondary/80 backdrop-blur-lg pb-8 sm-pb-0">
        <Menu
          className="absolute z-1 top-6 right-4 text-white sm:hidden"
          size={28}
          onClick={() => setSideActive((prev) => !prev)}
        />
        <div className="flex flex-col gap-8 sm:justify-between sm:flex-row sm:items-center sm:w-[80%] sm:mx-auto">
          <div className="sm:w-100 lg:w-auto">
            {sideActive && <SideBar watchList={watchList} />}
            <h1 className="sm:justify-baseline md:text-center font-semibold pt-16 sm:pt-6 text-center text-4xl bg-gradient-to-r from-[#A78BFA] via-[#7D6D99] to-[#4C3A66] bg-clip-text text-transparent">
              Movie Watchlist
            </h1>
          </div>
          <div className="px-4 sm:w-[60%]">
            <input
              type="text"
              name="search"
              placeholder="Search for movies..."
              className="w-full mx-auto sm:mt-8 text-gray-100 bg-gray-700/50 border border-gray-600 px-4 py-2 md:py-3 rounded-md shadow"
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>
        <div className="hidden sm:flex gap-1.5 mx-auto justify-baseline w-[80%] pt-8 pb-6">
          <Button text={"Popular"} emoji={<TrendingUp />} active={true} />
          <Button text={"Top Rated"} emoji={<Star />} active={false} />
          <Button text={"Upcoming"} emoji={<Clock />} active={false} />
          <Button
            text={`WatchList (${watchList})`}
            emoji={<Heart />}
            active={false}
          />
        </div>
      </header>
      <main>{searchQuery && <MovieNotFound searchQuery={searchQuery} />}</main>
    </>
  );
}