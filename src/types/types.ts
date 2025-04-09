export interface MovieProps {
   id?: number;
   title: string;
   poster_path: string;
   release_date: string;
   vote_average: number;
   overview: string
   runtime?: number;
   isInWatchList: boolean;
   addToWatchList: () => void;
   removeFromWatchList: () => void;
}
export interface MovieNotFoundProps {
   searchQuery: string;
}

export interface SearchResultProps{
   title: string
   poster_path: string
   overView: string
   click: () => void
}

export interface ButtonProps {
   emoji: React.ReactNode;
   text: string;
   active: boolean;
   onClick: () => void;
}

export interface SideBarProps {
   watchList: number;
   renderWatchList: () => void;
   onPopularClick: () => void;
   onTopRatedClick: () => void;
   onUpCommingClick: () => void;
}
