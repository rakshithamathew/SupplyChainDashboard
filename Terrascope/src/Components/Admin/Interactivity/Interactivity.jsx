// import React, { useState, useMemo } from 'react';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// import * as XLSX from 'xlsx';

// Chart.register(...registerables);

// const Interactivity = () => {
//   const [procurementData, setProcurementData] = useState([]);
//   const [supplier, setSupplier] = useState('');
//   const [volume, setVolume] = useState('');
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [chartType, setChartType] = useState('bar');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [columns, setColumns] = useState([]);
//   const [xAxis, setXAxis] = useState('supplier');
//   const [yAxis, setYAxis] = useState('volume');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(50);
//   // Separate pagination state for the chart
//   const [chartPage, setChartPage] = useState(0);
//   const [chartItemsPerPage, setChartItemsPerPage] = useState(10);
//   const [dataSource, setDataSource] = useState(null);

//   const handleReset = () => {
//     setProcurementData([]); // Clear procurement data
//     setSupplier(''); // Reset supplier input
//     setVolume(''); // Reset volume input
//     setEditingIndex(null); // Reset editing index
//     setChartType('bar'); // Reset chart type to bar
//     setSortConfig({ key: null, direction: 'asc' }); // Reset sorting
//     setColumns([]); // Clear columns
//     setXAxis('supplier'); // Reset X-axis
//     setYAxis('volume'); // Reset Y-axis
//     setCurrentPage(0); // Reset table pagination
//     setItemsPerPage(50); // Reset items per page
//     setChartPage(0); // Reset chart pagination
//     setChartItemsPerPage(10); // Reset chart items per page
//     setDataSource(null); // Reset data source
//   };
//   // Sort procurement data
//   const sortedData = useMemo(() => {
//     let sortableData = [...procurementData];
//     if (sortConfig.key !== null) {
//       sortableData.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableData;
//   }, [procurementData, sortConfig]);

//   // Paginated data for table
//   const paginatedTableData = sortedData.slice(
//     currentPage * itemsPerPage, 
//     (currentPage + 1) * itemsPerPage
//   );

//   // Paginated data for chart
//   const paginatedChartData = sortedData.slice(
//     chartPage * chartItemsPerPage, 
//     (chartPage + 1) * chartItemsPerPage
//   );

//   // Define the chart data
//   const chartData = {
//     labels: paginatedChartData.map((item) => item[xAxis]),
//     datasets: [
//       {
//         label: yAxis,
//         data: paginatedChartData.map((item) => item[yAxis]),
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Define chart options
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };



//   const handleAddData = () => {
//     if (supplier && volume) {
//       const newData = { supplier, volume: parseInt(volume) };
//       setProcurementData([...procurementData, newData]);
//       setSupplier('');
//       setVolume('');
//       setDataSource('manual'); // Set data source to manual

//       // Set default columns if not already set
//       if (columns.length === 0) {
//         setColumns(['supplier', 'volume']);
//       }
//     } else {
//       alert('Please fill in both supplier and volume fields.');
//     }
//   };
//   // Handle deleting data
//   const handleDeleteData = (index) => {
//     const updatedData = procurementData.filter((_, i) => i !== index);
//     setProcurementData(updatedData);
//   };

//   // Handle editing data
//   const handleEditData = (index) => {
//     setEditingIndex(index);
//   };

//   // Handle saving edited data
//   const handleSaveEdit = () => {
//     setEditingIndex(null);
//   };


//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryString = event.target.result;
//       const workbook = XLSX.read(binaryString, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       // Assuming the first row is the header and the data starts from the second row
//       const headers = jsonData[0]; // Extract column names from the first row
//       const data = jsonData.slice(1).map((row) => {
//         const rowData = {};
//         headers.forEach((header, index) => {
//           rowData[header] = row[index];
//         });
//         return rowData;
//       });

//       setColumns(headers); // Set column names for dropdowns
//       setProcurementData(data); // Set the data
//       setDataSource('file'); // Set data source to file
      
