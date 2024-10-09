import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ResponsiveSankey } from '@nivo/sankey';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrafficAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [networkTrafficData, setNetworkTrafficData] = useState<any>(null);
  const [subnetTrafficData, setSubnetTrafficData] = useState<any>(null);
  const [deviceTrafficData, setDeviceTrafficData] = useState<any>(null);
  const [sankeyData, setSankeyData] = useState<any>(null);

  useEffect(() => {
    // Generate mock data when component mounts or timeRange changes
    setNetworkTrafficData(generateMockLineData('Network Traffic'));
    setSubnetTrafficData(generateMockLineData('Subnet Traffic'));
    setDeviceTrafficData(generateMockLineData('Device Traffic'));
    setSankeyData(generateMockSankeyData());
  }, [timeRange]);

  const generateMockLineData = (prefix: string) => {
    const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    return {
      labels,
      datasets: [
        {
          label: `${prefix} (Mbps)`,
          data: labels.map(() => Math.floor(Math.random() * 1000)),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  const generateMockSankeyData = () => {
    const nodes = [
      { id: 'subnet1', name: '192.168.1.0/24' },
      { id: 'subnet2', name: '10.0.0.0/24' },
      { id: 'app1', name: 'HTTP' },
      { id: 'app2', name: 'HTTPS' },
      { id: 'app3', name: 'DNS' },
      { id: 'device1', name: 'Server1' },
      { id: 'device2', name: 'Router1' },
      { id: 'device3', name: 'Switch1' },
    ];

    const links = [
      { source: 'subnet1', target: 'app1', value: 20 },
      { source: 'subnet1', target: 'app2', value: 15 },
      { source: 'subnet2', target: 'app2', value: 10 },
      { source: 'subnet2', target: 'app3', value: 5 },
      { source: 'app1', target: 'device1', value: 18 },
      { source: 'app2', target: 'device2', value: 22 },
      { source: 'app3', target: 'device3', value: 5 },
    ];

    return { nodes, links };
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
              <Card.Title>网络流量</Card.Title>
              {networkTrafficData && <Line data={networkTrafficData} options={chartOptions} />}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>网段流量</Card.Title>
              {subnetTrafficData && <Line data={subnetTrafficData} options={chartOptions} />}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>重点设备流量</Card.Title>
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
                {sankeyData && (
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
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrafficAnalysis;