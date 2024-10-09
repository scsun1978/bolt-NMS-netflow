import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NetworkAppAnalysis = () => {
  const [appData, setAppData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '流量大小 (MB)',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  useEffect(() => {
    // 模拟从API获取数据
    const mockData = [
      { appName: 'HTTP', trafficSize: 1500, packetCount: 10000, connectionCount: 500 },
      { appName: 'HTTPS', trafficSize: 2000, packetCount: 15000, connectionCount: 750 },
      { appName: 'FTP', trafficSize: 500, packetCount: 5000, connectionCount: 100 },
      { appName: 'DNS', trafficSize: 100, packetCount: 2000, connectionCount: 1000 },
      { appName: 'SMTP', trafficSize: 300, packetCount: 3000, connectionCount: 200 },
    ];
    setAppData(mockData);

    setChartData({
      labels: mockData.map(item => item.appName),
      datasets: [
        {
          label: '流量大小 (MB)',
          data: mockData.map(item => item.trafficSize),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });
  }, []);

  return (
    <Container fluid>
      <h2 className="my-4">网络应用详细分析</h2>
      
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>时间范围</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>应用类型</Form.Label>
            <Form.Select>
              <option>所有应用</option>
              <option>HTTP</option>
              <option>HTTPS</option>
              <option>FTP</option>
              <option>DNS</option>
              <option>SMTP</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h4>应用流量趋势</h4>
          <Bar data={chartData} />
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>应用流量详情</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>应用名称</th>
                <th>流量大小 (MB)</th>
                <th>数据包数</th>
                <th>连接数</th>
              </tr>
            </thead>
            <tbody>
              {appData.map((app, index) => (
                <tr key={index}>
                  <td>{app.appName}</td>
                  <td>{app.trafficSize}</td>
                  <td>{app.packetCount}</td>
                  <td>{app.connectionCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default NetworkAppAnalysis;