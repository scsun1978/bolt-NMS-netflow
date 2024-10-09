import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Row, Col } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const RealtimeMonitoring: React.FC = () => {
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: '带宽使用率 (Mbps)',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  const [totalTraffic, setTotalTraffic] = useState({
    labels: ['已用流量', '剩余流量'],
    datasets: [{
      data: [0, 100],
      backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
    }]
  });

  const [trafficRatio, setTrafficRatio] = useState({
    labels: ['上行流量', '下行流量'],
    datasets: [{
      data: [50, 50],
      backgroundColor: ['rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)'],
    }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newLabel = new Date().toLocaleTimeString();
      const newData = Math.floor(Math.random() * 100);
      
      setLineData(prevData => ({
        labels: [...prevData.labels.slice(-19), newLabel],
        datasets: [{
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data.slice(-19), newData]
        }]
      }));

      // Update total traffic
      const usedTraffic = Math.floor(Math.random() * 100);
      setTotalTraffic(prevData => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0],
          data: [usedTraffic, 100 - usedTraffic]
        }]
      }));

      // Update traffic ratio
      const upTraffic = Math.floor(Math.random() * 100);
      setTrafficRatio(prevData => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0],
          data: [upTraffic, 100 - upTraffic]
        }]
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '实时带宽监控'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: '带宽使用率 (Mbps)'
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    }
  };

  return (
    <Row>
      <Col md={8}>
        <Line data={lineData} options={lineOptions} />
      </Col>
      <Col md={2}>
        <Doughnut data={totalTraffic} options={{
          ...pieOptions,
          plugins: {
            ...pieOptions.plugins,
            title: {
              display: true,
              text: '总流量'
            }
          }
        }} />
      </Col>
      <Col md={2}>
        <Doughnut data={trafficRatio} options={{
          ...pieOptions,
          plugins: {
            ...pieOptions.plugins,
            title: {
              display: true,
              text: '流量比值'
            }
          }
        }} />
      </Col>
    </Row>
  );
};

export default RealtimeMonitoring;