import { SearchResultProps } from '../types/types'

export default function SearchResult({title, poster_path, overView, click}: SearchResultProps){
    return(
        <li onClick={click} className="bg-secondary border-t border-gray-200/20 p-1.5 hover:bg-button">
          <button className="flex gap-3 text-start max-h-15.5 cursor-pointer">
             <img
                className="w-14 h-16 bg-black rounded-md object-cover "
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
             />
             <div>
                <h4 className="text-xl text-white font-semibold">{title}</h4>
                <p className="text-white text-sm line-clamp-2">{overView}</p>
             </div>
          </button>
       </li>
    )
 }