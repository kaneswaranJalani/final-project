import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Register from "./components/Register"
import UserRegister from "./pages/UserRegister"
// import UserRegisterStep1 from "./pages/UserRegisterStep1"
// import UserRegisterStep2 from "./pages/UserRegisterStep2"
import PartnerRegister from "./pages/PartnerRegister"
import Feedback from "./pages/Feedback"
// import Footer from "./components/Footer"
import Payment from "./pages/Payment"
import AdminDashboard from "./pages/AdminDashboard"
// import SuccessMessagePage from "./pages/SuccessMessagePage"
// import SelectItem from "./pages/SelectItem"
import SuccessfulRegister from "./pages/SuccessfulRegister" 
import Item from "./pages/Item"
import Terms from "./pages/Terms"
import PartnerTerms from "./pages/PartnerTerms"
import Reciept from "./pages/Reciept"
import Order from "./pages/Order"
import PaymentSuccess from "./pages/PaymentSuccess"
import PartnerProfile from "./pages/PartnerProfile"
import PartnerWelcome from "./pages/PartnerWelcome"
import PartnerDashboard from "./pages/PartnerDashboard"
import BicycleTracking from "./pages/BicycleTracking"
// import Map from "./pages/Map"
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
      {/* <Route path="/UserRegisterStep1" element={<UserRegisterStep1/>}/>
      <Route path="/UserRegisterStep2" element={<UserRegisterStep2/>}/> */}
      <Route path="/PartnerRegister" element={<PartnerRegister/>}/>
      <Route path="/Feedback" element={<Feedback/>}/>
      <Route path="/Payment" element={<Payment/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      {/* <Route path="/SuccessMessagePage" element={<SuccessMessagePage/>}/> */}
      {/* <Route path="/SelectItem" element={<SelectItem/>}/> */}
      <Route path="/SuccessfulRegister" element={<SuccessfulRegister/>}/>
      <Route path="/Item" element={<Item/>}/>
      <Route path="/Terms" element={<Terms/>}/>
      <Route path="/PartnerTerms" element={<PartnerTerms/>}/>
      <Route path="/Reciept" element={<Reciept/>}/>
      <Route path="/Order" element={<Order/>}/>
      <Route path="/PaymentSuccess" element={<PaymentSuccess/>}/>
      <Route path="/PartnerProfile" element={<PartnerProfile/>}/>
      <Route path="/PartnerWelcome" element={<PartnerWelcome/>}/>
      <Route path="/PartnerDashboard" element={<PartnerDashboard/>}/>
      <Route path="/BicycleTracking" element={<BicycleTracking/>}/>
      {/* <Route path="/Map" element={<Map center={[12.9716, 77.5946]} markerPosition={[12.9716, 77.5946]} />} /> */}
     </Routes>
    {/* <Footer/> */}
     
    </>
  )
}

export default App
