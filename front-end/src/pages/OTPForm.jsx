import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);

  const sendOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/otp/send-otp', { email });
      toast.success(res.data.message);
      setIsOTPSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: "auto" }}>
      <h2>OTP Authentication</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      {!isOTPSent ? (
        <button onClick={sendOTP} style={{ width: '100%', padding: 10 }}>
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            style={{ width: '100%', padding: 10, margin: '10px 0' }}
          />
          <button onClick={verifyOTP} style={{ width: '100%', padding: 10 }}>
            Verify OTP
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default OTPForm;
