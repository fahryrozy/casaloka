"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import PropertyList from "./components/propertyList";
import FilterSidebar from "./components/filterSideBar";
import Pagination from "../components/pagination";
import SearchHeader from "./components/searchHeader";
import { getPropertyList } from "../../utils/api/services/propertyService";
import SearchSkeleton from "./components/searchSkeleton";
import { IPropertyListData } from "../../utils/api/interfaces/IProperty";
import useStore from "@store/useStore"; // Import the Zustand store

function SearchPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<IPropertyListData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const propertiesPerPage = 5;

  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    selectedLocation,
    setSelectedLocation,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<string>("0");

  const [categories, setCategories] = useState<string>("");
  const [propertiesFilter, setPropertiesFilter] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const [selectedProvince, setSelectedProvince] =
    useState<string>(selectedLocation);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedVillage, setSelectedVillage] = useState<string>("");

  const [filters, setFilters] = useState({});
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const [userLongitude, setUserLongitude] = useState<string>("");
  const [userLatitude, setUserLatitude] = useState<string>("");

  const fetchProperties = useCallback(
    async (updatedFilters: any) => {
      setIsLoading(true);
      getPropertyList({
        search: searchQuery,
        current_page: currentPage.toString(),
        page_size: propertiesPerPage.toString(),
        filter: updatedFilters,
      })
        .then(({ properties, totalItems }) => {
          setProperties(properties);
          setTotalItems(totalItems);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          setIsLoading(false);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [currentPage, propertiesPerPage, searchQuery]
  );

  useEffect(() => {
    const filter = {
      harga_start: minPrice.toString(),
      harga_end: maxPrice.toString(),
      village_code: selectedVillage,
      district_code: selectedDistrict,
      city_code: selectedCity,
      province_code: selectedProvince,
      properti_distance_km: selectedDistance,
      user_longitude: userLongitude,
      user_latitude: userLatitude,
      tipe_bangunan_name: categories,
      surat_name: certifications,
      status_properti_name: "",
    };

    // Remove keys with values of 0 or empty string
    const filteredFilter = Object.fromEntries(
      Object.entries(filter).filter(
        ([key, value]) =>
          value !== "0" &&
          value !== "" &&
          (key !== "properti_distance_km" ||
            (key === "properti_distance_km" && value !== "0"))
      )
    );

    if (selectedDistance === "0") {
      delete filteredFilter.user_longitude;
      delete filteredFilter.user_latitude;
      delete filteredFilter.properti_distance_km;
    }

    setFilters(filteredFilter);
    fetchProperties(filteredFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDistanceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistance(event.target.value);
  };

  const clearDistance = () => {
    setSelectedDistance("0");
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

  const handleApplyFilters = () => {
    const filter = {
      harga_start: minPrice.toString(),
      harga_end: maxPrice.toString(),
      village_code: selectedVillage,
      district_code: selectedDistrict,
      city_code: selectedCity,
      province_code: selectedProvince,
      properti_distance_km: selectedDistance,
      user_longitude: userLongitude,
      user_latitude: userLatitude,
      tipe_bangunan_name: categories,
      surat_name: certifications,
      status_properti_name: "",
    };

    // Remove keys with values of 0 or empty string
    const filteredFilter = Object.fromEntries(
      Object.entries(filter).filter(
        ([key, value]) =>
          value !== "0" &&
          value !== "" &&
          (key !== "properti_distance_km" ||
            (key === "properti_distance_km" && value !== "0"))
      )
    );

    if (selectedDistance === "0") {
      delete filteredFilter.user_longitude;
      delete filteredFilter.user_latitude;
      delete filteredFilter.properti_distance_km;
    }

    setFilters(filteredFilter);
    setCurrentPage(1);
    fetchProperties(filteredFilter);
    setIsFilterSidebarOpen(false); // Close the sidebar after applying filters
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(0);
    setSearchQuery("");
    setSelectedDate(null);
    setCategories("");
    setPropertiesFilter([]);
    setCertifications("");
    setSelectedProvince("");
    setSelectedLocation("");
    setSelectedCity("");
    setSelectedDistrict("");
    setSelectedVillage("");
    setFilters({});
    setCurrentPage(1);
    setUserLongitude("");
    setUserLatitude("");

    setIsFilterSidebarOpen(false); // Close the sidebar after resetting filters
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProperties(filters);
  };

  return (
    <div className="flex bg-gray-100 flex-col">
      <div className={`flex flex-col gap-4 sm:flex-row mt-20`}>
        <FilterSidebar
          isFilterSidebarOpen={isFilterSidebarOpen}
          categories={categories}
          setCategories={setCategories}
          certifications={certifications}
          setCertifications={setCertifications}
          selectedProvince={selectedProvince}
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
          selectedVillage={selectedVillage}
          setSelectedProvince={setSelectedProvince}
          setSelectedCity={setSelectedCity}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedVillage={setSelectedVillage}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          selectedDistance={selectedDistance}
          handleDistanceChange={handleDistanceChange}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          userLongitude={userLongitude}
          setUserLongitude={setUserLongitude}
          userLatitude={userLatitude}
          setUserLatitude={setUserLatitude}
        />
        <div
          className={`flex-grow px-4 ${
            isFilterSidebarOpen ? "hidden" : "slide-in-right"
          } sm:flex flex-col`}
        >
          <SearchHeader
            searchQuery={searchQuery}
            onEnterPressed={() => fetchProperties(filters)}
            setSearchQuery={setSearchQuery}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setIsFilterSidebarOpen={setIsFilterSidebarOpen} // Pass the state setter to SearchHeader
            selectedDistance={selectedDistance}
            handleDistanceChange={handleDistanceChange}
            clearDistance={clearDistance}
          />
          {isLoading ? (
            <SearchSkeleton />
          ) : (
            <div className="flex flex-col gap-4 px-2 overflow-hidden mb-10">
              <PropertyList
                properties={properties}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
              <Pagination
                totalItems={totalItems}
                itemsPerPage={propertiesPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
