import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./components/Register"
import UserRegister from "./pages/UserRegister"
import PartnerRegister from "./pages/PartnerRegister"
import Feedback from "./pages/Feedback"
import Payment from "./pages/Payment"
import AdminDashboard from "./pages/AdminDashboard"
import SuccessfulRegister from "./pages/SuccessfulRegister" 
import Item from "./pages/Item"
import Terms from "./pages/Terms"
import PartnerTerms from "./pages/PartnerTerms"
import Reciept from "./pages/Reciept"
import PaymentSuccess from "./pages/PaymentSuccess"
import PartnerProfile from "./pages/PartnerProfile"
import PartnerWelcome from "./pages/PartnerWelcome"
import PartnerDashboard from "./pages/PartnerDashboard"
import BicycleTracking from "./pages/BicycleTracking"
import PartnerVerification from "./pages/PartnerVerification"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  

  return (
    <>
     <Navbar/>
     
     <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path="/Login"element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/UserRegister" element={<UserRegister/>}/> 
      <Route path="/PartnerRegister" element={<PartnerRegister/>}/>
      <Route path="/Feedback" element={<Feedback/>}/>
      <Route path="/Payment" element={<Payment/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      <Route path="/SuccessfulRegister" element={<SuccessfulRegister/>}/>
      <Route path="/Item" element={<Item/>}/>
      <Route path="/Terms" element={<Terms/>}/>
      <Route path="/PartnerTerms" element={<PartnerTerms/>}/>
      <Route path="/Reciept" element={<Reciept/>}/>
      <Route path="/PaymentSuccess" element={<PaymentSuccess/>}/>
      <Route path="/PartnerProfile" element={<PartnerProfile/>}/>
      <Route path="/PartnerWelcome" element={<PartnerWelcome/>}/>
      <Route path="/PartnerDashboard" element={<PartnerDashboard/>}/>
      <Route path="/BicycleTracking" element={<BicycleTracking/>}/>
      <Route path="/PartnerVerification" element={<PartnerVerification/>}/>
     </Routes>
    {/* <Footer/> */}
     
    </>
  )
}

export default App
