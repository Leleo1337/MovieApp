import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'

export default function App(){
    return(
        <>
            <BrowserRouter basename='/MovieWatchList/'>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Main" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}