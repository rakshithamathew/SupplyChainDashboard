import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, BarChart3, TrendingUp, Cloud, Map, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';

// Sample data for different time ranges
const seasonalTrendData = {
  quarter: [
    { month: 'Oct', rice: 2000, wheat: 9800, corn: 2290, avg_temp: 32 },
    { month: 'Nov', rice: 2780, wheat: 3908, corn: 2000, avg_temp: 30 },
    { month: 'Dec', rice: 1890, wheat: 4800, corn: 2181, avg_temp: 29 },
  ],
  year: [
    { month: 'Jan', rice: 4000, wheat: 2400, corn: 2400, avg_temp: 28 },
    { month: 'Feb', rice: 3000, wheat: 1398, corn: 2210, avg_temp: 30 },
    { month: 'Mar', rice: 2000, wheat: 9800, corn: 2290, avg_temp: 32 },
    { month: 'Apr', rice: 2780, wheat: 3908, corn: 2000, avg_temp: 33 },
    { month: 'May', rice: 1890, wheat: 4800, corn: 2181, avg_temp: 35 },
    { month: 'Jun', rice: 2390, wheat: 3800, corn: 2500, avg_temp: 37 },
    { month: 'Jul', rice: 3490, wheat: 4300, corn: 2100, avg_temp: 38 },
    { month: 'Aug', rice: 4000, wheat: 2400, corn: 2400, avg_temp: 36 },
    { month: 'Sep', rice: 3000, wheat: 1398, corn: 2210, avg_temp: 34 },
    { month: 'Oct', rice: 2000, wheat: 9800, corn: 2290, avg_temp: 32 },
    { month: 'Nov', rice: 2780, wheat: 3908, corn: 2000, avg_temp: 30 },
    { month: 'Dec', rice: 1890, wheat: 4800, corn: 2181, avg_temp: 29 },
  ],
  all: [
    { month: 'Jan', rice: 5000, wheat: 3400, corn: 3400, avg_temp: 28 },
    { month: 'Feb', rice: 4000, wheat: 2398, corn: 3210, avg_temp: 30 },
    { month: 'Mar', rice: 3000, wheat: 10800, corn: 3290, avg_temp: 32 },
    { month: 'Apr', rice: 3780, wheat: 4908, corn: 3000, avg_temp: 33 },
    { month: 'May', rice: 2890, wheat: 5800, corn: 3181, avg_temp: 35 },
    { month: 'Jun', rice: 3390, wheat: 4800, corn: 3500, avg_temp: 37 },
    { month: 'Jul', rice: 4490, wheat: 5300, corn: 3100, avg_temp: 38 },
    { month: 'Aug', rice: 5000, wheat: 3400, corn: 3400, avg_temp: 36 },
    { month: 'Sep', rice: 4000, wheat: 2398, corn: 3210, avg_temp: 34 },
    { month: 'Oct', rice: 3000, wheat: 10800, corn: 3290, avg_temp: 32 },
    { month: 'Nov', rice: 3780, wheat: 4908, corn: 3000, avg_temp: 30 },
    { month: 'Dec', rice: 2890, wheat: 5800, corn: 3181, avg_temp: 29 },
  ],
};

const regionsData = {
  quarter: [
    { name: 'North America', value: 30 },
    { name: 'Europe', value: 20 },
    { name: 'Asia', value: 25 },
    { name: 'South America', value: 15 },
    { name: 'Africa', value: 5 },
    { name: 'Australia', value: 5 },
  ],
  year: [
    { name: 'North America', value: 35 },
    { name: 'Europe', value: 25 },
    { name: 'Asia', value: 20 },
    { name: 'South America', value: 10 },
    { name: 'Africa', value: 7 },
    { name: 'Australia', value: 3 },
  ],
  all: [
    { name: 'North America', value: 40 },
    { name: 'Europe', value: 30 },
    { name: 'Asia', value: 25 },
    { name: 'South America', value: 15 },
    { name: 'Africa', value: 10 },
    { name: 'Australia', value: 5 },
  ],
};

const regionSuppliers = {
  quarter: [
    { region: 'North America', count: 300, change: 10 },
    { region: 'Europe', count: 250, change: -3 },
    { region: 'Asia', count: 400, change: 20 },
    { region: 'South America', count: 150, change: 5 },
    { region: 'Africa', count: 90, change: 10 },
    { region: 'Australia', count: 60, change: -1 },
  ],
  year: [
    { region: 'North America', count: 356, change: 12 },
    { region: 'Europe', count: 289, change: -5 },
    { region: 'Asia', count: 421, change: 23 },
    { region: 'South America', count: 176, change: 8 },
    { region: 'Africa', count: 102, change: 15 },
    { region: 'Australia', count: 67, change: -2 },
  ],
  all: [
    { region: 'North America', count: 400, change: 15 },
    { region: 'Europe', count: 300, change: -2 },
    { region: 'Asia', count: 450, change: 25 },
    { region: 'South America', count: 200, change: 10 },
    { region: 'Africa', count: 120, change: 20 },
    { region: 'Australia', count: 80, change: -3 },
  ],
};

