import React from "react";

import {
  ArrowUpDown,
} from "lucide-react";

const ProcurementTable = () => {
  const anomalyData = [
    {
      id: 1,
      supplier: "Fresh Farms Co.",
      region: "North America",
      country: "USA",
      category: "Produce",
      amount: 82500,
      expected: 65000,
      date: "2025-03-01",
      severity: "high",
      type: "Unexpectedly High Purchase",
    },
    {
      id: 2,
      supplier: "Global Grain Ltd.",
      region: "Europe",
      country: "France",
      category: "Grains",
      amount: 12300,
      expected: 45000,
      date: "2025-03-02",
      severity: "high",
      type: "Unexpectedly Low Purchase",
    },
    {
      id: 3,
      supplier: "Exotic Spices Inc.",
      region: "Asia",
      country: "India",
      category: "Spices",
      amount: 28700,
      expected: 25000,
      date: "2025-03-03",
      severity: "low",
      type: "Slight Deviation",
    },
    {
      id: 4,
      supplier: "Southern Dairy",
      region: "North America",
      country: "Mexico",
      category: "Dairy",
      amount: 33400,
      expected: 30000,
      date: "2025-03-05",
      severity: "medium",
      type: "Irregular Pattern",
    },
    {
      id: 5,
      supplier: "Organic Orchards",
      region: "South America",
      country: "Brazil",
      category: "Produce",
      amount: 57800,
      expected: 40000,
      date: "2025-03-07",
      severity: "medium",
      type: "Unexpected Volume",
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Date
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Supplier
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Region/Country
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Category
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Amount
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Expected
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Type
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Severity
                  <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {anomalyData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.supplier}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.region} / {item.country}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.category}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${item.amount.toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${item.expected.toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.type}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                ${
                                  item.severity === "high"
                                    ? "bg-red-100 text-red-800"
                                    : item.severity === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                  >
                    {item.severity.charAt(0).toUpperCase() +
                      item.severity.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">5</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                {/* Icon */}
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                {/* Icon */}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcurementTable;
