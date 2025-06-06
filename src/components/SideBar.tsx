import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function SideBar({ renderButtons }: any) {
   return (
      <>
         <div className="absolute z-20 right-0 w-[60vw] h-screen bg-sideBar border-l-1 border-gray-400/10 shadow">
            <div className="border-b border-gray-400/10 h-20">
               <Link to={"profile"}>
                  <img
                     className="absolute top-4 left-4 w-9 rounded-full outline-1 outline-gray-700/50"
                     src="https://avatars.githubusercontent.com/u/168025120?v=4"
                  />
                  <p className="absolute top-6 left-16 text-sm text-gray-500">Admin</p>
               </Link>
            </div>
            <div className="flex flex-col gap-2 mt-4">{renderButtons}</div>
            <div className="absolute bottom-0 flex justify-center items-center w-full h-16 border-y border-gray-400/10">
               <Link to="/" className="flex gap-2 text-white">
                  Log-out
                  <LogOut />
               </Link>
            </div>
         </div>
      </>
   );
}
