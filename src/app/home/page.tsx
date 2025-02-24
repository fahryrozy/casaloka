"use client";
import React from "react";
import Hero from "./components/hero";
import SearchBar from "./components/searchBar";
import AboutUs from "./components/about";
import OurPartners from "./components/ourPartner";
import Services from "./components/ourServices";
import LksPartner from "./components/lksPartner";
import Blog from "./components/blog";
import ContactUs from "./components/contact";
import ContactUsBanner from "./components/contactBanner";
import Testimonial from "./components/testimonial";

const Home: React.FC = () => {
  return (
    <div className="bg-white flex flex-col">
      <Hero />
      <SearchBar />
      <AboutUs />
      <Testimonial />
      <OurPartners />
      <ContactUsBanner />
      <Services />
      <LksPartner />
      <Blog />
      <ContactUs />
    </div>
  );
};

export default Home;
