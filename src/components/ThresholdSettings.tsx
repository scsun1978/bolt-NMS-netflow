import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import ThresholdModal from './ThresholdModal';

interface Threshold {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  sourcePort: string;
  destinationPort: string;
  thresholdValue: string;
  thresholdType: string;
}

const ThresholdSettings: React.FC = () => {
  const [thresholds, setThresholds] = useState<Threshold[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedThreshold, setSelectedThreshold] = useState<Threshold | null>(null);

  useEffect(() => {
    // 模拟从API获取阈值数据
    const mockThresholds: Threshold[] = [
      {
        id: '1',
        source: 'Any',
        destination: 'Any',
        protocol: 'TCP',
        sourcePort: 'Any',
        destinationPort: '80',
        thresholdValue: '1000',
        thresholdType: '连接数/分钟'
      },
      {
        id: '2',
        source: '192.168.1.0/24',
        destination: 'Any',
        protocol: 'UDP',
        sourcePort: 'Any',
        destinationPort: 'Any',
        thresholdValue: '50',
        thresholdType: 'Mbps'
      },
      {
        id: '3',
        source: 'Any',
        destination: '10.0.0.0/8',
        protocol: 'ICMP',
        sourcePort: 'N/A',
        destinationPort: 'N/A',
        thresholdValue: '100',
        thresholdType: '包/秒'
      }
    ];
    setThresholds(mockThresholds);
  }, []);

  const handleSave = (threshold: Threshold) => {
    if (threshold.id) {
      setThresholds(prevThresholds => 
        prevThresholds.map(t => t.id === threshold.id ? threshold : t)
      );
    } else {
      setThresholds(prevThresholds => 
        [...prevThresholds, { ...threshold, id: Date.now().toString() }]
      );
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setThresholds(prevThresholds => prevThresholds.filter(t => t.id !== id));
  };

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        阈值设置
        <Button variant="primary" size="sm" onClick={() => {
          setSelectedThreshold(null);
          setShowModal(true);
        }}>
          新建
        </Button>
      </h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>源</th>
            <th>目的</th>
            <th>协议</th>
            <th>源端口</th>
            <th>目的端口</th>
            <th>阈值预警</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {thresholds.map(threshold => (
            <tr key={threshold.id}>
              <td>{threshold.source}</td>
              <td>{threshold.destination}</td>
              <td>{threshold.protocol}</td>
              <td>{threshold.sourcePort}</td>
              <td>{threshold.destinationPort}</td>
              <td>{`${threshold.thresholdValue} ${threshold.thresholdType}`}</td>
              <td>
                <Button variant="link" size="sm" onClick={() => {
                  setSelectedThreshold(threshold);
                  setShowModal(true);
                }}>
                  编辑
                </Button>
                <Button variant="link" size="sm" onClick={() => handleDelete(threshold.id)}>
                  删除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ThresholdModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        threshold={selectedThreshold}
      />
    </div>
  );
};

export default ThresholdSettings;