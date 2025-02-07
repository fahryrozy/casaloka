"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PropertyList from "./components/propertyList";
import FilterSidebar from "./components/filterSideBar";
import Pagination from "../components/pagination";
import SearchHeader from "./components/searchHeader";
import { getPropertyList } from "../utils/api";

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const propertiesPerPage = 5;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getPropertyList();
        setProperties(data.data.datas);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, []);

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
          <SearchHeader />
          <PropertyList properties={currentProperties} />
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
