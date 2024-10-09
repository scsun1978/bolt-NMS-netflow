import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApplicationTrafficDistribution = () => {
  const [data, setData] = useState({
    labels: ['应用1', '应用2', '应用3', '应用4', '应用5', '应用6', '应用7', '应用8', '应用9', '应用10'],
    datasets: [
      {
        label: '流量',
        data: [320, 332, 301, 334, 390, 330, 320, 315, 285, 270],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '占比',
        data: [55, 59, 50, 61, 70, 58, 55, 53, 48, 45],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: '趋势',
        data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
        type: 'line',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
        fill: false,
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map(value => Math.max(0, value + Math.floor(Math.random() * 20 - 10)))
        }))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalTraffic = data.datasets[0].data.reduce((a, b) => a + b, 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `应用流量分布 (总流量: ${totalTraffic})`
      }
    },
    animation: {
      duration: 1000,
      easing: 'linear'
    }
  };

  return <Bar data={data} options={options} />;
};

export default ApplicationTrafficDistribution;