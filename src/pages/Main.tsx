import { Menu, TrendingUp, Star, Clock, Heart, Github, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MovieProps, ButtonProps } from "../types/types.ts";
import {
   fetchPopularMovies,
   fetchTopRatedMovies,
   fetchUpcommingMovies,
   handleQueryRequests,
} from "../services/apiServices.ts";
import SideBar from "../components/SideBar";
import PageButton from "../components/PageButton.tsx";
import Card from "../components/Card";
import Loading from "../components/Loading.tsx";
import EmptyWatchList from "../components/EmptyWatchList.tsx";
import SearchDropDown from "../components/SearchDropDown.tsx";
import MovieNotFound from "../components/MovieNotFound.tsx";

export default function Main() {
   //header / sidebar
   const [sideActive, setSideActive] = useState<boolean>(false);

   // tabs
   const [activeIndex, setActiveIndex] = useState<number | null>(0);

   //movies
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [watchList, setWatchlist] = useState<MovieProps[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [notFound, setNotFound] = useState<boolean>(false);
   const [movieTab, setMovieTab] = useState<number>(1);

   //dropdown
   const [query, setquery] = useState<string>("");
   const [search, setSearch] = useState<string>("");
   const [results, setResults] = useState<MovieProps[]>([]);
   const [showDropDown, setShowDropDown] = useState(true);

   const PageButtonsArr: ButtonProps[] = [
      {
         text: "Popular",
         emoji: <TrendingUp />,
         active: false,
         onClick: () => handleFetchPopularMovies(1),
      },
      {
         text: "Top Rated",
         emoji: <Star />,
         active: false,
         onClick: () => handleFetchTopRatedMovies(1),
      },
      {
         text: "Upcoming",
         active: true,
         emoji: <Clock />,
         onClick: () => handleFetchUpcommingMovies(1),
      },
      {
         text: `WatchList (${watchList.length})`,
         active: false,
         emoji: <Heart />,
         onClick: renderWatchList,
      },
   ];

   const renderButtons = PageButtonsArr.map((button, index) => (
      <PageButton
         key={index}
         emoji={button.emoji}
         text={button.text}
         active={activeIndex == index}
         onClick={() => {
            setActiveIndex(index);
            setMovieTab(1);
            setSearch("");
            button.onClick?.();
         }}
      />
   ));

   async function handleFetchPopularMovies(movieTab: number) {
      try {
         setIsLoading(true);
         const movies = await fetchPopularMovies(movieTab);
         setMovies(movies);
      } catch (e) {
         console.error("Failed to fetch movies:", e);
      } finally {
         setNotFound(false);
         setIsLoading(false);
      }
   }

   async function handleFetchTopRatedMovies(movieTab: number) {
      try {
         setIsLoading(true);
         const movies = await fetchTopRatedMovies(movieTab);
         setMovies(movies);
      } catch (e) {
         console.error("Failed to fetch movies:", e);
      } finally {
         setNotFound(false);
         setIsLoading(false);
      }
   }

   async function handleFetchUpcommingMovies(movieTab: number) {
      try {
         setIsLoading(true);
         const movies = await fetchUpcommingMovies(movieTab);
         setMovies(movies);
      } catch (error) {
         console.error("Failed to fetch movies: ", error);
      } finally {
         setNotFound(false);
         setIsLoading(false);
      }
   }

   async function handleSubmit(query: string) {
      const data = await handleQueryRequests(query, 1);

      if (data.length > 0) {
         setNotFound(false);
         setMovies(data);
         setShowDropDown(false);
         return;
      }
      setMovies([]);
      setNotFound(true);
   }

   function handleDropDownFunctions(movieTitle: string, movieObj: MovieProps): void {
      setSearch(movieTitle);
      setMovies([movieObj]);
      setShowDropDown(false);
      setActiveIndex(null);
      setNotFound(false);
   }

   function handleInputFunctions(e: React.ChangeEvent<HTMLInputElement>): void {
      setSearch(e.target.value);
      setquery(e.target.value);
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
      if (query.trim() === "") {
         setResults([]);
         setShowDropDown(false);
         return;
      }
      const fetchData = async () => {
         try {
            const data = await handleQueryRequests(query, movieTab);
            setResults(data.slice(0, 3));
            setShowDropDown(true);

            console.log(data);
         } catch (e) {
            console.error("[Error] Something went wrong! try again later");
         }
      };

      const delayDebounce = setTimeout(() => {
         fetchData();
      }, 350);

      return () => clearTimeout(delayDebounce);
   }, [query]);

   useEffect(() => {
      if (activeIndex === 3) {
         setMovies(watchList);
      }
   }, [watchList, activeIndex]);

   useEffect(() => {
      handleFetchPopularMovies(1);
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

   useEffect(() => {
      if (activeIndex === 0) {
         handleFetchPopularMovies(movieTab);
      } else if (activeIndex === 1) {
         handleFetchTopRatedMovies(movieTab);
      } else if (activeIndex === 2) {
         handleFetchUpcommingMovies(movieTab);
      }
   }, [movieTab, activeIndex]);

   return (
      <>
         <header className="sticky top-0 z-10 bg-secondary/80 backdrop-blur-lg pb-8 sm:pb-2 sm:mb-8">
            <Menu
               className="absolute z-21 top-6 right-4 text-white sm:hidden"
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
               <div className="relative px-4 sm:w-[70%]">
                  <input
                     type="text"
                     name="search"
                     placeholder="Search for movies..."
                     autoComplete="off"
                     className="w-full mx-auto sm:mt-8 text-gray-100 bg-gray-700/50 border border-gray-600 px-4 py-2 md:py-3 rounded-md shadow"
                     onChange={(e) => handleInputFunctions(e)}
                     onKeyDown={(e) => e.key === "Enter" && handleSubmit(query)}
                  />
                  {showDropDown && results.length > 0 && (
                     <ul className="absolute  top-full left-3 py-2 bg-secondary right-0 mt-1 rounded-md shadow-lg z-20">
                        {results.map((movie) => (
                           <SearchDropDown
                              key={movie.id}
                              title={movie.title}
                              poster_path={movie.poster_path}
                              overView={movie.overview}
                              click={() => handleDropDownFunctions(movie.title, movie)}
                           />
                        ))}
                     </ul>
                  )}
               </div>
            </div>
            <div className="hidden sm:flex gap-1.5 mx-auto justify-baseline w-[90%] pt-8 pb-6">{renderButtons}</div>
         </header>
         <main>
            {search && (
               <div className="w-[90%] mx-auto">
                  <p className="text-xl text-gray-300 font-semibold">Search results for "{search}"</p>
               </div>
            )}
            <div className="flex justify-center w-[90%] mx-auto pb-10 mt-4">
               <div className="flex justify-center items-center flex-wrap mx-auto gap-6 w-full text-white">
                  {activeIndex == 3 && watchList.length <= 0 && <EmptyWatchList />}

                  {notFound && <MovieNotFound />}

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
            <div className="flex items-center justify-center mx-auto text-center pb-30">
               <div className="flex gap-2  text-gray-300 rounded-xl">
                  {activeIndex !== 3 && (
                     <>
                        <ArrowLeft
                           size={30}
                           onClick={() => setMovieTab((prev) => (prev <= 1 ? 1 : prev - 1))}
                           className="cursor-pointer hover:text-white active:scale-105"
                        />
                        <ArrowRight
                           size={30}
                           onClick={() => setMovieTab((prev) => prev + 1)}
                           className="cursor-pointer hover:text-white active:scale-105"
                        />
                     </>
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
