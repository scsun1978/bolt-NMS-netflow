import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import DataSourceModal from './DataSourceModal';

interface DataSource {
  id: string;
  name: string;
  type: string;
  address: string;
  group: string;
  status: string;
}

const DataSourceSettings: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);

  useEffect(() => {
    // 模拟从API获取数据
    const mockDataSources: DataSource[] = [
      { id: '1', name: '交换机1', type: '交换机', address: '192.168.1.10', group: '核心网络', status: '启用' },
      { id: '2', name: '路由器1', type: '路由器', address: '192.168.1.1', group: '边界设备', status: '启用' },
      { id: '3', name: '防火墙1', type: '防火墙', address: '192.168.1.2', group: '安全设备', status: '启用' },
    ];
    setDataSources(mockDataSources);
  }, []);

  const handleSave = (item: DataSource) => {
    if (item.id) {
      setDataSources(prevItems => prevItems.map(i => i.id === item.id ? item : i));
    } else {
      setDataSources(prevItems => [...prevItems, { ...item, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setDataSources(prevItems => prevItems.filter(i => i.id !== id));
  };

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        数据来源
        <Button variant="primary" size="sm" onClick={() => {
          setSelectedDataSource(null);
          setShowModal(true);
        }}>
          新建
        </Button>
      </h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>设备名称</th>
            <th>类别</th>
            <th>设备地址</th>
            <th>组别</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dataSources.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.address}</td>
              <td>{item.group}</td>
              <td>{item.status}</td>
              <td>
                <Button variant="link" size="sm" onClick={() => {
                  setSelectedDataSource(item);
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
      <DataSourceModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        item={selectedDataSource}
      />
    </div>
  );
};

export default DataSourceSettings;