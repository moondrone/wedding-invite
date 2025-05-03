import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Invite from './pages/Invite'
import Home from './pages/Home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/invite/:id" element={<Invite />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
