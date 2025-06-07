function Home() {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <a href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">Home</a>
                <a href="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">About</a>
                <a href="/services" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">Services</a>
                <a href="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">Contact</a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-700">Login</a>
                <a href="/signup" className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign Up</a>
              </div>
            </div>
          </nav>
        </header>
  
        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Welcome to Our Website</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                This is the home page. You can add more content here.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
  
          {/* Featured Content */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Featured Content</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {/* Service 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Service 1</h3>
                  <p className="text-gray-600">Description of service 1.</p>
                </div>
                
                {/* Service 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Service 2</h3>
                  <p className="text-gray-600">Description of service 2.</p>
                </div>
                
                {/* Service 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Service 3</h3>
                  <p className="text-gray-600">Description of service 3.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
  
        {/* Footer */}
        <footer className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <p className="text-white text-sm mb-4">&copy; 2024 Your Company. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  export default Home;