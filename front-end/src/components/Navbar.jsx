import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-[#67103d] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                         <Link 
                            to="/"
                            className="text-2xl font-bold text-white font-island-moments"
                        >
                            Rideloop
                        </Link>
                    </div>

                    {/* Menu Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link 
                            to="/" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/Item" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Item
                        </Link>
                        <Link 
                            to="/SelectItem" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            SelectItem
                        </Link>
                        <Link 
                            to="/login" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Signup
                        </Link>
                        
                        {/* <Link 
                            to="/feedback" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Feedback
                        </Link> */}
                        <Link 
                            to="/payment" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Payment
                        </Link>
                        <Link 
                            to="/AdminDashboard" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            AdminDashboard
                        </Link>
                        <Link 
                            to="/SuccessfulRegister" 
                            className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                           SuccessfulRegister
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;