//       // Reset pagination when loading new data
//       setCurrentPage(0);
//       setChartPage(0);
//     };
//     reader.readAsBinaryString(file);
//   };


//   // Sorting function
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Render the selected chart
//   const renderChart = () => {
//     switch (chartType) {
//       case 'bar':
//         return <Bar data={chartData} options={options} />;
//       case 'pie':
//         return <Pie data={chartData} options={options} />;
//       case 'line':
//         return <Line data={chartData} options={options} />;
//       default:
//         return <Bar data={chartData} options={options} />;
//     }
//   };

//   // Table pagination handlers
//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(0); // Reset to the first page when changing items per page
//   };

//   // Chart pagination handlers
//   const handleNextChartPage = () => {
//     setChartPage((prevPage) => prevPage + 1);
//   };

//   const handlePreviousChartPage = () => {
//     setChartPage((prevPage) => prevPage - 1);
//   };

//   const handleChartItemsPerPageChange = (e) => {
//     setChartItemsPerPage(parseInt(e.target.value));
//     setChartPage(0); // Reset to the first page when changing items per page
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Procurement Overview</h1>

//       {/* Chart Section */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           {/* Chart Type Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
//             <select
//               value={chartType}
//               onChange={(e) => setChartType(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="bar">Bar Chart</option>
//               <option value="pie">Pie Chart</option>
//               <option value="line">Line Chart</option>
//             </select>
//           </div>

//           {/* X-axis and Y-axis Dropdowns */}
//           {columns.length > 0 && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis</label>
//                 <select
//                   value={xAxis}
//                   onChange={(e) => setXAxis(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {columns.map((column, index) => (
//                     <option key={index} value={column}>
//                       {column}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis</label>
//                 <select
//                   value={yAxis}
//                   onChange={(e) => setYAxis(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {columns.map((column, index) => (
//                     <option key={index} value={column}>
//                       {column}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Chart */}
//         <div className="h-64 md:h-80 mb-4">
//           {renderChart()}
//         </div>

//         {/* Chart Pagination Controls */}
//         {procurementData.length > chartItemsPerPage && (
//           <div className="flex flex-wrap items-center justify-between border-t border-gray-200 pt-4">
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-700">
//                 Showing {chartPage * chartItemsPerPage + 1} to{' '}
//                 {Math.min((chartPage + 1) * chartItemsPerPage, procurementData.length)} of{' '}
//                 {procurementData.length} entries in chart
//               </span>
              
//               <div className="flex items-center space-x-2">
//                 <label className="text-sm text-gray-700">Chart items:</label>
//                 <select
//                   value={chartItemsPerPage}
//                   onChange={handleChartItemsPerPageChange}
//                   className="border border-gray-300 rounded-md py-1 px-2 text-sm"
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={20}>20</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-2 mt-2 sm:mt-0">
//               <button
//                 onClick={handlePreviousChartPage}
//                 disabled={chartPage === 0}
//                 className={`px-3 py-1 rounded-md text-sm font-medium ${
//                   chartPage === 0
//                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Previous
//               </button>
//               <span className="text-sm text-gray-700">
//                 Page {chartPage + 1} of {Math.ceil(procurementData.length / chartItemsPerPage)}
//               </span>
//               <button
//                 onClick={handleNextChartPage}
//                 disabled={(chartPage + 1) * chartItemsPerPage >= procurementData.length}
//                 className={`px-3 py-1 rounded-md text-sm font-medium ${
//                   (chartPage + 1) * chartItemsPerPage >= procurementData.length
//                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
    
//       {/* Data Entry Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* Add Data Form */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Add Procurement Data</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
//               <input
//                 type="text"
//                 value={supplier}
//                 onChange={(e) => setSupplier(e.target.value)} disabled={dataSource === 'file'}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
//               <input
//                 type="number"
//                 value={volume}
//                 onChange={(e) => setVolume(e.target.value)} disabled={dataSource === 'file'}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button
//               onClick={handleAddData} disabled={dataSource === 'file'}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
//             >
//               Add Data
//             </button>
//           </div>
//         </div>

