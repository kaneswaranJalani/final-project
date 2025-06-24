import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date('2026-06-15T00:00:00').getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ride the City</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Your Way</h2>
          <p className="text-lg mb-8 max-w-2xl text-gray-700">
            Discover affordable bike rentals at 100+ locations across the city. Perfect for commuting, exploring, or just enjoying a ride.
          </p>
          <Link to="/register">
            <button className="bg-gradient-to-r from-[#67103d] to-[#8b1c4d] text-white font-bold py-3 px-8 rounded-full  hover:scale-[1.03] transition-transform  duration-00">
              Join with us
            </button>
          </Link>
        </div>
      </section>

      {/* Cycle Parade Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Cycle Parade</h3>
          <p className="text-gray-600">
            A cycle parade is a public event where a group of people ride bicycles together along a planned route. It is often organized to promote eco-friendly transportation, health awareness, or special causes. Participants of all ages join the parade, making it a fun and energetic event. Cycle parades help spread important messages while encouraging the use of bicycles as a clean and healthy mode of transport.
          </p>
        </div>
      </section>

      {/* Program Invitation Section */}
      <section className="py-20 bg-gray-200 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Annual Cycling Festival</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12">Don't miss our biggest event of the year! Three days of cycling activities, workshops, and community building for cyclists of all levels.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold">{timeLeft.days}</div>
              <div className="text-sm uppercase">Days</div>
            </div>
            <div className="bg-white px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm uppercase">Hours</div>
            </div>
            <div className="bg-white px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm uppercase">Minutes</div>
            </div>
            <div className="bg-white px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm uppercase">Seconds</div>
            </div>
          </div>
          
          <Link to="/register" className="inline-block bg-[#67103d] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition">
            Register Now
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#67103d] shadow-md text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Rideloop Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Rideloop</h4>
            <p className="text-gray-300">
              Making urban mobility <br /> sustainable, affordable, <br /> and fun since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'about', 'items', 'services'].map((link) => (
                <li key={link}>
                  <Link to={`/${link}`} className="text-gray-300 hover:text-white capitalize">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2 mb-6">
              {['daily rentals', 'corporate programme', 'group tours', 'hourly rental'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-300 hover:text-white capitalize">{service}</Link>
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
              <p>Achchelu / Neavelly</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;