import clsx from "clsx";

type ButtonTypes = {
  emoji: React.ReactNode;
  text: string;
  active: boolean;
};

export default function Button({ emoji, text, active }: ButtonTypes) {
  const buttonStyles = clsx(
    `flex flex-row-reverse justify-center gap-2 px-2 py-2 cursor-pointer sm:rounded-md sm:py-1.5 `,
    {
      "text-gray-300 sm:bg-[#171717]": !active,
      "text-button sm:bg-[#4b3e66]": active,
      "sm:text-gray-300": active || !active,
    }
  );

  return (
    <>
      <button className={buttonStyles}>
        {text}
        {emoji}
      </button>
    </>
  );
}
