import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const TrafficTable = () => {
  const trafficData = [
    { id: 1, source: '255.10.19.23', destination: '255.10.19.23', appType: '类别1', ipVersion: 'IPv4', protocol: 'TCP', sourcePort: 22, destPort: 23, sentPackets: 345, receivedPackets: 345, sentBytes: 345, receivedBytes: 345, sessionId: '345345345345' },
    { id: 2, source: '255.10.19.23', destination: '255.10.19.23', appType: '类别1', ipVersion: 'IPv4', protocol: 'TCP', sourcePort: 22, destPort: 23, sentPackets: 345, receivedPackets: 345, sentBytes: 345, receivedBytes: 345, sessionId: '345345345345' },
    { id: 3, source: '255.10.19.23', destination: '255.10.19.23', appType: '类别1', ipVersion: 'IPv4', protocol: 'TCP', sourcePort: 22, destPort: 23, sentPackets: 345, receivedPackets: 345, sentBytes: 345, receivedBytes: 345, sessionId: '345345345345' },
  ];

  return (
    <>
      <Form className="mb-3">
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="源IP地址" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select>
            <option>协议类型</option>
            <option>TCP</option>
            <option>UDP</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="date" />
        </Form.Group>
        <Button variant="primary" type="submit">
          查询
        </Button>
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
            {trafficData.map(traffic => (
              <tr key={traffic.id}>
                <td>{traffic.source}</td>
                <td>{traffic.destination}</td>
                <td>{traffic.appType}</td>
                <td>{traffic.ipVersion}</td>
                <td>{traffic.protocol}</td>
                <td>{traffic.sourcePort}</td>
                <td>{traffic.destPort}</td>
                <td>{traffic.sentPackets}</td>
                <td>{traffic.receivedPackets}</td>
                <td>{traffic.sentBytes}</td>
                <td>{traffic.receivedBytes}</td>
                <td>{traffic.sessionId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TrafficTable;