//         {/* Upload Excel File */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
//           <div className="flex flex-col space-y-4">
//             <p className="text-gray-600">Upload an Excel file to import procurement data.</p>
//             <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
//               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//               </svg>
//               <span className="mt-2 text-sm text-gray-600">Select a file</span>
//               <input
//                 type="file"
//                 className="hidden"
//                 accept=".xlsx, .xls"
//                 onChange={handleFileUpload} disabled={dataSource === 'manual'}
//               />
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end mb-6">
//         <button
//           onClick={handleReset}
//           className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
//         >
//           Reset
//         </button>
//       </div>

//       {/* Data Table */}
//       {procurementData.length > 0 && (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {columns.map((column, index) => (
//                     <th
//                       key={index}
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => requestSort(column)}
//                     >
//                       {column}
//                       {sortConfig.key === column && (
//                         <span className="ml-1">
//                           {sortConfig.direction === 'asc' ? '▲' : '▼'}
//                         </span>
//                       )}
//                     </th>
//                   ))}
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedTableData.map((item, index) => {
//                   const actualIndex = index + currentPage * itemsPerPage;
//                   return (
//                     <tr key={index} className="hover:bg-gray-50">
//                       {columns.map((column, colIndex) => (
//                         <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
//                           {editingIndex === actualIndex ? (
//                             <input
//                               type="text"
//                               value={item[column]}
//                               onChange={(e) => {
//                                 const updatedData = [...procurementData];
//                                 updatedData[actualIndex][column] = e.target.value;
//                                 setProcurementData(updatedData);
//                               }}
//                               className="border border-gray-300 rounded px-2 py-1 w-full"
//                             />
//                           ) : (
//                             <span className="text-sm text-gray-900">{item[column]}</span>
//                           )}
//                         </td>
//                       ))}
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {editingIndex === actualIndex ? (
//                           <button
//                             onClick={handleSaveEdit}
//                             className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md font-medium text-sm"
//                           >
//                             Save
//                           </button>
//                         ) : (
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => handleEditData(actualIndex)}
//                               className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md font-medium text-sm"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteData(actualIndex)}
//                               className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md font-medium text-sm"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Table Pagination Controls */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-700">
//                 Showing {currentPage * itemsPerPage + 1} to{' '}
//                 {Math.min((currentPage + 1) * itemsPerPage, procurementData.length)} of{' '}
//                 {procurementData.length} entries
//               </span>
              
//               <div className="flex items-center space-x-2">
//                 <label className="text-sm text-gray-700">Items per page:</label>
//                 <select
//                   value={itemsPerPage}
//                   onChange={handleItemsPerPageChange}
//                   className="border border-gray-300 rounded-md py-1 px-2 text-sm"
//                 >
//                   <option value={10}>10</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                   <option value={200}>200</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-2 mt-2 sm:mt-0">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 0}
//                 className={`px-3 py-1 rounded-md text-sm font-medium ${
//                   currentPage === 0
//                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Previous
//               </button>
//               <span className="text-sm text-gray-700">
//                 Page {currentPage + 1} of {Math.ceil(procurementData.length / itemsPerPage)}
//               </span>
//               <button
//                 onClick={handleNextPage}
//                 disabled={(currentPage + 1) * itemsPerPage >= procurementData.length}
//                 className={`px-3 py-1 rounded-md text-sm font-medium ${
//                   (currentPage + 1) * itemsPerPage >= procurementData.length
//                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Interactivity;





import React, { useContext } from 'react';
import { DataProvider, DataContext } from './DataContext';
import ChartSection from './ChartSection';
import DataEntrySection from './DataEntrySection';
import DataTable from './DataTable';

const ResetButton = () => {
  const { handleReset } = useContext(DataContext);
  
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={handleReset}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Reset
      </button>
    </div>
  );
};

const ProcurementDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Procurement Overview</h1>
      <ChartSection />
      <DataEntrySection />
      <ResetButton />
      <DataTable />
    </div>
  );
};

const Interactivity = () => {
  return (
    <DataProvider>
      <ProcurementDashboard />
    </DataProvider>
  );
};

export default Interactivity;
