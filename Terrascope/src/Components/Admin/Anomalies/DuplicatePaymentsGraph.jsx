import React from 'react';
import mockData from "../../../MockData.json";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DuplicatePaymentChart = ({ selectedYear, selectedCountry }) => {
  if (!selectedYear || !selectedCountry) {
    return <div>Please select a year and country to view data.</div>;
  }

  const suppliers = mockData.yearly_data[selectedYear].country[selectedCountry].regions.North.suppliers;

  const supplierWithDuplicatePayments = suppliers.find(supplier =>
    supplier.procurement_KPIs.duplicate_payment?.payment_history
  );
  if (!supplierWithDuplicatePayments) {
    return <div>No duplicate payment data available for the selected year and country.</div>;
  }

  const paymentHistory = supplierWithDuplicatePayments.procurement_KPIs.duplicate_payment.payment_history;
  const months = paymentHistory.map(item => item.month);
  const amounts = paymentHistory.map(item => parseInt(item.amount.replace('$', '').replace(',', '')));
  const amounts2 = paymentHistory.map(item => item.amount2 ? parseInt(item.amount2.replace('$', '').replace(',', '')) : null).filter(amount => amount !== null);

  const allAmounts = [...amounts, ...amounts2];
  const backgroundColors = months.map(month => {
    const monthData = paymentHistory.find(item => item.month === month);
    if (monthData.amount2) {
        // Create a red gradient for duplicate payments
        const redGradient = document.createElement('canvas').getContext('2d');
        const gradient = redGradient.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#E01C34'); // Bright red
        gradient.addColorStop(1, 'rgba(255, 99, 132, 0.2)'); // Faded red
        return gradient;
    } else {
        // Create a purple gradient for non-duplicate payments
        const purpleGradient = document.createElement('canvas').getContext('2d');
        const gradient = purpleGradient.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#722AE6'); // Bright purple
        gradient.addColorStop(1, '#F8CEEC'); // Faded purple
        return gradient;
    }
});

const chartData = {
    labels: months,
    datasets: [
        {
            label: 'Successfull Payment',
            data: allAmounts,
            borderColor: '#E01C34', // Red border for all bars
            backgroundColor: backgroundColors, // Apply gradients based on duplicate/non-duplicate
            fill: true, // Bar charts are filled by default
            barThickness: 30, // Set the thickness of the bars
        },
    ],
};
  // Highlight duplicate amounts in tooltip
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const month = tooltipItem.label;
            const amount = tooltipItem.raw;
            const monthData = paymentHistory.find(item => item.month === month);

            // Check if the current bar is for a month with two payments
            if (monthData.amount2 && amount === parseInt(monthData.amount.replace('$', '').replace(',', ''))) {
              // Show both payments for months with duplicates
              return `Payment 1: ${monthData.amount} | Payment 2: ${monthData.amount2}`;
            }
            return `$${amount}`;
          },
        },
      },
    },
   scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-1">
        <div className="text-2xl font-semibold">30% Detected</div>
        <div className="text-sm text-red-500">+20% vs last year</div>
      </div>
      
      <div style={{ width: "100%", margin: "0 auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DuplicatePaymentChart;