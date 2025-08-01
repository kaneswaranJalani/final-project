import { Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./components/Register";
import UserRegister from "./pages/UserRegister";
import PartnerRegister from "./pages/PartnerRegister";
import Feedback from "./pages/Feedback";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/DashboardOverview";
import SuccessfulRegister from "./pages/SuccessfulRegister";
import Item from "./pages/BikeList";
import Terms from "./pages/Terms";
import PartnerTerms from "./pages/PartnerTerms";
import Reciept from "./pages/Reciept";
import PaymentSuccess from "./pages/PaymentSuccess";
import PartnerProfile from "./pages/PartnerProfile";
import PartnerWelcome from "./pages/PartnerWelcome";
import PartnerDashboard from "./pages/PartnerDashboard";
import BicycleTracking from "./pages/BicycleTracking";
import PartnerVerification from "./pages/PartnerVerification";
import Modal from "./pages/ModalForm";
import RentalHistory from "./pages/RentalHistory";
import BikeSelection from "./pages/BikeSelection";
import BikeRental from "./pages/BikeRental";
import CartPage from "./pages/CartPage";
import AdminLayout from "./layouts/AdminLayout";
import OTPForm from "./pages/OTPForm";

// ✅ Load Stripe public key (replace with your own test/public key)
const stripe = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripe);

function App() {
  return (
    <>

      {/* Your routes/components */}
      <ToastContainer position="top-right" autoClose={3000} />
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/PartnerRegister" element={<PartnerRegister />} />
        <Route path="/Feedback" element={<Feedback />} />

        {/* ✅ Wrap Payment in <Elements> */}
        <Route
          path="/Payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />

        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/SuccessfulRegister" element={<SuccessfulRegister />} />
        <Route path="/Item" element={<Item />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/PartnerTerms" element={<PartnerTerms />} />
        <Route path="/Reciept" element={<Reciept />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PartnerProfile" element={<PartnerProfile />} />
        <Route path="/PartnerWelcome" element={<PartnerWelcome />} />
        <Route path="/PartnerDashboard" element={<PartnerDashboard />} />
        <Route path="/BicycleTracking" element={<BicycleTracking />} />
        <Route path="/PartnerVerification" element={<PartnerVerification />} />
        <Route path="/Modal" element={<Modal />} />
        <Route path="/RentalHistory" element={<RentalHistory />} />
        <Route path="/BikeSelection" element={<BikeSelection />} />
        <Route path="/BikeRental" element={<BikeRental />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/otp" element={<OTPForm />} /> 
        
        {/* Fallback route */}
      </Routes>
    </>
  );
}

export default App;
