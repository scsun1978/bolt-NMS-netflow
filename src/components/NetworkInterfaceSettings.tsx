import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import NetworkInterfaceModal from './NetworkInterfaceModal';

interface NetworkInterface {
  id: string;
  name: string;
  type: string;
  networkAddress: string;
  subnetMask: string;
  group: string;
  status: string;
}

const NetworkInterfaceSettings: React.FC = () => {
  const [interfaces, setInterfaces] = useState<NetworkInterface[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState<NetworkInterface | null>(null);

  useEffect(() => {
    // 模拟从API获取数据
    const mockInterfaces: NetworkInterface[] = [
      { id: '1', name: '内网1', type: '有线', networkAddress: '192.168.1.0', subnetMask: '255.255.255.0', group: '内网', status: '启用' },
      { id: '2', name: '外网1', type: '无线', networkAddress: '10.0.0.0', subnetMask: '255.0.0.0', group: '外网', status: '启用' },
      { id: '3', name: 'DMZ', type: '有线', networkAddress: '172.16.0.0', subnetMask: '255.255.0.0', group: 'DMZ', status: '启用' },
    ];
    setInterfaces(mockInterfaces);
  }, []);

  const handleSave = (item: NetworkInterface) => {
    if (item.id) {
      setInterfaces(prevItems => prevItems.map(i => i.id === item.id ? item : i));
    } else {
      setInterfaces(prevItems => [...prevItems, { ...item, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setInterfaces(prevItems => prevItems.filter(i => i.id !== id));
  };

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        用户网段
        <Button variant="primary" size="sm" onClick={() => {
          setSelectedInterface(null);
          setShowModal(true);
        }}>
          新建
        </Button>
      </h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>网络名称</th>
            <th>类别</th>
            <th>网段地址</th>
            <th>网络掩码</th>
            <th>组别</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {interfaces.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.networkAddress}</td>
              <td>{item.subnetMask}</td>
              <td>{item.group}</td>
              <td>{item.status}</td>
              <td>
                <Button variant="link" size="sm" onClick={() => {
                  setSelectedInterface(item);
                  setShowModal(true);
                }}>
                  编辑
                </Button>
                <Button variant="link" size="sm" onClick={() => handleDelete(item.id)}>
                  删除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <NetworkInterfaceModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        item={selectedInterface}
      />
    </div>
  );
};

export default NetworkInterfaceSettings;