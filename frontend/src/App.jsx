import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from "./Pages/SignUp.jsx"
import Signin from "./Pages/Signin.jsx"
import Dashboard from "./Pages/Dashboard.jsx"
import Send from "./Pages/Send.jsx"
import Land from './Pages/Land.jsx'
import Profile from './Pages/Profile.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Land/>}></Route>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/send" element={<Send/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
