"use client";
import React from "react";
import Header from "../components/header";
import Hero from "./components/hero";
import SearchBar from "./components/searchBar";
import Footer from "../components/footer";
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
      <Header />
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
      <Footer />
    </div>
  );
};

export default Home;
