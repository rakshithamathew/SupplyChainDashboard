import { useState } from "react";
import DuplicatePaymentChart from "./DuplicatePaymentsGraph";
import SupplierGraph from "./SupplierGraph";
import DeliveryDelayChart from "./DeliveryDelayGraph";
import ProcurementDataTable from "./ProcurementDataTable";
import SupplierRevenueChart from "./SupplierRevenueChart";
import KPIs from "./KPIs";
import mockData from "../../../MockData.json";
import { FormControl, Typography, MenuItem, Select } from "@mui/material";



const Anomalies = () => {
  const supplierData = [
    { name: "Fresh Farms Co", topFood: "Pizza", revenue: 50000 },
    { name: "Global Grain Ltd", topFood: "Burger", revenue: 45000 },
    { name: "Exotic Spices Inc", topFood: "Pasta", revenue: 40000 },
    { name: "Southern Dairy", topFood: "Sushi", revenue: 35000 },
    { name: "Organic Orchards", topFood: "Salad", revenue: 30000 },
  ];
  const [selectedYear, setSelectedYear] = useState("2019");
  const [selectedCountry, setSelectedCountry] = useState("USA");

  // Extract years from the JSON data
  const years = Object.keys(mockData.yearly_data);
  // Extract countries only if the selected year is valid
  const countries =
    selectedYear && mockData.yearly_data[selectedYear]
      ? Object.keys(mockData.yearly_data[selectedYear].country || {})
      : [];

  // Handle year change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedCountry(""); // Reset country when year changes
  };

  // Handle country change
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-start justify-between w-full mb-2">
        <div className="flex-1 ">{/* <KPIs /> */}</div>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">
                Annomaly Overview
              </h2>

              <div
                className="flex flex-row gap-4" // Changed flex-direction to row and adjusted gap
                style={{ width: "20%", paddingRight: "20px" }} // Adjusted width to fit both dropdowns
              >
                {/* Year Dropdown */}
                <div style={{ flex: 1 }}>
                  {" "}
                  {/* Added flex: 1 to allow equal spacing */}
                  <Typography
                    style={{
                      fontSize: "11px",
                      color: "#757575",
                    }}
                  ></Typography>
                  <Typography style={{ fontSize: "10px", color: "#757575" }}>
                    Year
                  </Typography>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                    style={{
                      border: "1px solid #90CAF9",
                      borderRadius: "5px",
                    }}
                  >
                    <Select value={selectedYear} onChange={handleYearChange}>
                      <MenuItem value="Select Year">Select Year</MenuItem>
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/* Country Dropdown */}
                <div style={{ flex: 1 }}>
                  {" "}
                  {/* Added flex: 1 to allow equal spacing */}
                  <Typography
                    style={{
                      fontSize: "11px",
                      color: "#757575",
                    }}
                  ></Typography>
                  <Typography style={{ fontSize: "10px", color: "#757575" }}>
                    Country
                  </Typography>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                    style={{
                      border: "1px solid #90CAF9",
                      borderRadius: "5px",
                    }}
                    disabled={!selectedYear || selectedYear === "Select Year"}
                  >
                    <Select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      <MenuItem value="Select Country">Select Country</MenuItem>
                      {countries.length > 0 ? (
                        countries.map((country) => (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No Countries Available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <KPIs />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center justify-center">
                <DeliveryDelayChart
                  selectedYear={selectedYear}
                  selectedCountry={selectedCountry}
                  className="w-full h-100"
                />
              </div>
              <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center justify-center">
                <SupplierRevenueChart
                  data={supplierData}
                  className="w-full h-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2">
              <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center justify-center">
                <DuplicatePaymentChart
                  selectedYear={selectedYear}
                  selectedCountry={selectedCountry}
                  className="w-full h-100"
                />
              </div>
             

              <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center justify-center">
                <SupplierGraph
                  selectedYear={selectedYear}
                  selectedCountry={selectedCountry}
                  className="w-full h-80"
                />
              </div>
            </div>

            {/* Procurement Table */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col w-full mt-6 flex-grow">
              <ProcurementDataTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anomalies;
