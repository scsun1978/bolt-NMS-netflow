import React, { useState } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { Row, Col, Table, Card, Badge } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import AlertModal from './AlertModal';

const SankeyDiagram = ({ data }) => (
  <div style={{ height: '400px' }}>
    <ResponsiveSankey
      data={data}
      margin={{ top: 40, right: 160, bottom: 40, left: 160 }}
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
      labelPosition="outside"
      labelOrientation="horizontal"
      labelPadding={16}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
    />
  </div>
);

const ImportantNotices = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const sankeyData = {
    nodes: [
      { id: 'Router1', name: '路由器1' },
      { id: 'Switch1', name: '交换机1' },
      { id: 'Firewall1', name: '防火墙1' },
      { id: 'Server1', name: '服务器1' },
      { id: 'Server2', name: '服务器2' },
      { id: 'Client1', name: '客户端1' },
      { id: 'Client2', name: '客户端2' },
      { id: 'Client3', name: '客户端3' },
      { id: 'Client4', name: '客户端4' },
      { id: 'Client5', name: '客户端5' },
    ],
    links: [
      { source: 'Router1', target: 'Switch1', value: 100 },
      { source: 'Router1', target: 'Firewall1', value: 50 },
      { source: 'Switch1', target: 'Server1', value: 80 },
      { source: 'Switch1', target: 'Server2', value: 60 },
      { source: 'Firewall1', target: 'Client1', value: 40 },
      { source: 'Firewall1', target: 'Client2', value: 30 },
      { source: 'Server1', target: 'Client3', value: 70 },
      { source: 'Server1', target: 'Client4', value: 50 },
      { source: 'Server2', target: 'Client5', value: 60 },
    ]
  };

  const notices = [
    { id: 1, deviceName: '路由器1', deviceType: '网络设备', connectedTerminals: 50, totalTraffic: '1.2GB', alertType: '流量异常' },
    { id: 2, deviceName: '交换机1', deviceType: '网络设备', connectedTerminals: 30, totalTraffic: '800MB', alertType: '连接数异常' },
    { id: 3, deviceName: '防火墙1', deviceType: '安全设备', connectedTerminals: 20, totalTraffic: '500MB', alertType: '安全警报' },
    { id: 4, deviceName: '服务器1', deviceType: '服务器', connectedTerminals: 40, totalTraffic: '2GB', alertType: 'CPU使用率高' },
    { id: 5, deviceName: '服务器2', deviceType: '服务器', connectedTerminals: 25, totalTraffic: '1.5GB', alertType: '磁盘空间不足' },
  ];

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  return (
    <Card>
      <Card.Header as="h5">重点关注</Card.Header>
      <Card.Body>
        <Row>
          <Col md={12} className="mb-4">
            <SankeyDiagram data={sankeyData} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>设备名称</th>
                  <th>设备类型</th>
                  <th>连接终端数</th>
                  <th>总流量</th>
                  <th>告警类型</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id}>
                    <td>{notice.deviceName}</td>
                    <td>{notice.deviceType}</td>
                    <td>{notice.connectedTerminals}</td>
                    <td>{notice.totalTraffic}</td>
                    <td>
                      <Badge
                        bg="danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleAlertClick(notice)}
                      >
                        <ExclamationTriangle className="me-1" />
                        {notice.alertType}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
      <AlertModal
        show={showModal}
        onHide={() => setShowModal(false)}
        alert={selectedAlert}
      />
    </Card>
  );
};

export default ImportantNotices;