import React, { useState } from 'react';
import { Modal, Button, Table, Tabs, Tab, Accordion } from 'react-bootstrap';
import { PersonCircle, Globe, ArrowRight } from 'react-bootstrap-icons';

interface SessionPathModalProps {
  show: boolean;
  onHide: () => void;
  sessionId: string;
}

const SessionPathModal: React.FC<SessionPathModalProps> = ({ show, onHide, sessionId }) => {
  const [activeTab, setActiveTab] = useState('current');

  // Mock data for network devices with brand information
  const networkDevices = [
    { id: 1, name: '边界路由器', type: 'Router', brand: 'Huawei', ip: '192.168.0.1' },
    { id: 2, name: '核心交换机', type: 'Switch', brand: 'Cisco', ip: '192.168.0.2' },
    { id: 3, name: '下一代防火墙', type: 'Firewall', brand: 'Palo Alto', ip: '192.168.0.3' },
    { id: 4, name: '应用服务器', type: 'Server', brand: 'Dell', ip: '192.168.0.4' },
    { id: 5, name: '负载均衡器', type: 'Load Balancer', brand: 'F5', ip: '192.168.0.5' },
  ];

  const getBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'huawei':
        return 'https://res.cloudinary.com/dldeqai4u/image/upload/v1698305141/huawei_logo_wbrv0k.png';
      case 'cisco':
        return 'https://res.cloudinary.com/dldeqai4u/image/upload/v1698305141/cisco_logo_k6rcqa.png';
      case 'palo alto':
        return 'https://res.cloudinary.com/dldeqai4u/image/upload/v1698305141/paloalto_logo_f7hxtz.png';
      case 'dell':
        return 'https://res.cloudinary.com/dldeqai4u/image/upload/v1698305141/dell_logo_azq6zc.png';
      case 'f5':
        return 'https://res.cloudinary.com/dldeqai4u/image/upload/v1698305141/f5_logo_dt7sd8.png';
      default:
        return 'https://via.placeholder.com/50';
    }
  };

  // Mock NetFlow data for each device
  const getNetflowData = (deviceId: number) => ({
    sourceIP: '192.168.1.100',
    destinationIP: '203.0.113.50',
    sourcePort: 54321,
    destinationPort: 80,
    protocol: 'TCP',
    inputInterface: `Gi0/0/${deviceId}`,
    outputInterface: `Gi0/0/${deviceId + 1}`,
    packets: 1000 + deviceId * 100,
    bytes: 1500000 + deviceId * 10000,
    startTime: '2024-09-23 12:45:00',
    endTime: '2024-09-23 12:46:00',
    tcpFlags: 'ACK',
    ipVersion: 'IPv4',
    nextHop: `192.168.0.${deviceId + 1}`,
    srcAS: 64496,
    dstAS: 64497,
    tos: 0
  });

  // Mock historical data
  const historicalData = [
    { id: 1, timestamp: '2024-09-23 12:30:00', status: '正常', latency: '5ms', packetLoss: '0%' },
    { id: 2, timestamp: '2024-09-23 12:15:00', status: '警告', latency: '150ms', packetLoss: '2%' },
    { id: 3, timestamp: '2024-09-23 12:00:00', status: '正常', latency: '8ms', packetLoss: '0%' },
    { id: 4, timestamp: '2024-09-23 11:45:00', status: '正常', latency: '6ms', packetLoss: '0%' },
    { id: 5, timestamp: '2024-09-23 11:30:00', status: '错误', latency: '500ms', packetLoss: '15%' },
  ];

  const renderNetflowTable = (netflowData) => (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th colSpan={2}>NetFlow 信息</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>源 IP</td>
          <td>{netflowData.sourceIP}</td>
        </tr>
        <tr>
          <td>目标 IP</td>
          <td>{netflowData.destinationIP}</td>
        </tr>
        <tr>
          <td>源端口</td>
          <td>{netflowData.sourcePort}</td>
        </tr>
        <tr>
          <td>目标端口</td>
          <td>{netflowData.destinationPort}</td>
        </tr>
        <tr>
          <td>协议</td>
          <td>{netflowData.protocol}</td>
        </tr>
        <tr>
          <td>输入接口</td>
          <td>{netflowData.inputInterface}</td>
        </tr>
        <tr>
          <td>输出接口</td>
          <td>{netflowData.outputInterface}</td>
        </tr>
        <tr>
          <td>数据包数</td>
          <td>{netflowData.packets}</td>
        </tr>
        <tr>
          <td>字节数</td>
          <td>{netflowData.bytes}</td>
        </tr>
        <tr>
          <td>开始时间</td>
          <td>{netflowData.startTime}</td>
        </tr>
        <tr>
          <td>结束时间</td>
          <td>{netflowData.endTime}</td>
        </tr>
        <tr>
          <td>TCP 标志</td>
          <td>{netflowData.tcpFlags}</td>
        </tr>
        <tr>
          <td>IP 版本</td>
          <td>{netflowData.ipVersion}</td>
        </tr>
        <tr>
          <td>下一跳</td>
          <td>{netflowData.nextHop}</td>
        </tr>
        <tr>
          <td>源 AS</td>
          <td>{netflowData.srcAS}</td>
        </tr>
        <tr>
          <td>目标 AS</td>
          <td>{netflowData.dstAS}</td>
        </tr>
        <tr>
          <td>服务类型 (ToS)</td>
          <td>{netflowData.tos}</td>
        </tr>
      </tbody>
    </Table>
  );

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>会话路径 - {sessionId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="session-path-diagram mb-4">
          <div className="device user">
            <PersonCircle size={40} />
            <span>用户</span>
            <small>{getNetflowData(0).sourceIP}</small>
          </div>
          {networkDevices.map((device, index) => (
            <React.Fragment key={device.id}>
              <ArrowRight size={20} className="mx-2" />
              <div className="device">
                <img src={getBrandIcon(device.brand)} alt={device.brand} className="brand-icon" />
                <span>{device.name}</span>
                <small>{device.ip}</small>
              </div>
            </React.Fragment>
          ))}
          <ArrowRight size={20} className="mx-2" />
          <div className="device internet">
            <Globe size={40} />
            <span>Internet</span>
            <small>{getNetflowData(0).destinationIP}</small>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="current" title="当前会话信息">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>用户</Accordion.Header>
                <Accordion.Body>
                  {renderNetflowTable(getNetflowData(0))}
                </Accordion.Body>
              </Accordion.Item>
              {networkDevices.map((device, index) => (
                <Accordion.Item eventKey={`${index + 1}`} key={device.id}>
                  <Accordion.Header>{device.name}</Accordion.Header>
                  <Accordion.Body>
                    {renderNetflowTable(getNetflowData(device.id))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
              <Accordion.Item eventKey={`${networkDevices.length + 1}`}>
                <Accordion.Header>Internet</Accordion.Header>
                <Accordion.Body>
                  {renderNetflowTable(getNetflowData(networkDevices.length + 1))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Tab>
          <Tab eventKey="history" title="历史信息">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>时间戳</th>
                  <th>状态</th>
                  <th>延迟</th>
                  <th>丢包率</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((record) => (
                  <tr key={record.id}>
                    <td>{record.timestamp}</td>
                    <td>{record.status}</td>
                    <td>{record.latency}</td>
                    <td>{record.packetLoss}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          关闭
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionPathModal;