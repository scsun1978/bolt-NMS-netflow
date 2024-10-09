import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TrafficTrend from './TrafficTrend';
import UserTrafficDistribution from './UserTrafficDistribution';
import ApplicationTrafficDistribution from './ApplicationTrafficDistribution';
import TrafficCalendar from './TrafficCalendar';
import ImportantNotices from './ImportantNotices';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <TrafficTrend />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <UserTrafficDistribution />
        </Col>
        <Col md={6}>
          <ApplicationTrafficDistribution />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <TrafficCalendar />
        </Col>
      </Row>
      <Row>
        <Col>
          <ImportantNotices />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;