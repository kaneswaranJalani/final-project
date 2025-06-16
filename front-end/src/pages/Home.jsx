import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ride the City</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Your Way</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover affordable bike rentals at 100+ locations across the city. Perfect for commuting, exploring, or just enjoying a ride.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
            Register
          </button>
        </div>
      </section>

      {/* Cycle Parade Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Cycle parade</h3>
          <p className="text-gray-600">
            A cycle parade is a public event where a group of people ride bicycles together along a planned route. It is often organized to promote eco-friendly transportation, health awareness, or special causes. Participants of all ages join the parade, making it a fun and energetic event. Cycle parades help spread important messages while encouraging the use of bicycles as a clean and healthy mode of transport.
          </p>
        </div>
      </section>

      {/* Footer/Collection Section */}
      <footer className="bg-[#67103d]  shadow-md text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Ridclop Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Rideloop</h4>
            <p className="text-gray-300">
              Making urban mobility <br/> sustainable, affordable,<br/> and fun since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick links</h4>
            <ul className="space-y-2">
              {['home', 'about', 'items', 'services'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white capitalize">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2 mb-6">
              {['daily rentals', 'corporate programme', 'group tours', 'hourly rental'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-white capitalize">{service}</a>
                </li>
              ))}
            </ul>
            </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p className="text-gray-300 mb-4">
              For inquiries or support, reach out to us at:
            </p>
            <div className="text-gray-300 space-y-2">
              <p>+94 1234 456 789</p>
              <p>jalanj@gmail.com</p>
              <p>Achchelu/Neavelly</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;