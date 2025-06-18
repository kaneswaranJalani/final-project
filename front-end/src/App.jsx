import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Register from "./components/Register"
import UserRegister from "./pages/UserRegister"
import PartnerRegister from "./pages/PartnerRegister"
import Feedback from "./pages/Feedback"
// import Footer from "./components/Footer"
import Payment from "./pages/Payment"
import AdminDashboard from "./pages/AdminDashboard"
import SuccessMessagePage from "./pages/SuccessMessagePage"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  

  return (
    <>
     <Navbar/>
     
     <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path="/Login"element={<Login/>}/>
      <Route path="/Signup"element={<Signup/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/UserRegister" element={<UserRegister/>}/>
      <Route path="/PartnerRegister" element={<PartnerRegister/>}/>
      <Route path="/Feedback" element={<Feedback/>}/>
      <Route path="/Payment" element={<Payment/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      <Route path="/SuccessMessagePage" element={<SuccessMessagePage/>}/>
     </Routes>
    {/* <Footer/> */}
     
    </>
  )
}

export default App
