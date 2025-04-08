import { Film } from "lucide-react";

export default function EmptyWatchList(){
    return(
        <>
            <div className="flex items-center justify-center flex-col gap-8 w-[90%] h-[40vh] bg-secondary rounded-md mt-4">
                <Film color="oklch(70.7% 0.022 261.325)" size={102} />
                <p className="text-gray-400 text-xl font-semibold text-center">You currently have no movies in your Watchlist</p>
            </div>
        </>
    )
}