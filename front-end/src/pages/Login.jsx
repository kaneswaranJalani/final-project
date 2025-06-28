import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cardRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    if (cardRef.current && headerRef.current && formRef.current && socialRef.current) {
      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          formRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          socialRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" },
          "-=0.3"
        );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert("");
    setIsLoading(true);

    if (!email || !password) {
      setAlert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Simulate login logic (no backend)
    setTimeout(() => {
      setIsAuthenticated(true);

      const user = {
        email,
        role: email === "admin@gmail.com" ? "admin" : "user",
      };

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
      <div ref={cardRef} className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div ref={headerRef} className="bg-gradient-to-r from-[#67103d] to-[#4c092b] py-8 px-10 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
          <p className="text-gray-200 text-base mt-2 font-medium">
            Sign in to continue your Rideloop journey
          </p>
        </div>

        <div className="p-10">
          {alert && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-sm flex items-center shadow-sm">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {alert}
            </div>
          )}

          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3.5 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-[#67103d] to-[#4c092b] transition-all duration-300 ${
                isLoading ? 'opacity-75' : 'hover:scale-105'
              }`}
            >
              {isLoading ? "Signing in..." : <>Sign In <FaArrowRight className="ml-2" /></>}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div ref={socialRef} className="mt-8 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              <FaGithub className="h-5 w-5 text-gray-800 mr-2" />
              GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold text-[#67103d] hover:text-[#4c092b]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
