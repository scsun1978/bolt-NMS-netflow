import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import CardList from './CardList';
import AlertModal from './AlertModal';

const ImportantDeviceList: React.FC = () => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    setDeviceData(generateMockDeviceData(50));
  }, []);

  const generateMockDeviceData = (count: number) => {
    // ... (保持原有的生成逻辑不变)
  };

  const handleAlertClick = (device: any) => {
    setSelectedAlert(device);
    setShowAlertModal(true);
  };

  const headers = ['设备名称', '设备类型', 'IP地址', '应用', '总流量 (MB)', '数据包数', '活跃连接数', 'CPU使用率', '内存使用率', '最后更新时间', '状态'];

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">重点设备关注</h2>
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Control type="text" placeholder="设备名称" />
          </Col>
          <Col md={3}>
            <Form.Select>
              <option>设备类型</option>
              {['Router', 'Switch', 'Firewall', 'Server', 'Load Balancer'].map(type => (
                <option key={type}>{type}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control type="date" />
          </Col>
          <Col md={3}>
            <Button variant="primary" type="submit" className="w-100">
              <Search className="me-2" />
              查询
            </Button>
          </Col>
        </Row>
      </Form>
      <CardList
        title="重点设备列表"
        headers={headers}
        data={deviceData}
        onEdit={handleAlertClick}
      />
      <AlertModal
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
        alert={selectedAlert}
      />
    </Container>
  );
};

export default ImportantDeviceList;