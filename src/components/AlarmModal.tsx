import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form, Table, Badge } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AlarmModal = ({ show, onHide, alarm }) => {
  const [processingStatus, setProcessingStatus] = useState(alarm ? alarm.status : '未处理');
  const [comments, setComments] = useState('');

  if (!alarm) return null;

  const chartData = {
    labels: ['1小时前', '50分钟前', '40分钟前', '30分钟前', '20分钟前', '10分钟前', '现在'],
    datasets: [
      {
        label: '告警趋势',
        data: [3, 2, 5, 4, 6, 8, 10],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '告警趋势分析'
      }
    }
  };

  const handleProcessAlarm = () => {
    setProcessingStatus('处理中');
    // 这里可以添加实际的处理逻辑，比如发送到后端API
    setTimeout(() => {
      setProcessingStatus('已处理');
    }, 2000);
  };

  // Mock data for related alarms
  const relatedAlarms = [
    { id: 1, content: '相关告警1', category: '类别1', status: '未处理', level: '高', source: '设备A', timestamp: '2024/09/23 12:40:00' },
    { id: 2, content: '相关告警2', category: '类别2', status: '处理中', level: '中', source: '设备B', timestamp: '2024/09/23 12:42:30' },
    { id: 3, content: '相关告警3', category: '类别1', status: '已处理', level: '低', source: '设备C', timestamp: '2024/09/23 12:44:45' },
  ];

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>告警详情</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h5>基本信息</h5>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td><strong>告警内容</strong></td>
                  <td>{alarm.content}</td>
                </tr>
                <tr>
                  <td><strong>告警分类</strong></td>
                  <td>{alarm.category}</td>
                </tr>
                <tr>
                  <td><strong>告警状态</strong></td>
                  <td>{processingStatus}</td>
                </tr>
                <tr>
                  <td><strong>告警级别</strong></td>
                  <td>{alarm.level}</td>
                </tr>
                <tr>
                  <td><strong>告警来源</strong></td>
                  <td>{alarm.source}</td>
                </tr>
                <tr>
                  <td><strong>告警次数</strong></td>
                  <td>{alarm.count}</td>
                </tr>
                <tr>
                  <td><strong>告警触发时间</strong></td>
                  <td>{alarm.timestamp}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <h5>告警趋势</h5>
            <Line data={chartData} options={options} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <h5>NetFlow 信息</h5>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td><strong>源 IP</strong></td>
                  <td>{alarm.sourceIP}</td>
                </tr>
                <tr>
                  <td><strong>目标 IP</strong></td>
                  <td>{alarm.destinationIP}</td>
                </tr>
                <tr>
                  <td><strong>协议</strong></td>
                  <td>{alarm.protocol}</td>
                </tr>
                {alarm.sourcePort && (
                  <tr>
                    <td><strong>源端口</strong></td>
                    <td>{alarm.sourcePort}</td>
                  </tr>
                )}
                {alarm.destinationPort && (
                  <tr>
                    <td><strong>目标端口</strong></td>
                    <td>{alarm.destinationPort}</td>
                  </tr>
                )}
                <tr>
                  <td><strong>传输字节数</strong></td>
                  <td>{alarm.bytesTransferred.toLocaleString()} bytes</td>
                </tr>
                <tr>
                  <td><strong>传输数据包数</strong></td>
                  <td>{alarm.packetsTransferred.toLocaleString()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <h5>告警详情</h5>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td><strong>检测方法</strong></td>
                  <td>{alarm.detectionMethod}</td>
                </tr>
                <tr>
                  <td><strong>告警阈值</strong></td>
                  <td>{alarm.threshold}</td>
                </tr>
                <tr>
                  <td><strong>详细原因</strong></td>
                  <td>{alarm.details}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <h5>相关告警</h5>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>告警内容</th>
                  <th>告警分类</th>
                  <th>告警状态</th>
                  <th>告警级别</th>
                  <th>告警来源</th>
                  <th>告警时间</th>
                </tr>
              </thead>
              <tbody>
                {relatedAlarms.map((relatedAlarm) => (
                  <tr key={relatedAlarm.id}>
                    <td>{relatedAlarm.content}</td>
                    <td>{relatedAlarm.category}</td>
                    <td>
                      <Badge bg={
                        relatedAlarm.status === '未处理' ? 'danger' :
                        relatedAlarm.status === '处理中' ? 'warning' : 'success'
                      }>
                        {relatedAlarm.status}
                      </Badge>
                    </td>
                    <td>{relatedAlarm.level}</td>
                    <td>{relatedAlarm.source}</td>
                    <td>{relatedAlarm.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Form.Group>
              <Form.Label>处理意见</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="请输入处理意见..."
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          关闭
        </Button>
        <Button 
          variant="primary" 
          onClick={handleProcessAlarm}
          disabled={processingStatus === '已处理'}
        >
          {processingStatus === '未处理' ? '处理告警' : processingStatus}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlarmModal;