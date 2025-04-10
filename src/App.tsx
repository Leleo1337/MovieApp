import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";

export default function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Main" element={<Movies />} />
         </Routes>
      </>
   );
}
