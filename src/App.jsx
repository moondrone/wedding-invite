import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Invite from './pages/Invite'
import AcceptedPage from './pages/AcceptedPage'
import Home from './pages/Home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/invite/:code" element={<Invite />} />
                <Route path="/accepted/:code" element={<AcceptedPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
