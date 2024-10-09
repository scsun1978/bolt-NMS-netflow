import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import CardList from './CardList';
import AlarmModal from './AlarmModal';
import AlarmTimeline from './AlarmTimeline';

const AlarmList: React.FC = () => {
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [alarmData, setAlarmData] = useState([]);

  useEffect(() => {
    // 模拟从API获取数据
    setAlarmData(generateAlarmData(50));
  }, []);

  const generateAlarmData = (count: number) => {
    // ... (保持原有的生成逻辑不变)
  };

  const handleAlarmClick = (alarm: any) => {
    setSelectedAlarm(alarm);
    setShowAlarmModal(true);
  };

  const headers = ['告警内容', '告警类型', '告警状态', '告警级别', '告警来源', '告警次数', '告警时间'];

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">告警列表</h2>
      <Row>
        <Col md={8}>
          <Form className="mb-4">
            <Row>
              <Col md={3}>
                <Form.Control type="text" placeholder="告警内容" />
              </Col>
              <Col md={3}>
                <Form.Select>
                  <option>告警类型</option>
                  <option>安全威胁</option>
                  <option>性能问题</option>
                  <option>网络异常</option>
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
            title="告警列表"
            headers={headers}
            data={alarmData}
            onEdit={handleAlarmClick}
          />
        </Col>
        <Col md={4}>
          <AlarmTimeline alarms={alarmData} />
        </Col>
      </Row>
      <AlarmModal
        show={showAlarmModal}
        onHide={() => setShowAlarmModal(false)}
        alarm={selectedAlarm}
      />
    </Container>
  );
};

export default AlarmList;