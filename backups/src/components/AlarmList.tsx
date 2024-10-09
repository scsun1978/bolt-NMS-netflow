import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Row, Col, Pagination, Badge } from 'react-bootstrap';
import { Search, Calendar } from 'react-bootstrap-icons';
import AlarmModal from './AlarmModal';
import AlarmTimeline from './AlarmTimeline';

const AlarmList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [alarmData, setAlarmData] = useState([]);
  const itemsPerPage = 15;

  useEffect(() => {
    setAlarmData(generateAlarmData(50));
  }, []);

  const generateAlarmData = (count) => {
    const alarmTypes = [
      { content: 'DDoS攻击检测', category: '安全威胁', detectionMethod: '基于流量模式分析' },
      { content: '带宽使用率超过阈值', category: '性能问题', detectionMethod: '带宽利用率监控' },
      { content: 'SQL注入尝试', category: '安全威胁', detectionMethod: '特征匹配' },
      { content: '异常流量模式', category: '网络异常', detectionMethod: '统计分析' },
      { content: '端口扫描检测', category: '安全威胁', detectionMethod: '连接尝试频率分析' },
      { content: 'BGP路由异常', category: '网络异常', detectionMethod: '路由表变化监控' },
      { content: '网络延迟超过阈值', category: '性能问题', detectionMethod: 'RTT监测' },
      { content: '未授权访问尝试', category: '安全威胁', detectionMethod: '访问控制列表分析' },
      { content: '数据包丢失率高', category: '网络异常', detectionMethod: '数据包计数分析' },
      { content: '异常大小数据包', category: '安全威胁', detectionMethod: '数据包大小统计' },
      { content: 'DNS隧道检测', category: '安全威胁', detectionMethod: 'DNS请求模式分析' },
      { content: 'ICMP泛洪', category: '安全威胁', detectionMethod: 'ICMP流量分析' },
      { content: 'ARP欺骗检测', category: '安全威胁', detectionMethod: 'ARP表监控' },
      { content: '异常协议使用', category: '网络异常', detectionMethod: '协议使用统计' },
      { content: 'SYN Flood攻击', category: '安全威胁', detectionMethod: 'TCP标志分析' }
    ];

    return Array.from({ length: count }, (_, index) => {
      const alarmType = alarmTypes[Math.floor(Math.random() * alarmTypes.length)];
      return {
        id: index + 1,
        ...alarmType,
        status: ['未处理', '处理中', '已处理'][Math.floor(Math.random() * 3)],
        level: ['低', '中', '高'][Math.floor(Math.random() * 3)],
        source: ['防火墙', '路由器', 'IDS', '交换机', '服务器'][Math.floor(Math.random() * 5)],
        count: Math.floor(Math.random() * 1000) + 1,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().replace('T', ' ').substr(0, 19),
        sourceIP: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        destinationIP: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        protocol: ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS'][Math.floor(Math.random() * 5)],
        sourcePort: Math.floor(Math.random() * 65536),
        destinationPort: Math.floor(Math.random() * 65536),
        bytesTransferred: Math.floor(Math.random() * 1000000000),
        packetsTransferred: Math.floor(Math.random() * 1000000),
        threshold: `${Math.floor(Math.random() * 1000)} ${['packets/sec', 'connections/min', '% utilization'][Math.floor(Math.random() * 3)]}`,
        details: `检测到${alarmType.content}，可能存在安全风险`
      };
    });
  };

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAlarmClick = (alarm) => {
    setSelectedAlarm(alarm);
    setShowAlarmModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '未处理':
        return <Badge bg="danger">未处理</Badge>;
      case '处理中':
        return <Badge bg="warning">处理中</Badge>;
      case '已处理':
        return <Badge bg="success">已处理</Badge>;
      default:
        return <Badge bg="secondary">未知</Badge>;
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">告警列表</h2>
      <Row>
        <Col md={8}>
          <Form className="mb-4">
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="告警内容" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Select>
                    <option>告警类型</option>
                    <option>安全威胁</option>
                    <option>性能问题</option>
                    <option>网络异常</option>
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
                  <th>告警内容</th>
                  <th>告警类型</th>
                  <th>告警状态</th>
                  <th>告警级别</th>
                  <th>告警来源</th>
                  <th>告警次数</th>
                  <th>告警时间</th>
                </tr>
              </thead>
              <tbody>
                {alarmData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(alarm => (
                  <tr key={alarm.id} onClick={() => handleAlarmClick(alarm)} style={{cursor: 'pointer'}}>
                    <td>{alarm.content}</td>
                    <td>{alarm.category}</td>
                    <td>{getStatusBadge(alarm.status)}</td>
                    <td>{alarm.level}</td>
                    <td>{alarm.source}</td>
                    <td>{alarm.count}</td>
                    <td>{alarm.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination className="justify-content-end mt-3">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(Math.ceil(alarmData.length / itemsPerPage))].map((_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(alarmData.length / itemsPerPage)} />
            <Pagination.Last onClick={() => handlePageChange(Math.ceil(alarmData.length / itemsPerPage))} disabled={currentPage === Math.ceil(alarmData.length / itemsPerPage)} />
          </Pagination>
        </Col>
        <Col md={4}>
          <AlarmTimeline alarms={alarmData} />
        </Col>
      </Row>
      <AlarmModal
        show={showAlarmModal}
        onHide={() => setShowAlarmModal(false)}
        alarm={selectedAlarm}
      />
    </Container>
  );
};

export default AlarmList;