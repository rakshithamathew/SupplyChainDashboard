import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import mockData from "../../../MockData.json";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const SupplierGraph = ({ selectedYear, selectedCountry }) => {
  if (!selectedYear || !selectedCountry) {
    return <div>Please select a year and country to view data.</div>;
  }

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`;
  };

  const getAggregatedData = () => {
    let aggregatedData = [];

    if (selectedYear === "all" && selectedCountry === "all") {
      Object.keys(mockData.yearly_data).forEach((year) => {
        Object.keys(mockData.yearly_data[year].country).forEach((country) => {
          const suppliers = mockData.yearly_data[year].country[country].regions.North.suppliers;
          suppliers.forEach((supplier) => {
            const volumes = supplier?.procurement_KPIs?.seasonal_high_low?.monthly_purchase_volume?.map((item, index) => ({
              x: index, 
              y: item.volume, 
            }));
            if (volumes) {
              aggregatedData.push({
                label: `${supplier.name} (${year}, ${country})`,
                data: volumes,
                backgroundColor: generateRandomColor(), 
                borderColor: generateRandomColor(),
                pointRadius: 6,
                pointHoverRadius: 8, 
              });
            }
          });
        });
      });
    } else if (selectedYear === "all") {
      Object.keys(mockData.yearly_data).forEach((year) => {
        const suppliers = mockData.yearly_data[year].country[selectedCountry]?.regions?.North?.suppliers;
        if (suppliers) {
          suppliers.forEach((supplier) => {
            const volumes = supplier?.procurement_KPIs?.seasonal_high_low?.monthly_purchase_volume?.map((item, index) => ({
              x: index,
              y: item.volume,
            }));
            if (volumes) {
              aggregatedData.push({
                label: `${supplier.name} (${year})`,
                data: volumes,
                backgroundColor: generateRandomColor(),
                borderColor: generateRandomColor(),
                pointRadius: 6,
                pointHoverRadius: 8,
              });
            }
          });
        }
      });
    } else if (selectedCountry === "all") {
      Object.keys(mockData.yearly_data[selectedYear].country).forEach((country) => {
        const suppliers = mockData.yearly_data[selectedYear].country[country].regions.North.suppliers;
        suppliers.forEach((supplier) => {
          const volumes = supplier?.procurement_KPIs?.seasonal_high_low?.monthly_purchase_volume?.map((item, index) => ({
            x: index,
            y: item.volume,
          }));
          if (volumes) {
            aggregatedData.push({
              label: `${supplier.name} (${country})`,
              data: volumes,
              backgroundColor: generateRandomColor(),
              borderColor: generateRandomColor(),
              pointRadius: 6,
              pointHoverRadius: 8,
            });
          }
        });
      });
    } else {
      const suppliers = mockData.yearly_data[selectedYear].country[selectedCountry].regions.North.suppliers;
      suppliers.forEach((supplier) => {
        const volumes = supplier?.procurement_KPIs?.seasonal_high_low?.monthly_purchase_volume?.map((item, index) => ({
          x: index,
          y: item.volume,
        }));
        if (volumes) {
          aggregatedData.push({
            label: supplier.name,
            data: volumes,
            backgroundColor: generateRandomColor(),
            borderColor: generateRandomColor(),
            pointRadius: 6,
            pointHoverRadius: 8,
          });
        }
      });
    }

    return aggregatedData;
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (!mockData.yearly_data["2019"].country["USA"].regions.North.suppliers[0]?.procurement_KPIs?.seasonal_high_low?.monthly_purchase_volume) {
    return <div>No purchase volume data available for the selected filters.</div>;
  }

  const chartData = {
    datasets: getAggregatedData(),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
        ticks: {
          callback: (value, index) => labels[index], 
        },
      },
      y: {
        title: {
          display: true,
          text: 'Purchase Volume',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataPoint = tooltipItem.raw;
            return `${tooltipItem.dataset.label}: Volume = ${dataPoint.y}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-1">
        <div className="text-2xl font-semibold">Unexpected Purchase Volume</div>
        <div className="text-sm text-red-500">+20% vs last year</div>
      </div>
      
      <div style={{ width: "100%", margin: "0 auto" }}>
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SupplierGraph;