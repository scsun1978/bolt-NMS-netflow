import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ResponsiveSankey } from '@nivo/sankey';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrafficAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [appTrafficData, setAppTrafficData] = useState<any>(null);
  const [userTrafficData, setUserTrafficData] = useState<any>(null);
  const [deviceTrafficData, setDeviceTrafficData] = useState<any>(null);

  useEffect(() => {
    // Generate mock data when component mounts or timeRange changes
    setAppTrafficData(generateMockData('App'));
    setUserTrafficData(generateMockData('User'));
    setDeviceTrafficData(generateMockData('Device'));
  }, [timeRange]);

  const generateMockData = (prefix: string) => {
    const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    return {
      labels,
      datasets: [
        {
          label: `${prefix} Traffic`,
          data: labels.map(() => Math.floor(Math.random() * 1000)),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Traffic Analysis'
      }
    }
  };

  // Updated Sankey data
  const sankeyData = {
    nodes: [
      { id: 'input1', name: '11.11.11.1' },
      { id: 'input2', name: '21.21.21.1' },
      { id: 'output1', name: '13.13.13.1' },
      { id: 'output2', name: '22.22.22.1' },
      { id: 'app1', name: 'npp' },
      { id: 'app2', name: 'dcutility' },
      { id: 'app3', name: 'echonet' },
      { id: 'app4', name: 'dpcp' },
      { id: 'app5', name: 'esbroker' },
    ],
    links: [
      { source: 'input1', target: 'app1', value: 20 },
      { source: 'input1', target: 'app2', value: 15 },
      { source: 'input2', target: 'app3', value: 10 },
      { source: 'input2', target: 'app4', value: 25 },
      { source: 'app1', target: 'output1', value: 18 },
      { source: 'app2', target: 'output1', value: 12 },
      { source: 'app3', target: 'output2', value: 8 },
      { source: 'app4', target: 'output2', value: 22 },
      { source: 'input1', target: 'app5', value: 5 },
      { source: 'app5', target: 'output2', value: 5 },
    ]
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">流量详细分析</h2>
      <Form.Group className="mb-3">
        <Form.Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="24h">最近24小时</option>
          <option value="7d">最近7天</option>
          <option value="30d">最近30天</option>
        </Form.Select>
      </Form.Group>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>应用流量详情</Card.Title>
              {appTrafficData && <Line data={appTrafficData} options={chartOptions} />}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>用户流量详情</Card.Title>
              {userTrafficData && <Line data={userTrafficData} options={chartOptions} />}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>重点关注设备流量详情</Card.Title>
              {deviceTrafficData && <Line data={deviceTrafficData} options={chartOptions} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>流量汇总</Card.Title>
              <div style={{ height: '500px' }}>
                <ResponsiveSankey
                  data={sankeyData}
                  margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                  align="justify"
                  colors={{ scheme: 'category10' }}
                  nodeOpacity={1}
                  nodeThickness={18}
                  nodeInnerPadding={3}
                  nodeSpacing={24}
                  nodeBorderWidth={0}
                  nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                  linkOpacity={0.5}
                  linkHoverOthersOpacity={0.1}
                  enableLinkGradient={true}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrafficAnalysis;