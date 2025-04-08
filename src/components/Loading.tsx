import { Film } from "lucide-react";

export default function Loading() {
   return (
      <div className="w-full">
         <p className="text-xl text-gray-300 font-semibold"></p>
         <div className="flex flex-col justify-center items-center w-full rounded-md bg-secondary/80 mx-auto h-80">
            <Film size={60} color="gray" />
            <h1 className="text-xl font-bold text-gray-400">Getting movies...</h1>
         </div>
      </div>
   );
}