const climateImpactData = {
  quarter: [
    { month: 'Oct', drought: 32, flood: 25, extreme_temp: 28 },
    { month: 'Nov', drought: 28, flood: 20, extreme_temp: 25 },
    { month: 'Dec', drought: 25, flood: 15, extreme_temp: 20 },
  ],
  year: [
    { month: 'Jan', drought: 20, flood: 5, extreme_temp: 10 },
    { month: 'Feb', drought: 22, flood: 8, extreme_temp: 12 },
    { month: 'Mar', drought: 25, flood: 12, extreme_temp: 15 },
    { month: 'Apr', drought: 28, flood: 15, extreme_temp: 18 },
    { month: 'May', drought: 30, flood: 18, extreme_temp: 20 },
    { month: 'Jun', drought: 32, flood: 22, extreme_temp: 25 },
    { month: 'Jul', drought: 35, flood: 25, extreme_temp: 28 },
    { month: 'Aug', drought: 38, flood: 30, extreme_temp: 32 },
    { month: 'Sep', drought: 35, flood: 28, extreme_temp: 30 },
    { month: 'Oct', drought: 32, flood: 25, extreme_temp: 28 },
    { month: 'Nov', drought: 28, flood: 20, extreme_temp: 25 },
    { month: 'Dec', drought: 25, flood: 15, extreme_temp: 20 },
  ],
  all: [
    { month: 'Jan', drought: 25, flood: 10, extreme_temp: 15 },
    { month: 'Feb', drought: 27, flood: 12, extreme_temp: 17 },
    { month: 'Mar', drought: 30, flood: 15, extreme_temp: 20 },
    { month: 'Apr', drought: 33, flood: 18, extreme_temp: 23 },
    { month: 'May', drought: 35, flood: 20, extreme_temp: 25 },
    { month: 'Jun', drought: 37, flood: 25, extreme_temp: 30 },
    { month: 'Jul', drought: 40, flood: 30, extreme_temp: 33 },
    { month: 'Aug', drought: 42, flood: 35, extreme_temp: 37 },
    { month: 'Sep', drought: 40, flood: 33, extreme_temp: 35 },
    { month: 'Oct', drought: 37, flood: 30, extreme_temp: 33 },
    { month: 'Nov', drought: 33, flood: 25, extreme_temp: 30 },
    { month: 'Dec', drought: 30, flood: 20, extreme_temp: 25 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const SupplyChainDashboard = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [seasonalTrend, setSeasonalTrend] = useState(seasonalTrendData.year);
  const [regions, setRegions] = useState(regionsData.year);
  const [suppliers, setSuppliers] = useState(regionSuppliers.year);
  const [climateImpact, setClimateImpact] = useState(climateImpactData.year);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setSeasonalTrend(seasonalTrendData[range]);
    setRegions(regionsData[range]);
    setSuppliers(regionSuppliers[range]);
    setClimateImpact(climateImpactData[range]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Seasonal Analytics</h1>
        <p className="text-gray-600 mt-2">Track seasonal trends and climate impacts on your procurement activities</p>
      </div>
      
      {/* Time range selector */}
      <div className="flex gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-md ${timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => handleTimeRangeChange('quarter')}
        >
          Last Quarter
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => handleTimeRangeChange('year')}
        >
          Last Year
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${timeRange === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => handleTimeRangeChange('all')}
        >
          All Time
        </button>
      </div>
     
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Product Seasonal Trends */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Seasonal Product Trends</h2>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">View Details</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seasonalTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rice" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="wheat" stroke="#82ca9d" />
              <Line type="monotone" dataKey="corn" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Regional Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Regional Distribution</h2>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regions}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {regions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Climate Impact & Suppliers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Climate Impact */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Climate Impact on Supply Chain</h2>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">View Details</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={climateImpact} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="drought" fill="#FF8042" />
              <Bar dataKey="flood" fill="#0088FE" />
              <Bar dataKey="extreme_temp" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Temperature vs Yield */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Temperature vs Product Yield</h2>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">View Details</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seasonalTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="rice" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="avg_temp" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Supplier Distribution by Region */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Supplier Distribution by Region</h2>
          {/* <div className="flex items-center text-blue-600">
            <span className="text-sm font-medium">View All Suppliers</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div> */}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Count</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YoY Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.region}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.count}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${item.change > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      {item.change > 0 ? 
                        <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      }
                      {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainDashboard;