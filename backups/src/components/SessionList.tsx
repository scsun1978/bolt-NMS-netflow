import React, { useState } from 'react';
import { Container, Table, Form, Button, Row, Col, Pagination } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import SessionPathModal from './SessionPathModal';

const SessionList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPathModal, setShowPathModal] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const itemsPerPage = 20;

  // 更新模拟数据，包含 NetFlow Session ID
  const sessions = [
    { id: 1, source: '192.168.1.100', destination: '10.0.0.1', appType: 'Web浏览', ipVersion: 'IPv4', protocol: 'TCP', sourcePort: 54321, destPort: 80, sentPackets: 1250, receivedPackets: 850, sentBytes: 128000, receivedBytes: 2048000, netflowSessionId: 'NF1234567890' },
    { id: 2, source: '192.168.1.101', destination: '10.0.0.2', appType: '文件传输', ipVersion: 'IPv4', protocol: 'TCP', sourcePort: 49152, destPort: 21, sentPackets: 5000, receivedPackets: 4800, sentBytes: 5120000, receivedBytes: 102400000, netflowSessionId: 'NF2345678901' },
    { id: 3, source: '192.168.1.102', destination: '10.0.0.3', appType: '数据库', ipVersion: 'IPv4', protocol: 'TCP', sourcePort: 52000, destPort: 3306, sentPackets: 3000, receivedPackets: 2950, sentBytes: 450000, receivedBytes: 8192000, netflowSessionId: 'NF3456789012' },
    { id: 4, source: '192.168.1.103', destination: '10.0.0.4', appType: '邮件', ipVersion: 'IPv4', protocol: 'TCP', sourcePort: 58000, destPort: 25, sentPackets: 500, receivedPackets: 480, sentBytes: 768000, receivedBytes: 256000, netflowSessionId: 'NF4567890123' },
    { id: 5, source: '192.168.1.104', destination: '10.0.0.5', appType: 'VoIP', ipVersion: 'IPv4', protocol: 'UDP', sourcePort: 16384, destPort: 16384, sentPackets: 15000, receivedPackets: 14800, sentBytes: 2400000, receivedBytes: 2368000, netflowSessionId: 'NF5678901234' },
    // ... 添加更多模拟数据
  ];

  const totalPages = Math.ceil(sessions.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleShowPathModal = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setShowPathModal(true);
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">会话列表</h2>
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="源IP地址" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="目的IP地址" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Select>
                <option value="">应用类别</option>
                <option value="Web浏览">Web浏览</option>
                <option value="文件传输">文件传输</option>
                <option value="数据库">数据库</option>
                <option value="邮件">邮件</option>
                <option value="VoIP">VoIP</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Select>
                <option value="">IP版本</option>
                <option value="IPv4">IPv4</option>
                <option value="IPv6">IPv6</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Select>
                <option value="">协议</option>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="ICMP">ICMP</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小源端口" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最大源端口" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小目的端口" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最大目的端口" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小发送报文数" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小接收报文数" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小发送字节数" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="最小接收字节数" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="NetFlow Session ID" />
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
              <th>源IP地址</th>
              <th>目的IP地址</th>
              <th>应用类别</th>
              <th>IPv4/v6</th>
              <th>协议号</th>
              <th>源端口</th>
              <th>目的端口</th>
              <th>发送报文数</th>
              <th>接收报文数</th>
              <th>发送字节数</th>
              <th>接收字节数</th>
              <th>会话路径</th>
            </tr>
          </thead>
          <tbody>
            {sessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(session => (
              <tr key={session.id}>
                <td>{session.source}</td>
                <td>{session.destination}</td>
                <td>{session.appType}</td>
                <td>{session.ipVersion}</td>
                <td>{session.protocol}</td>
                <td>{session.sourcePort}</td>
                <td>{session.destPort}</td>
                <td>{session.sentPackets}</td>
                <td>{session.receivedPackets}</td>
                <td>{session.sentBytes}</td>
                <td>{session.receivedBytes}</td>
                <td>
                  <Button variant="link" onClick={() => handleShowPathModal(session.netflowSessionId)}>
                    {session.netflowSessionId}
                  </Button>
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

      <SessionPathModal
        show={showPathModal}
        onHide={() => setShowPathModal(false)}
        sessionId={selectedSessionId}
      />
    </Container>
  );
};

export default SessionList;