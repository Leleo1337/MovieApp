import { Menu, TrendingUp, Star, Clock, Heart, Github } from "lucide-react";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
//import MovieNotFound from "../components/MovieNotFound";
import Card from "../components/Card";
import { MovieProps, ButtonProps } from "../types/types.ts";
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcommingMovies } from "../services/apiServices.ts";
import Loading from "../components/Loading.tsx";
import EmptyWatchList from "../components/EmptyWatchList.tsx";

export default function Main() {
   // const [searchQuery, setSearchQuery] = useState("");

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [sideActive, setSideActive] = useState<boolean>(false);

   const [activeIndex, setActiveIndex] = useState<number | null>(0);

   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [watchList, setWatchlist] = useState<MovieProps[]>([]);

   /*function search(query: string): void {
      setSearchQuery(query);
   }
   */

   const buttons: ButtonProps[] = [
      {
         text: "Popular",
         emoji: <TrendingUp />,
         active: true,
         onClick: () => handleFetchPopularMovies(),
      },
      {
         text: "Top Rated",
         emoji: <Star />,
         active: false,
         onClick: () => handleFetchTopRatedMovies(),
      },
      {
         text: "Upcoming",
         active: true,
         emoji: <Clock />,
         onClick: () => handleFetchUpcommingMovies(),
      },
      {
         text: `WatchList (${watchList.length})`,
         active: false,
         emoji: <Heart />,
         onClick: renderWatchList,
      },
   ];

   const renderButtons = buttons.map((button, index) => (
      <Button
         key={index}
         emoji={button.emoji}
         text={button.text}
         active={activeIndex == index}
         onClick={() => {
            setActiveIndex(index);
            button.onClick?.();
         }}
      />
   ));

   async function handleFetchPopularMovies() {
      try {
         setIsLoading(true);
         const movies = await fetchPopularMovies();
         setMovies(movies);
      } catch (e) {
         console.error("Failed to fetch movies:", e);
      } finally {
         setIsLoading(false);
      }
   }

   async function handleFetchTopRatedMovies() {
      try {
         setIsLoading(true);
         const movies = await fetchTopRatedMovies();
         setMovies(movies);
      } catch (e) {
         console.error("Failed to fetch movies:", e);
      } finally {
         setIsLoading(false);
      }
   }

   async function handleFetchUpcommingMovies() {
      try {
         setIsLoading(true);
         const movies = await fetchUpcommingMovies();
         setMovies(movies);
      } catch (error) {
         console.error("Failed to fetch movies: ", error);
      } finally {
         setIsLoading(false);
      }
   }

   function addToWatchList(movie: MovieProps) {
      const exists = watchList.some((movies) => movies.id == movie.id);
      if (!exists) {
         setWatchlist((prev) => [...prev, movie]);
      }
   }

   function removeFromWatchList(movie: MovieProps) {
      setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
   }

   function renderWatchList() {
      setMovies(watchList);
   }

   function disableSideBar(): void {
      const width = window.innerWidth;

      if (width >= 768) {
         setSideActive(false);
      }
   }

   useEffect(() => {
      if (activeIndex === 3) {
         setMovies(watchList);
      }
   }, [watchList, activeIndex]);

   useEffect(() => {
      handleFetchPopularMovies();
   }, []);

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
         <header className="sticky top-0 z-10 bg-secondary/80 backdrop-blur-lg pb-8 sm:pb-2 sm:mb-8">
            <Menu
               className="absolute z-1 top-6 right-4 text-white sm:hidden"
               size={28}
               onClick={() => setSideActive((prev) => !prev)}
            />
            <div className="flex flex-col gap-8 sm:justify-between sm:flex-row sm:items-center sm:w-[90%] sm:mx-auto">
               <div className="sm:w-100 lg:w-auto">
                  {sideActive && <SideBar renderButtons={renderButtons} />}
                  <h1 className="sm:justify-baseline md:text-center font-semibold pt-16 sm:pt-6 text-center text-4xl bg-gradient-to-r from-[#A78BFA] via-[#7D6D99] to-[#4C3A66] bg-clip-text text-transparent">
                     Movie Watchlist
                  </h1>
               </div>
               <div className="px-4 sm:w-[70%]">
                  <input
                     type="text"
                     name="search"
                     placeholder="Search for movies..."
                     autoComplete="off"
                     className="w-full mx-auto sm:mt-8 text-gray-100 bg-gray-700/50 border border-gray-600 px-4 py-2 md:py-3 rounded-md shadow"
                     //onChange={(e) => search(e.target.value)}
                  />
               </div>
            </div>
            <div className="hidden sm:flex gap-1.5 mx-auto justify-baseline w-[90%] pt-8 pb-6">{renderButtons}</div>
         </header>
         <main>
            <div className="flex justify-center w-[90%] mx-auto pb-24 mt-4">
               <div className="flex justify-center items-center flex-wrap mx-auto gap-6 w-full text-white">
                {activeIndex == 3 && watchList.length <= 0 && <EmptyWatchList/>}

                  {isLoading ? (
                     <Loading />
                  ) : (
                     movies.map((movie) => (
                        <Card
                           key={movie.id}
                           title={movie.title}
                           poster_path={movie.poster_path}
                           release_date={movie.release_date}
                           vote_average={movie.vote_average}
                           overview={movie.overview}
                           runtime={movie.runtime}
                           addToWatchList={() => addToWatchList(movie)}
                           isInWatchList={watchList.some((m) => m.id === movie.id)}
                           removeFromWatchList={() => removeFromWatchList(movie)}
                        />
                     ))
                  )}
               </div>
            </div>
         </main>
         <div className="fixed bottom-4 right-4 bg-white/80 p-1 rounded-full hover:bg-white/100 transition ease-in">
            <a href="https://github.com/leleo1337" target="_blank">
               <Github size={34} />
            </a>
         </div>
      </>
   );
}
