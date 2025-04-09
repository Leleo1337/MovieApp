import { Calendar, Clock, Star } from "lucide-react";
import { MovieProps } from "../types/types.ts";
import imageNotFound from '../assets/imageNotFound.png'

export default function Card({ title, poster_path, release_date, vote_average, runtime, isInWatchList, overview ,addToWatchList, removeFromWatchList }: MovieProps) {
   const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
   
   return (
      <div className="w-full max-w-[320px] rounded-xl hover:scale-105 group transition-all ease-in">
         <div>
            <img className="h-100 w-full" src={imageUrl.includes("null")? imageNotFound: imageUrl } alt="Movie Image" />
         </div>
         <div className="relative bg-secondary px-2 rounded-b-2xl py-4">
            <div className="flex items-center justify-between pb-4 gap-2">
               <h1 className="font-bold text-lg flex-1 truncate" title={title}>
                  {title}
               </h1>
               <div className="flex justify-center items-center gap-1 bg-yellow-400/25 px-1.5 py-0.5 rounded-md">
                  <Star size={20} color="oklch(79.5% 0.184 86.047)" fill="oklch(79.5% 0.184 86.047)" /> {/* tailwind Yellow-500 = oklch(79.5% 0.184 86.047)*/}
                  <span className="font-semibold text-yellow-500">{Number(vote_average).toFixed(1)}</span>
               </div>
               <div className="absolute bottom-full left-0 w-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto group-hover:p-4 bg-secondary/30 backdrop-blur-sm text-white dark:text-gray-200 overflow-hidden rounded-t-lg shadow-lg text-sm px-4">
               {overview}
               </div>
            </div>
            <div className="pb-2">
               <div className="flex gap-4 max-h-[164px]">
                  <div className="flex gap-2">
                     <Calendar />
                     <span>{release_date}</span>
                  </div>
                  <div className="flex gap-2">
                     <Clock />
                     <span>{runtime || "unknown"}</span>
                  </div>
               </div>
            </div>
            <button onClick={isInWatchList? removeFromWatchList : addToWatchList} className={`w-full py-2 ${isInWatchList? "bg-red-500/60 hover:bg-red-500/40" :"bg-button/60 hover:bg-button/40" } rounded-md my-2 cursor-pointer transition ease`}>{isInWatchList ? "Remove from WatchList" : " + Add to Watchlist"}</button>
         </div>
      </div>
   );
}
