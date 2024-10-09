import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Row, Col, Pagination, Badge } from 'react-bootstrap';
import { Search, Calendar, ExclamationTriangle } from 'react-bootstrap-icons';
import AlertModal from './AlertModal';

const ImportantDeviceList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [deviceData, setDeviceData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    setDeviceData(generateMockDeviceData(50));
  }, []);

  const generateMockDeviceData = (count) => {
    const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS', 'FTP', 'SSH', 'SMTP', 'POP3'];
    const deviceTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Load Balancer'];
    const ipRanges = ['192.168.', '10.', '172.16.', '203.0.113.', '198.51.100.'];
    const applications = ['Web Browsing', 'File Transfer', 'Email', 'Database', 'VoIP', 'Video Streaming', 'Gaming', 'IoT', 'Backup', 'ERP'];

    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      deviceName: `Device-${Math.floor(Math.random() * 100)}`,
      deviceType: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      ip: `${ipRanges[Math.floor(Math.random() * ipRanges.length)]}${Math.floor(Math.random() * 256)}`,
      applications: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => applications[Math.floor(Math.random() * applications.length)]),
      totalTraffic: Math.floor(Math.random() * 1000000000),
      packetCount: Math.floor(Math.random() * 1000000),
      activeConnections: Math.floor(Math.random() * 10000),
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
      status: ['normal', 'warning', 'danger'][Math.floor(Math.random() * 3)],
    }));
  };

  const totalPages = Math.ceil(deviceData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge bg="success">正常</Badge>;
      case 'warning':
        return <Badge bg="warning">警告</Badge>;
      case 'danger':
        return <Badge bg="danger">危险</Badge>;
      default:
        return <Badge bg="secondary">未知</Badge>;
    }
  };

  const handleAlertClick = (device) => {
    setSelectedAlert(device);
    setShowAlertModal(true);
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">重点设备关注</h2>
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="设备名称" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Select>
                <option>设备类型</option>
                {['Router', 'Switch', 'Firewall', 'Server', 'Load Balancer'].map(type => (
                  <option key={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Select>
                <option>应用类型</option>
                {['Web Browsing', 'File Transfer', 'Email', 'Database', 'VoIP', 'Video Streaming', 'Gaming', 'IoT', 'Backup', 'ERP'].map(app => (
                  <option key={app}>{app}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Select>
                <option>状态</option>
                <option>正常</option>
                <option>警告</option>
                <option>危险</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小流量 (MB)" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最大流量 (MB)" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小 CPU 使用率 (%)" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最大 CPU 使用率 (%)" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Button variant="primary" type="submit" className="w-100">
              <Search className="me-2" />
              查询
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>设备名称</th>
              <th>设备类型</th>
              <th>IP地址</th>
              <th>应用</th>
              <th>总流量 (MB)</th>
              <th>数据包数</th>
              <th>活跃连接数</th>
              <th>CPU使用率</th>
              <th>内存使用率</th>
              <th>最后更新时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {deviceData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(device => (
              <tr key={device.id}>
                <td>{device.deviceName}</td>
                <td>{device.deviceType}</td>
                <td>{device.ip}</td>
                <td>{device.applications.join(', ')}</td>
                <td>{(device.totalTraffic / 1000000).toFixed(2)}</td>
                <td>{device.packetCount.toLocaleString()}</td>
                <td>{device.activeConnections.toLocaleString()}</td>
                <td>{device.cpuUsage}%</td>
                <td>{device.memoryUsage}%</td>
                <td>{new Date(device.lastUpdated).toLocaleString()}</td>
                <td>
                  <Badge
                    bg={device.status === 'normal' ? 'success' : (device.status === 'warning' ? 'warning' : 'danger')}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleAlertClick(device)}
                  >
                    {device.status !== 'normal' && <ExclamationTriangle className="me-1" />}
                    {device.status === 'normal' ? '正常' : (device.status === 'warning' ? '警告' : '危险')}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination className="justify-content-end mt-3">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>

      <AlertModal
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
        alert={selectedAlert}
      />
    </Container>
  );
};

export default ImportantDeviceList;