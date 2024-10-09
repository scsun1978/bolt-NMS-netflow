import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FocusItemSettings from './FocusItemSettings';
import NetworkInterfaceSettings from './NetworkInterfaceSettings';
import DataSourceSettings from './DataSourceSettings';
import ApplicationSettings from './ApplicationSettings';
import ThresholdSettings from './ThresholdSettings';
import './ConfigurationPage.css'; // 导入新的 CSS 文件

const ConfigurationPage: React.FC = () => {
  return (
    <Container fluid className="py-4 configuration-page">
      <h2 className="mb-4">配置</h2>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="config-card">
            <Card.Body>
              <Card.Title>重点关注</Card.Title>
              <FocusItemSettings />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="config-card">
            <Card.Body>
              <Card.Title>用户网段</Card.Title>
              <NetworkInterfaceSettings />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="config-card">
            <Card.Body>
              <Card.Title>数据来源</Card.Title>
              <DataSourceSettings />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="config-card">
            <Card.Body>
              <Card.Title>应用类型</Card.Title>
              <ApplicationSettings />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="config-card">
            <Card.Body>
              <Card.Title>阈值设置</Card.Title>
              <ThresholdSettings />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfigurationPage;