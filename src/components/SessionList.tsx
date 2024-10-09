import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import CardList from './CardList';
import SessionPathModal from './SessionPathModal';

const SessionList: React.FC = () => {
  const [showPathModal, setShowPathModal] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [sessions, setSessions] = useState<any[]>([]); // Initialize with an empty array

  useEffect(() => {
    // 模拟从API获取数据
    const fetchData = async () => {
      const data = await generateMockSessions(50);
      setSessions(data);
    };
    fetchData();
  }, []);

  const generateMockSessions = async (count: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      sourceIP: `192.168.1.${Math.floor(Math.random() * 255)}`,
      destinationIP: `10.0.0.${Math.floor(Math.random() * 255)}`,
      applicationCategory: ['Web浏览', '文件传输', '数据库', '邮件', 'VoIP'][Math.floor(Math.random() * 5)],
      ipVersion: Math.random() > 0.2 ? 'IPv4' : 'IPv6',
      protocol: ['TCP', 'UDP', 'ICMP'][Math.floor(Math.random() * 3)],
      sourcePort: Math.floor(Math.random() * 65535),
      destinationPort: Math.floor(Math.random() * 65535),
      sentPackets: Math.floor(Math.random() * 1000),
      receivedPackets: Math.floor(Math.random() * 1000),
      sentBytes: Math.floor(Math.random() * 1000000),
      receivedBytes: Math.floor(Math.random() * 1000000),
      netflowSessionId: `NF${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }));
  };

  const handleShowPathModal = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setShowPathModal(true);
  };

  const headers = ['源IP地址', '目的IP地址', '应用类别', 'IPv4/v6', '协议号', '源端口', '目的端口', '发送报文数', '接收报文数', '发送字节数', '接收字节数', '会话路径'];

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">会话列表</h2>
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Control type="text" placeholder="源IP地址" />
          </Col>
          <Col md={3}>
            <Form.Control type="text" placeholder="目的IP地址" />
          </Col>
          <Col md={3}>
            <Form.Select>
              <option value="">应用类别</option>
              <option value="Web浏览">Web浏览</option>
              <option value="文件传输">文件传输</option>
              <option value="数据库">数据库</option>
              <option value="邮件">邮件</option>
              <option value="VoIP">VoIP</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button variant="primary" type="submit" className="w-100">
              <Search className="me-2" />
              查询
            </Button>
          </Col>
        </Row>
      </Form>
      <CardList
        title="会话列表"
        headers={headers}
        data={sessions}
        onEdit={(session) => handleShowPathModal(session.netflowSessionId)}
      />
      <SessionPathModal
        show={showPathModal}
        onHide={() => setShowPathModal(false)}
        sessionId={selectedSessionId}
      />
    </Container>
  );
};

export default SessionList;