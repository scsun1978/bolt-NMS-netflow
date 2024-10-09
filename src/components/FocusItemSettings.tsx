import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import FocusItemModal from './FocusItemModal';

interface FocusItem {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  group: string;
  status: string;
}

const FocusItemSettings: React.FC = () => {
  const [focusItems, setFocusItems] = useState<FocusItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FocusItem | null>(null);

  useEffect(() => {
    // 模拟从API获取数据
    const mockFocusItems: FocusItem[] = [
      { id: '1', name: '服务器1', type: '服务器', ipAddress: '192.168.1.100', group: '核心服务', status: '启用' },
      { id: '2', name: '路由器1', type: '网络设备', ipAddress: '192.168.1.1', group: '网络设备', status: '启用' },
      { id: '3', name: '防火墙1', type: '安全设备', ipAddress: '192.168.1.2', group: '安全设备', status: '启用' },
    ];
    setFocusItems(mockFocusItems);
  }, []);

  const handleSave = (item: FocusItem) => {
    if (item.id) {
      setFocusItems(prevItems => prevItems.map(i => i.id === item.id ? item : i));
    } else {
      setFocusItems(prevItems => [...prevItems, { ...item, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setFocusItems(prevItems => prevItems.filter(i => i.id !== id));
  };

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        重点关注
        <Button variant="primary" size="sm" onClick={() => {
          setSelectedItem(null);
          setShowModal(true);
        }}>
          新建
        </Button>
      </h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>名称</th>
            <th>类型</th>
            <th>IP地址</th>
            <th>组别</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {focusItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.ipAddress}</td>
              <td>{item.group}</td>
              <td>{item.status}</td>
              <td>
                <Button variant="link" size="sm" onClick={() => {
                  setSelectedItem(item);
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
      <FocusItemModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        item={selectedItem}
      />
    </div>
  );
};

export default FocusItemSettings;