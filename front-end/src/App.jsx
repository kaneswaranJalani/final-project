import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  

  return (
    <>
     <Navbar/>
     <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path="/Login"element={<Login/>}/>
      <Route path="/Signup"element={<Signup/>}/>
     </Routes>
    </>
  )
}

export default App
