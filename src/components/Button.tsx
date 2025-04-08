import clsx from "clsx";
import { ButtonProps } from "../types/types";

export default function Button({ emoji, text, active, onClick }: ButtonProps) {
   const buttonStyles = clsx(
      `flex flex-row-reverse justify-center gap-2 px-2 py-2 cursor-pointer sm:rounded-md sm:py-1.5 hover:bg-button/10 transition ease-in`,
      {
         "text-gray-300 sm:bg-[#171717]": !active,
         "text-button sm:bg-[#4b3e66]": active,
         "sm:text-gray-300": active || !active
      }
   )

   return (
      <>
         <button onClick={onClick} className={buttonStyles}>
            {text}
            {emoji}
         </button>
      </>
   );
}
