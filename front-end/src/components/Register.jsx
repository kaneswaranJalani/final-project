import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Register = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const footerRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        cardRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        footerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Role Selection Box */}
      <div
        ref={cardRef}
        className="w-full max-w-4xl px-8 py-12 bg-white rounded-3xl shadow-2xl border border-gray-200"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">
          Join Rideloop
        </h2>
        <p className="text-base text-gray-600 mb-8 text-center font-medium">
          Choose your role to start your journey
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* User Card */}
          <Link
            to="/UserRegister"
            className="flex-1 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg px-8 py-10 rounded-xl hover:scale-[1.03] transition-all duration-300 group"
          >
            <h3 className="text-[#67103d] font-bold text-2xl mb-3">🚴‍♂️ User</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-800 font-medium">
              Rent premium cycles for personal use, commuting, and adventures.
            </p>
          </Link>

          {/* Partner Card */}
          <Link
            to="/PartnerRegister"
            className="flex-1 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg px-8 py-10 rounded-xl hover:scale-[1.03] transition-all duration-300 group"
          >
            <h3 className="text-[#67103d] font-bold text-2xl mb-3">🤝 Partner</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-800 font-medium">
              List your bicycle, earn money, and grow your rental business.
            </p>
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div ref={footerRef} className="mt-10 flex flex-col items-center gap-4">
        <div className="text-sm text-gray-600 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#67103d] font-semibold hover:text-[#4c092b] transition-all duration-200 underline"
          >
            Login
          </Link>
        </div>
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-all duration-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Register;