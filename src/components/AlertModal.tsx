import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form, Table, Badge } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AlertModalProps {
  show: boolean;
  onHide: () => void;
  alert: any; // Replace 'any' with a more specific type if possible
}

const AlertModal: React.FC<AlertModalProps> = ({ show, onHide, alert }) => {
  const [processingStatus, setProcessingStatus] = useState(alert ? alert.status : '未处理');
  const [comments, setComments] = useState('');

  if (!alert) return null;

  const chartData = {
    labels: ['1小时前', '50分钟前', '40分钟前', '30分钟前', '20分钟前', '10分钟前', '现在'],
    datasets: [
      {
        label: '流量趋势 (MB)',
        data: [65, 59, 80, 81, 56, 55, 100],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'CPU使用率 (%)',
        data: [30, 35, 40, 50, 45, 55, 60],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: '内存使用率 (%)',
        data: [50, 55, 60, 65, 70, 75, 80],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
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
        text: '设备性能趋势分析'
      }
    }
  };

  const handleProcessAlert = () => {
    setProcessingStatus('处理中');
    // 这里可以添加实际的处理逻辑，比如发送到后端API
    setTimeout(() => {
      setProcessingStatus('已处理');
    }, 2000);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>设备详情</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h5>基本信息</h5>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td><strong>设备名称</strong></td>
                  <td>{alert.deviceName}</td>
                </tr>
                <tr>
                  <td><strong>设备类型</strong></td>
                  <td>{alert.deviceType}</td>
                </tr>
                <tr>
                  <td><strong>IP 地址</strong></td>
                  <td>{alert.ip}</td>
                </tr>
                <tr>
                  <td><strong>应用</strong></td>
                  <td>{alert.applications.join(', ')}</td>
                </tr>
                <tr>
                  <td><strong>总流量</strong></td>
                  <td>{(alert.totalTraffic / 1000000).toFixed(2)} MB</td>
                </tr>
                <tr>
                  <td><strong>数据包数</strong></td>
                  <td>{alert.packetCount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>活跃连接数</strong></td>
                  <td>{alert.activeConnections.toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>CPU 使用率</strong></td>
                  <td>{alert.cpuUsage}%</td>
                </tr>
                <tr>
                  <td><strong>内存使用率</strong></td>
                  <td>{alert.memoryUsage}%</td>
                </tr>
                <tr>
                  <td><strong>最后更新时间</strong></td>
                  <td>{new Date(alert.lastUpdated).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>状态</strong></td>
                  <td>
                    <Badge bg={alert.status === 'normal' ? 'success' : (alert.status === 'warning' ? 'warning' : 'danger')}>
                      {alert.status === 'normal' ? '正常' : (alert.status === 'warning' ? '警告' : '危险')}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <h5>性能趋势</h5>
            <Line data={chartData} options={options} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <h5>异常分析</h5>
            <p>根据当前设备性能分析，该设备在过去1小时内出现以下异常情况：</p>
            <ul>
              <li>流量突增：可能存在大规模数据传输或遭受DDoS攻击</li>
              <li>CPU使用率持续上升：可能存在资源密集型任务或恶意进程</li>
              <li>内存使用率接近峰值：可能存在内存泄漏或应用程序异常</li>
            </ul>
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
          onClick={handleProcessAlert}
          disabled={processingStatus === '已处理'}
        >
          {processingStatus === '未处理' ? '处理告警' : processingStatus}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;