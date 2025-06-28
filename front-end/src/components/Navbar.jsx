import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { opacity: 0, y: -30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userInfo"); // Clear user info from local storage
  };

  return (
    <nav ref={navbarRef} className="bg-[#67103d] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold text-white font-island-moments bg-clip-text bg-gradient-to-r from-white to-[#67103d]">
                Rideloop
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/item" current={location.pathname === "/item"}>Item</NavLink>
            {isAuthenticated ? (
              <Link
                to="/"
                onClick={handleLogout}
                className="bg-white text-[#67103d] hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-white text-[#67103d] hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none transition-all duration-200"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-[#4c092b] pb-6 px-4">
          <div className="flex flex-col space-y-4 pt-4">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)} current={location.pathname === "/"}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/item" onClick={() => setIsOpen(false)} current={location.pathname === "/item"}>
              Item
            </MobileNavLink>
            {isAuthenticated ? (
              <Link
                to="/"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block text-center bg-white text-[#67103d] hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 mx-4 shadow-md"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-white text-[#67103d] hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 mx-4 shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink component for desktop
const NavLink = ({ to, children, current }) => (
  <Link
    to={to}
    className={`${
      current ? "bg-white text-[#67103d]" : "text-white hover:bg-[#4c092b]"
    } px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300`}
  >
    {children}
  </Link>
);

// Reusable NavLink component for mobile
const MobileNavLink = ({ to, children, onClick, current }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`${
      current ? "bg-white text-[#67103d]" : "text-white hover:bg-[#4c092b]"
    } px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 mx-4`}
  >
    {children}
  </Link>
);

export default Navbar;
