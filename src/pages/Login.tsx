import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.add("bg-primary");

    return () => {
      bodyElement.classList.remove("bg-primary");
    };
  }, []);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-[95%] max-w-[400px] -translate-1/2 rounded-2xl bg-secondary p-8 shadow-xl border border-gray-700 backdrop-blur-xl">
        <div className="text-center pb-8">
          <h1 className="font-semibold text-white text-xl">Welcome Back!</h1>
          <p className="text-gray-300">Sign in to your movie watchlist!</p>
        </div>
        <div>
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="text-gray-300 text-sm" htmlFor="username">
                Username
              </label>
              <input
                className="text-gray-100 bg-gray-700/50 border border-gray-600 px-4 py-2 rounded-md shadow"
                autoComplete="off"
                value={"Click login to continue"}
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-300 text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="text-gray-100 bg-gray-700/50 border border-gray-600 px-4 py-2 rounded-md shadow"
                type="password"
                name="username"
                id="username"
              />
            </div>
            <Link
              to="/main"
              className="block text-center w-full bg-button hover:bg-button/70 active:bg-button/50 transition duration-100 ease py-2 text-white rounded-sm cursor-pointer"
            >
              Login
            </Link>
            <p className="text-white">
              Don't have an account?{" "}
              <a href="#" className="text-button border-b-1">
                Sign-up
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
