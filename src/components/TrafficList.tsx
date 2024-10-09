import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Badge } from 'react-bootstrap';

const TrafficList = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // 模拟从API获取数据
    const mockData = [
      {
        id: 1,
        sourceIP: '192.168.1.100',
        destIP: '10.0.0.1',
        protocol: 'TCP',
        sourcePort: 54321,
        destPort: 80,
        inputInterface: 'eth0',
        outputInterface: 'eth1',
        packetCount: 1000,
        byteCount: 1500000,
        startTime: '2024-09-23 12:00:00',
        endTime: '2024-09-23 12:05:00',
        flowDuration: 300,
        flowRate: 5000,
        tos: 0,
        tcpFlags: 'ACK',
        isAnomalous: false
      },
      // ... 更多模拟数据
    ];
    setTrafficData(mockData);
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatRate = (bytesPerSecond) => {
    return `${(bytesPerSecond / 1024).toFixed(2)} KB/s`;
  };

  return (
    <div>
      <h2>流量列表</h2>
      <Form className="mb-3">
        <Form.Group>
          <Form.Control type="text" placeholder="搜索..." />
        </Form.Group>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>源IP</th>
            <th>目的IP</th>
            <th>协议</th>
            <th>源端口</th>
            <th>目的端口</th>
            <th>输入接口</th>
            <th>输出接口</th>
            <th>数据包数</th>
            <th>字节数</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>持续时间</th>
            <th>流量速率</th>
            <th>ToS</th>
            <th>TCP Flags</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {trafficData.map((flow) => (
            <tr key={flow.id}>
              <td>{flow.sourceIP}</td>
              <td>{flow.destIP}</td>
              <td>{flow.protocol}</td>
              <td>{flow.sourcePort}</td>
              <td>{flow.destPort}</td>
              <td>{flow.inputInterface}</td>
              <td>{flow.outputInterface}</td>
              <td>{flow.packetCount}</td>
              <td>{flow.byteCount}</td>
              <td>{flow.startTime}</td>
              <td>{flow.endTime}</td>
              <td>{formatDuration(flow.flowDuration)}</td>
              <td>{formatRate(flow.flowRate)}</td>
              <td>{flow.tos}</td>
              <td>{flow.tcpFlags}</td>
              <td>
                {flow.isAnomalous ? (
                  <Badge bg="danger">异常</Badge>
                ) : (
                  <Badge bg="success">正常</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TrafficList;