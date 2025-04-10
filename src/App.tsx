import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Movies from './pages/Movies'

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Main" element={<Movies />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}