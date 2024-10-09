import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SessionList from './components/SessionList';
import ImportantDeviceList from './components/ImportantDeviceList';
import AlarmList from './components/AlarmList';
import AlarmAnalysis from './components/AlarmAnalysis';
import TrafficAnalysis from './components/TrafficAnalysis';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <ErrorBoundary>
        <Container fluid>
          <Row>
            <Col xs={sidebarCollapsed ? 1 : 2} className="p-0">
              <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            </Col>
            <Col xs={sidebarCollapsed ? 11 : 10}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sessions" element={<SessionList />} />
                <Route path="/important-devices" element={<ImportantDeviceList />} />
                <Route path="/alarm-list" element={<AlarmList />} />
                <Route path="/alarm-analysis" element={<AlarmAnalysis />} />
                <Route path="/traffic-analysis" element={<TrafficAnalysis />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>
    </Router>
  );
}

export default App;