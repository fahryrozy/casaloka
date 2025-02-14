"use client";
import React from "react";
import Hero from "./components/hero";
import SearchBar from "./components/searchBar";
import AboutUs from "./components/aboutUs";
import OurPartners from "./components/ourPartners";
import Services from "./components/services";
import LksPartner from "./components/lskPartner";
import Blog from "./components/blog";
import ContactUs from "./components/contactUs";
import ContactUsBanner from "./components/contactUsBanner";
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
