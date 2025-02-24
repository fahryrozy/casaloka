import React, { useState, useEffect } from "react";
import {
  fetchProvinces,
  fetchCities,
  fetchDistricts,
  fetchVillages,
} from "../../../utils/api/services/regionService";
import { formatCapitalize } from "@utils/formatCapitalize";
import {
  ICityData,
  IDistrictData,
  IProvinceData,
  IVillageData,
} from "@utils/api/interfaces/IRegion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface LocationFilterProps {
  selectedProvince: string;
  selectedCity: string;
  selectedDistrict: string;
  selectedVillage: string;
  setSelectedProvince: (province: string) => void;
  setSelectedCity: (city: string) => void;
  setSelectedDistrict: (district: string) => void;
  setSelectedVillage: (village: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedProvince,
  selectedCity,
  selectedDistrict,
  selectedVillage,
  setSelectedProvince,
  setSelectedCity,
  setSelectedDistrict,
  setSelectedVillage,
}) => {
  const [provinces, setProvinces] = useState<IProvinceData[]>([]);
  const [cities, setCities] = useState<ICityData[]>([]);
  const [districts, setDistricts] = useState<IDistrictData[]>([]);
  const [villages, setVillages] = useState<IVillageData[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);

  useEffect(() => {
    fetchProvinces().then((data) => {
      const filteredProvinces = data.filter((province) =>
        ["31", "32", "36"].includes(province.code)
      );
      setProvinces(filteredProvinces);
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchCities(selectedProvince).then(setCities);
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      fetchDistricts(selectedCity).then(setDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchVillages(selectedDistrict).then(setVillages);
    } else {
      setVillages([]);
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const provinceCode = e.target.value;
    if (selectedProvince === provinceCode) {
      setSelectedProvince("");
      setSelectedCity("");
      setSelectedDistrict("");
      setSelectedVillage("");
      setCities([]);
      setDistricts([]);
      setVillages([]);
    } else {
      setSelectedProvince(provinceCode);
      setSelectedCity("");
      setSelectedDistrict("");
      setSelectedVillage("");
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cityCode = e.target.value;
    if (selectedCity === cityCode) {
      setSelectedCity("");
      setSelectedDistrict("");
      setSelectedVillage("");
      setDistricts([]);
      setVillages([]);
    } else {
      setSelectedCity(cityCode);
      setSelectedDistrict("");
      setSelectedVillage("");
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const districtCode = e.target.value;
    if (selectedDistrict === districtCode) {
      setSelectedDistrict("");
      setSelectedVillage("");
      setVillages([]);
    } else {
      setSelectedDistrict(districtCode);
      setSelectedVillage("");
    }
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const villageCode = e.target.value;
    if (selectedVillage === villageCode) {
      setSelectedVillage("");
    } else {
      setSelectedVillage(villageCode);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2 max-h-[30vh] overflow-y-scroll">
      <div
        className="w-full cursor-pointer flex sticky top-0 bg-white z-10"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <label className="w-full font-bold">Indonesia</label>{" "}
        <span className={`ml-4 mt-1`}>
          {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isDropdownOpen && (
        <div>
          {provinces.map((province) => (
            <div key={province.code}>
              <input
                type="radio"
                value={province.code}
                onChange={handleProvinceChange}
                checked={selectedProvince === province.code}
                className="mr-2"
              />
              <label>{formatCapitalize(province.name)}</label>
              {selectedProvince === province.code && (
                <div className="ml-2">
                  {cities
                    .filter((city) => city.province_code === province.code)
                    .map((city) => (
                      <div key={city.code}>
                        <input
                          type="radio"
                          value={city.code}
                          onChange={handleCityChange}
                          checked={selectedCity === city.code}
                          className="mr-2"
                        />
                        <label>{formatCapitalize(city.name)}</label>
                        {selectedCity === city.code && (
                          <div className="ml-2">
                            {districts
                              .filter(
                                (district) => district.city_code === city.code
                              )
                              .map((district) => (
                                <div key={district.code}>
                                  <input
                                    type="radio"
                                    value={district.code}
                                    onChange={handleDistrictChange}
                                    checked={selectedDistrict === district.code}
                                    className="mr-2"
                                  />
                                  <label>
                                    {formatCapitalize(district.name)}
                                  </label>
                                  {selectedDistrict === district.code && (
                                    <div className="ml-2">
                                      {villages
                                        .filter(
                                          (village) =>
                                            village.district_code ===
                                            district.code
                                        )
                                        .map((village) => (
                                          <div key={village.code}>
                                            <input
                                              type="checkbox"
                                              value={village.code}
                                              onChange={handleVillageChange}
                                              checked={
                                                selectedVillage === village.code
                                              }
                                              className="mr-2"
                                            />
                                            <label>
                                              {formatCapitalize(village.name)}
                                            </label>
                                          </div>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
