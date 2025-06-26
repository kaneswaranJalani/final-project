import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import HomeIcon from '/home/uki/bicycle-rent-project/front-end/src/assets/home-icon.jpeg';
import Parade from '/home/uki/bicycle-rent-project/front-end/src/assets/20130513172010324_2.jpg';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  // GSAP animation for hero
  useEffect(() => {
    const heroTl = gsap.timeline();

    heroTl.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(subheadingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.7")
      .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
      .fromTo(".hero-image", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=1")
      .fromTo(".hero-blob", { opacity: 0, scale: 0.5 }, { opacity: 0.8, scale: 1, duration: 1.5 }, "-=1.5");

    gsap.to(".hero-image", { y: 15, duration: 2, repeat: -1, yoyo: true });
    gsap.to(".hero-blob", { rotation: 360, duration: 60, repeat: -1, ease: "none" });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf(".hero-image");
      gsap.killTweensOf(".hero-blob");
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date('2026-06-15T00:00:00').getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-16 pb-32 md:pt-20 md:pb-40 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        <div className="hero-blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#8B5CF6" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1.5C87,13.3,81.3,26.6,73.6,39.3C65.9,52.1,56.1,64.2,43.4,72.5C30.8,80.8,15.4,85.4,-0.2,85.6C-15.8,85.8,-31.6,81.7,-45.8,73.9C-60,66.2,-72.6,54.8,-79.7,40.8C-86.9,26.8,-88.5,10.2,-86.2,-5.7C-83.8,-21.5,-77.5,-36.5,-67.4,-47.8C-57.3,-59.1,-43.5,-66.7,-29.9,-74C-16.3,-81.3,-2.9,-88.3,9.4,-87.7C21.7,-87.1,30.5,-83.7,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Explore the World <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                  On Your Terms
                </span>
              </h1>
              <p ref={subheadingRef} className="mt-6 text-xl text-indigo-100 max-w-lg mx-auto lg:mx-0">
                Premium bikes, cars, and vans for your journey. Rent with ease, travel with freedom.
              </p>
              <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => navigate('/uservehiclelist')} className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Browse Vehicles
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('/about')} className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/30 font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <img src={HomeIcon} alt="SK Rentals Vehicles" className="rounded-2xl hero-image w-full h-auto max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Ride the City Section */}
      <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left mt-10 md:mt-0">
            <h1 className="text-5xl font-bold mb-4">Ride the City</h1>
            <h2 className="text-3xl font-semibold mb-6">Your Way</h2>
            <p className="text-xl mb-8 text-gray-600">
              Discover affordable bike rentals at 100+ locations across the city. Perfect for commuting, exploring, or just enjoying a ride.
            </p>
            <Link to="/register">
              <div className="flex justify-center mb-6">
                <button className="bg-gradient-to-r from-[#67103d] to-[#8b1c4d] text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition duration-200">
                  Join with us
                </button>
              </div>
            </Link>
          </div>

          <div className="flex justify-center">
            <img src={HomeIcon} alt="home-icon" className="w-[800px] h-auto rounded-lg" />
          </div>
        </div>
      </section>

      {/* Cycle Parade Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center gap-20">
            <img src={Parade} alt="Cycle Parade" className="w-120 h-80 rounded-lg shadow-lg" />
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md w-150 h-80">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Cycle Parade</h3>
            <p className="text-gray-600">
              A cycle parade is a public event where a group of people ride bicycles together along a planned route. It is often organized to promote eco-friendly transportation, health awareness, or special causes. Participants of all ages join the parade, making it a fun and energetic event. Cycle parades help spread important messages while encouraging the use of bicycles as a clean and healthy mode of transport.
            </p>
          </div>
        </div>
      </section>

      {/* Program Invitation Section */}
      <section className="py-20 bg-gray-200 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Annual Cycling Festival</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12">
            Don't miss our biggest event of the year! Three days of cycling activities, workshops, and community building for cyclists of all levels.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-white px-6 py-4 rounded-lg shadow">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm uppercase">{label}</div>
              </div>
            ))}
          </div>

          <a
            href="https://docs.google.com/forms/d/1MIxjSED-oELrJXk9EzIg8hj3XNpWQj3wmZNcwc94JeA/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#67103d] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition duration-200"
          >
            Register Now
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#67103d] shadow-md text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Info */}
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
            <ul className="space-y-2">
              {['daily rentals', 'corporate programme', 'group tours', 'hourly rental'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-300 hover:text-white capitalize">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p className="text-gray-300 mb-4">For inquiries or support:</p>
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
