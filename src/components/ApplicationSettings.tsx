import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import ApplicationModal from './ApplicationModal';

interface Application {
  id: string;
  name: string;
  source: string;
  destination: string;
  protocol: string;
  sourcePort: string;
  destinationPort: string;
}

const ApplicationSettings: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    // 模拟从API获取数据
    const mockApplications: Application[] = [
      { id: '1', name: 'HTTP', source: 'Any', destination: 'Any', protocol: 'TCP', sourcePort: 'Any', destinationPort: '80' },
      { id: '2', name: 'HTTPS', source: 'Any', destination: 'Any', protocol: 'TCP', sourcePort: 'Any', destinationPort: '443' },
      { id: '3', name: 'DNS', source: 'Any', destination: 'Any', protocol: 'UDP', sourcePort: 'Any', destinationPort: '53' },
    ];
    setApplications(mockApplications);
  }, []);

  const handleSave = (item: Application) => {
    if (item.id) {
      setApplications(prevItems => prevItems.map(i => i.id === item.id ? item : i));
    } else {
      setApplications(prevItems => [...prevItems, { ...item, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setApplications(prevItems => prevItems.filter(i => i.id !== id));
  };

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        应用类型
        <Button variant="primary" size="sm" onClick={() => {
          setSelectedApplication(null);
          setShowModal(true);
        }}>
          新建
        </Button>
      </h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>应用名称</th>
            <th>源</th>
            <th>目的</th>
            <th>协议</th>
            <th>源端口</th>
            <th>目的端口</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.source}</td>
              <td>{item.destination}</td>
              <td>{item.protocol}</td>
              <td>{item.sourcePort}</td>
              <td>{item.destinationPort}</td>
              <td>
                <Button variant="link" size="sm" onClick={() => {
                  setSelectedApplication(item);
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
      <ApplicationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        item={selectedApplication}
      />
    </div>
  );
};

export default ApplicationSettings;