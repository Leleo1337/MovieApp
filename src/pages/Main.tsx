import { Menu, TrendingUp, Star, Clock, Heart, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Button from '../components/Button';

export default function Main() {

  const [ sideActive, setSideActive ] = useState(false)
  const [ watchList, setWatchlist ] = useState(0)

  function disableSideBar(): void{
    const width = window.innerWidth

    if(width >= 768){
      setSideActive(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", disableSideBar)

    return () => {
      window.removeEventListener("resize", disableSideBar)
    }
  },[])

  useEffect(() => {
        const bodyElement = document.body
        bodyElement.classList.add("bg-secondary")

        return () => {
            bodyElement.classList.remove("bg-secondary")
        }
  },[])
  
  return (
    <>
      <header className='bg-primary'>
        <Menu className='absolute z-1 top-6 right-4 text-white sm:hidden' size={28} onClick={() => setSideActive(prev => !prev)} />
          <div className='flex flex-col gap-8 sm:flex-row sm:items-center pb-8'>
            <div>
              {sideActive &&
                <SideBar watchList={watchList} />
              }
              <h1 className="sm:justify-between md:text-center font-semibold pl-4  pt-4 text-3xl bg-gradient-to-r from-[#A78BFA] via-[#7D6D99] to-[#4C3A66] bg-clip-text text-transparent">Movie Watchlist</h1>
            </div>
            <div className='px-4 sm:w-full'>
              <input
                type="text"
                placeholder='Search for movies...'
                className="w-full mx-auto mt-8 text-gray-100 bg-gray-700/50 border border-gray-600 px-4 py-2 rounded-md shadow"
              />
            </div>
          </div>
          <div className='hidden sm:flex '>
              <Button text={"Popular"} emoji={<TrendingUp />} active={true}/>
              <Button text={"Top Rated"} emoji={<Star />} active={false}/>
              <Button text={"Upcoming"} emoji={<Clock />} active={false}/>
              <Button text={`WatchList (${watchList})`} emoji={<Heart />} active={false}/>
          </div>
      </header>
    </>
  )
}

/* 
            <Button text={"Popular"} emoji={<TrendingUp />}/>
            <Button text={"Popular"} emoji={<Star />}/>
            <Button text={"Popular"} emoji={<Clock />}/>
            <Button text={"Popular"} emoji={<Heart />}/>
*/