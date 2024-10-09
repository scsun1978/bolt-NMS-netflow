import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { ResponsiveSankey } from '@nivo/sankey';

const SubnetTrafficAnalysis = () => {
  const [subnetData, setSubnetData] = useState([]);
  const [sankeyData, setSankeyData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // 模拟从API获取数据
    const mockData = [
      { sourceSubnet: '192.168.1.0/24', destSubnet: '10.0.0.0/24', trafficSize: 1500, packetCount: 10000 },
      { sourceSubnet: '192.168.1.0/24', destSubnet: '172.16.0.0/16', trafficSize: 2000, packetCount: 15000 },
      { sourceSubnet: '10.0.0.0/24', destSubnet: '172.16.0.0/16', trafficSize: 500, packetCount: 5000 },
      { sourceSubnet: '172.16.0.0/16', destSubnet: '192.168.2.0/24', trafficSize: 1000, packetCount: 8000 },
    ];
    setSubnetData(mockData);

    // 准备桑基图数据
    const nodes = [...new Set(mockData.flatMap(item => [item.sourceSubnet, item.destSubnet]))].map(id => ({ id }));
    const links = mockData.map(item => ({
      source: item.sourceSubnet,
      target: item.destSubnet,
      value: item.trafficSize
    }));
    setSankeyData({ nodes, links });
  }, []);

  return (
    <Container fluid>
      <h2 className="my-4">网段流量详细分析</h2>
      
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>时间范围</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>网段</Form.Label>
            <Form.Select>
              <option>所有网段</option>
              <option>192.168.1.0/24</option>
              <option>10.0.0.0/24</option>
              <option>172.16.0.0/16</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h4>网段间流量分布</h4>
          <div style={{ height: '400px' }}>
            {sankeyData.nodes.length > 0 && sankeyData.links.length > 0 && (
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
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>网段流量详情</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>源网段</th>
                <th>目的网段</th>
                <th>流量大小 (MB)</th>
                <th>数据包数</th>
              </tr>
            </thead>
            <tbody>
              {subnetData.map((subnet, index) => (
                <tr key={index}>
                  <td>{subnet.sourceSubnet}</td>
                  <td>{subnet.destSubnet}</td>
                  <td>{subnet.trafficSize}</td>
                  <td>{subnet.packetCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SubnetTrafficAnalysis;