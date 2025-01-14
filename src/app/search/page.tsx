"use client";

import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PropertyList from "./components/propertyList";
import properties from "../data/mockProperty";
import FilterSidebar from "./components/filterSideBar";
import Pagination from "../components/pagination";

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />
      <div className="flex flex-col sm:flex-row mt-20">
        <FilterSidebar />
        <div className="flex-grow p-4">
          <PropertyList properties={currentProperties} />
          {/* Pagination component can be added here */}
          <Pagination
            totalItems={properties.length}
            itemsPerPage={propertiesPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
