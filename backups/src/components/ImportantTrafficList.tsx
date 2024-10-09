import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Row, Col, Pagination, Badge } from 'react-bootstrap';
import { Search, Calendar, ExclamationTriangle } from 'react-bootstrap-icons';
import AlertModal from './AlertModal';

const ImportantTrafficList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    setTrafficData(generateMockNetFlowData(50));
  }, []);

  const generateMockNetFlowData = (count) => {
    const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS', 'FTP', 'SSH', 'SMTP', 'POP3'];
    const deviceTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Load Balancer'];
    const ipRanges = ['192.168.', '10.', '172.16.', '203.0.113.', '198.51.100.'];

    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      deviceName: `Device-${Math.floor(Math.random() * 100)}`,
      deviceType: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      sourceIP: `${ipRanges[Math.floor(Math.random() * ipRanges.length)]}${Math.floor(Math.random() * 256)}`,
      destinationIP: `${ipRanges[Math.floor(Math.random() * ipRanges.length)]}${Math.floor(Math.random() * 256)}`,
      sourcePort: Math.floor(Math.random() * 65536),
      destinationPort: Math.floor(Math.random() * 65536),
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      inputInterface: `eth${Math.floor(Math.random() * 8)}`,
      outputInterface: `eth${Math.floor(Math.random() * 8)}`,
      packetCount: Math.floor(Math.random() * 1000000),
      byteCount: Math.floor(Math.random() * 1000000000),
      flowStartTime: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
      flowEndTime: new Date().toISOString(),
      tcpFlags: Math.floor(Math.random() * 64).toString(2).padStart(6, '0'),
      ipVersion: Math.random() > 0.2 ? 'IPv4' : 'IPv6',
      nextHop: `${ipRanges[Math.floor(Math.random() * ipRanges.length)]}${Math.floor(Math.random() * 256)}`,
      bgpSourceAsNumber: Math.floor(Math.random() * 65536),
      bgpDestinationAsNumber: Math.floor(Math.random() * 65536),
      sourceSubnetMask: Math.floor(Math.random() * 33),
      destinationSubnetMask: Math.floor(Math.random() * 33),
      status: ['normal', 'warning', 'danger'][Math.floor(Math.random() * 3)],
    }));
  };

  const totalPages = Math.ceil(trafficData.length / itemsPerPage);

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

  const handleAlertClick = (traffic) => {
    const alert = {
      id: traffic.id,
      deviceName: traffic.deviceName,
      deviceType: traffic.deviceType,
      sourceIP: traffic.sourceIP,
      destinationIP: traffic.destinationIP,
      protocol: traffic.protocol,
      packetCount: traffic.packetCount,
      byteCount: traffic.byteCount,
      flowStartTime: traffic.flowStartTime,
      flowEndTime: traffic.flowEndTime,
      status: traffic.status
    };
    setSelectedAlert(alert);
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
                <option>Router</option>
                <option>Switch</option>
                <option>Firewall</option>
                <option>Server</option>
                <option>Load Balancer</option>
              </Form.Select>
            </Form.Group>
          </Col>
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
              <th>源IP地址</th>
              <th>目标IP地址</th>
              <th>协议</th>
              <th>数据包数</th>
              <th>字节数</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {trafficData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(traffic => (
              <tr key={traffic.id}>
                <td>{traffic.deviceName}</td>
                <td>{traffic.deviceType}</td>
                <td>{traffic.sourceIP}</td>
                <td>{traffic.destinationIP}</td>
                <td>{traffic.protocol}</td>
                <td>{traffic.packetCount.toLocaleString()}</td>
                <td>{traffic.byteCount.toLocaleString()}</td>
                <td>{new Date(traffic.flowStartTime).toLocaleString()}</td>
                <td>{new Date(traffic.flowEndTime).toLocaleString()}</td>
                <td>
                  <Badge
                    bg={traffic.status === 'normal' ? 'success' : (traffic.status === 'warning' ? 'warning' : 'danger')}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleAlertClick(traffic)}
                  >
                    {traffic.status !== 'normal' && <ExclamationTriangle className="me-1" />}
                    {traffic.status === 'normal' ? '正常' : (traffic.status === 'warning' ? '警告' : '危险')}
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

export default ImportantTrafficList;