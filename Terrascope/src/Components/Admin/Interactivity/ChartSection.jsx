import React, { useContext } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { DataContext } from './DataContext';
import Pagination from './Pagination';

Chart.register(...registerables);

const ChartSection = () => {
  const { 
    chartType, 
    setChartType, 
    columns, 
    xAxis, 
    setXAxis, 
    yAxis, 
    setYAxis, 
    procurementData,
    paginatedChartData,
    chartPage,
    setChartPage,
    chartItemsPerPage,
    setChartItemsPerPage
  } = useContext(DataContext);

  // Define the chart data
  const chartData = {
    labels: paginatedChartData.map((item) => item[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: paginatedChartData.map((item) => item[yAxis]),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Render the selected chart
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      default:
        return <Bar data={chartData} options={options} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Chart Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>

        {/* X-axis and Y-axis Dropdowns */}
        {columns.length > 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis</label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {columns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis</label>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {columns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div className="h-64 md:h-80 mb-4">
        {renderChart()}
      </div>

      {/* Chart Pagination Controls */}
      {procurementData.length > chartItemsPerPage && (
        <Pagination
          currentPage={chartPage}
          setCurrentPage={setChartPage}
          itemsPerPage={chartItemsPerPage}
          setItemsPerPage={setChartItemsPerPage}
          totalItems={procurementData.length}
          itemName="entries in chart"
        />
      )}
    </div>
  );
};

export default ChartSection;