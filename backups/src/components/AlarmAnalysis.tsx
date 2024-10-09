import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const AlarmAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [chartData, setChartData] = useState({
    alarmStatus: {
      labels: ['未处理', '处理中', '已处理'],
      datasets: [{ data: [0, 0, 0], backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'] }]
    },
    alarmType: {
      labels: ['安全威胁', '性能问题', '网络异常', '配置错误', '其他'],
      datasets: [{ 
        label: '告警数量', 
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ]
      }]
    },
    alarmTrend: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [{
        label: '告警数量',
        data: [0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }]
    },
    topSourceIPs: {
      labels: ['192.168.1.100', '10.0.0.1', '172.16.0.1', '192.168.2.50', '10.1.1.1'],
      datasets: [{
        label: '告警次数',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }]
    },
    severityDistribution: {
      labels: ['低', '中', '高', '紧急'],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336'],
      }]
    }
  });

  useEffect(() => {
    updateChartData();
    const interval = setInterval(updateChartData, 5000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const updateChartData = () => {
    setChartData(prevData => ({
      alarmStatus: {
        ...prevData.alarmStatus,
        datasets: [{ 
          ...prevData.alarmStatus.datasets[0],
          data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
        }]
      },
      alarmType: {
        ...prevData.alarmType,
        datasets: [{
          ...prevData.alarmType.datasets[0],
          data: Array.from({length: 5}, () => Math.floor(Math.random() * 50))
        }]
      },
      alarmTrend: {
        ...prevData.alarmTrend,
        datasets: [{
          ...prevData.alarmTrend.datasets[0],
          data: Array.from({length: 6}, () => Math.floor(Math.random() * 20))
        }]
      },
      topSourceIPs: {
        ...prevData.topSourceIPs,
        datasets: [{
          ...prevData.topSourceIPs.datasets[0],
          data: Array.from({length: 5}, () => Math.floor(Math.random() * 50))
        }]
      },
      severityDistribution: {
        ...prevData.severityDistribution,
        datasets: [{
          ...prevData.severityDistribution.datasets[0],
          data: [
            Math.floor(Math.random() * 30),
            Math.floor(Math.random() * 40),
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 10)
          ]
        }]
      }
    }));
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '告警趋势'
      }
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">告警分析</h2>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="24h">最近24小时</option>
              <option value="7d">最近7天</option>
              <option value="30d">最近30天</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button variant="primary" onClick={updateChartData}>刷新数据</Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>告警状态分布</Card.Title>
              <div style={{ height: '300px' }}>
                <Doughnut data={chartData.alarmStatus} options={{ ...options, cutout: '60%' }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>告警类型分布</Card.Title>
              <div style={{ height: '300px' }}>
                <Bar data={chartData.alarmType} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>告警趋势</Card.Title>
              <div style={{ height: '300px' }}>
                <Line data={chartData.alarmTrend} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Top 5 源 IP 地址</Card.Title>
              <div style={{ height: '300px' }}>
                <Bar data={chartData.topSourceIPs} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>告警严重程度分布</Card.Title>
              <div style={{ height: '300px' }}>
                <Doughnut data={chartData.severityDistribution} options={{ ...options, cutout: '60%' }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AlarmAnalysis;