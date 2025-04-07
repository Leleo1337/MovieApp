import { Film } from "lucide-react";

type MovieNotFoundProps = {
  searchQuery: string;
};

export default function MovieNotFound({ searchQuery }: MovieNotFoundProps) {
  return (
    <div className="w-[80%] mt-12 mx-auto">
      <p className="text-xl text-gray-300 font-semibold">{searchQuery}</p>
      <div className="flex flex-col justify-center items-center w-full bg-secondary/80 mx-auto h-80">
        <Film size={60} color="gray" />
        <h1 className="text-xl font-bold text-gray-400">No movies found</h1>
        <p className="text-gray-400">Try searching for something else</p>
      </div>
    </div>
  );
}
