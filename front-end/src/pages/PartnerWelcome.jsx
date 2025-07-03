import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const PartnerWelcome = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    const isLoggedIn = localStorage.getItem('partnerLoggedIn') === 'true';

    if (isLoggedIn) {
      navigate('/PartnerDashboard');
    } else {
      const confirmLogin = window.confirm("You must be logged in to continue. Click OK to go to the login page.");
      if (confirmLogin) {
        navigate('/Login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#f5f5f5] flex items-center justify-center px-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center border border-gray-200">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#67103d] mb-3 tracking-tight">
          🚴‍♂️ Welcome, Partner!
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
          You're now part of a growing cycling revolution. Let's build your brand, manage your bikes, and accelerate your rentals!
        </p>

        {/* Illustration or Logo Placeholder */}
        <div className="flex justify-center mb-8">
          <div className="w-64 h-40 md:w-72 md:h-44 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-2xl shadow-inner flex items-center justify-center text-[#67103d] text-xl font-semibold tracking-wide">
            Your Logo / Image
          </div>
        </div>

        {/* Dashboard Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={goToProfile}
            className="flex items-center gap-3 bg-[#67103d] text-white px-6 py-3 rounded-full hover:bg-[#50052c] text-lg transition-all shadow-md hover:scale-105"
          >
            Go to Dashboard <ArrowRightCircle size={24} />
          </button>

          {/* Login Text */}
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/Login" className="text-[#67103d] font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerWelcome;
