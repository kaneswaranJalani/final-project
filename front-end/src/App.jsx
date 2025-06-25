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
import SelectItem from "./pages/SelectItem"
import SuccessfulRegister from "./pages/SuccessfulRegister" 
import Item from "./pages/Item"
import Terms from "./pages/Terms"
import PartnerTerms from "./pages/PartnerTerms"
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
      <Route path="/SelectItem" element={<SelectItem/>}/>
      <Route path="/SuccessfulRegister" element={<SuccessfulRegister/>}/>
      <Route path="/Item" element={<Item/>}/>
      <Route path="/Terms" element={<Terms/>}/>
      <Route path="/PartnerTerms" element={<PartnerTerms/>}/>
     </Routes>
    {/* <Footer/> */}
     
    </>
  )
}

export default App
