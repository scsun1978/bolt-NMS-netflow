import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserTrafficDistribution: React.FC = () => {
  const [data, setData] = useState({
    labels: ['网段1', '网段2', '网段3', '网段4', '网段5', '网段6', '网段7', '网段8', '网段9', '网段10'],
    datasets: [
      {
        label: '流量',
        data: [165, 259, 180, 381, 256, 155, 240, 190, 210, 170],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: '占比',
        data: [45, 59, 40, 81, 56, 35, 50, 40, 45, 35],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  });

  const [totalTraffic, setTotalTraffic] = useState(0);

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

  useEffect(() => {
    const newTotalTraffic = data.datasets[0].data.reduce((a, b) => a + b, 0);
    setTotalTraffic(newTotalTraffic);
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `用户网段流量分布 (总流量: ${totalTraffic})`
      }
    },
    animation: {
      duration: 1000,
      easing: 'linear' as const,
    }
  };

  return <Bar data={data} options={options} />;
};

export default UserTrafficDistribution;