import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import HomeIcon from '../assets/home-icon2.jpeg';
import Parade from '../assets/20130513172010324_2.jpg';

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

    heroTl
      .fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .fromTo(subheadingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7")
      .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
      .fromTo(".hero-image", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, "-=1")
      .fromTo(".hero-blob", { opacity: 0, scale: 0.5 }, { opacity: 0.6, scale: 1, duration: 1.5, ease: "power3.out" }, "-=1.5");

    gsap.to(".hero-image", { y: 15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-16 pb-32 md:pt-20 md:pb-40 bg-gradient-to-br from-[#67103d] via-[#4c092b] to-gray-900">
        <div className="hero-blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#67103d" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1.5C87,13.3,81.3,26.6,73.6,39.3C65.9,52.1,56.1,64.2,43.4,72.5C30.8,80.8,15.4,85.4,-0.2,85.6C-15.8,85.8,-31.6,81.7,-45.8,73.9C-60,66.2,-72.6,54.8,-79.7,40.8C-86.9,26.8,-88.5,10.2,-86.2,-5.7C-83.8,-21.5,-77.5,-36.5,-67.4,-47.8C-57.3,-59.1,-43.5,-66.7,-29.9,-74C-16.3,-81.3,-2.9,-88.3,9.4,-87.7C21.7,-87.1,30.5,-83.7,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Ride the City <br />
                <span className="text-transparent bg-clip-text bg-white">
                  Your Way
                </span>
              </h1>
              <p ref={subheadingRef} className="mt-6 text-xl text-gray-200 max-w-lg mx-auto lg:mx-0">
                Discover affordable bike rentals at 100+ locations across the city. Perfect for commuting, exploring, or just enjoying a ride.
              </p>
              <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 rounded-lg bg-white text-[#67103d] font-bold text-lg shadow-lg hover:bg-[#4c092b] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Join with us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <img src={HomeIcon} alt="SK Rentals Vehicles" className="rounded-2xl hero-image w-800px h-800px" />
            </div>
          </div>
        </div>
      </section>

      {/* Cycle Parade Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="flex justify-center">
            <img src={Parade} alt="Cycle Parade" className="w-full max-w-[500px] h-auto rounded-lg shadow-lg" />
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-[#67103d] mb-4">Cycle Parade</h3>
            <p className="text-gray-600 leading-relaxed">
              A cycle parade is a public event where a group of people ride bicycles together along a planned route. It is often organized to promote eco-friendly transportation, health awareness, or special causes. Participants of all ages join the parade, making it a fun and energetic event. Cycle parades help spread important messages while encouraging the use of bicycles as a clean and healthy mode of transport.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#67103d] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a variety of bike rental services to meet all your cycling needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Hourly Rentals",
                description: "Perfect for short trips around the city. Rent by the hour with flexible return options.",
                icon: "⏱️"
              },
              {
                title: "Daily Rentals",
                description: "Explore the city at your own pace with our affordable daily rental packages.",
                icon: "🌞"
              },
              {
                title: "Weekly Packages",
                description: "Great for longer stays or regular commuters. Discounted rates for weekly rentals.",
                icon: "📅"
              },
              {
                title: "Group Tours",
                description: "Guided cycling tours of the city's best routes and attractions for groups.",
                icon: "👥"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#67103d] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Invitation Section */}
      <section className="py-20 bg-gray-200 text-black">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#67103d]">Join Our Annual Cycling Festival</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-600">
            Don't miss our biggest event of the year! Three days of cycling activities, workshops, and community building for cyclists of all levels.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-white px-6 py-4 rounded-lg shadow-md border border-gray-300">
                <div className="text-3xl font-bold text-[#67103d]">{value}</div>
                <div className="text-sm uppercase text-gray-600">{label}</div>
              </div>
            ))}
          </div>

          <a
            href="https://docs.google.com/forms/d/1MIxjSED-oELrJXk9EzIg8hj3XNpWQj3wmZNcwc94JeA/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#67103d] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#4c092b] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Register Now
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#67103d] shadow-md text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Rideloop</h4>
            <p className="text-gray-200 leading-relaxed">
              Making urban mobility <br /> sustainable, affordable, <br /> and fun since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'about', 'items', 'services'].map((link) => (
                <li key={link}>
                  <Link to={`/${link}`} className="text-gray-200 hover:text-white transition-colors duration-200 capitalize">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              {['daily rentals', 'corporate programme', 'group tours', 'hourly rental'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-200 hover:text-white transition-colors duration-200 capitalize">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Contact</h4>
            <p className="text-gray-200 mb-4">For inquiries or support:</p>
            <div className="text-gray-200 space-y-2">
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