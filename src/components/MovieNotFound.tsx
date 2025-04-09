import { Film } from "lucide-react";

export default function MovieNotFound() {
   return (
      <div className="w-full">
         <div className="flex flex-col justify-center items-center w-full rounded-md bg-secondary/80 mx-auto h-80">
            <Film size={60} color="gray" />
            <h1 className="text-xl font-bold text-gray-400">No movies found</h1>
            <p className="text-gray-400">Try searching for something else</p>
         </div>
      </div>
   );
}
