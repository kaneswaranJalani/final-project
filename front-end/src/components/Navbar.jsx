import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#67103d] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center">
              
              <span className="text-2xl font-bold text-white font-island-moments">
                Rideloop
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/item">Item</NavLink>
            <Link 
              to="/login"
              className="bg-white text-[#67103d] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
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
        <div className="md:hidden bg-[#7a1347] pb-3 px-2">
          <div className="flex flex-col space-y-2">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/item" onClick={() => setIsOpen(false)}>
              Item
            </MobileNavLink>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-white text-[#67103d] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mx-2"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink component for desktop
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:bg-[#7a1347] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </Link>
);

// Reusable NavLink component for mobile
const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-white hover:bg-[#8a1a54] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 mx-1"
  >
    {children}
  </Link>
);

export default Navbar;