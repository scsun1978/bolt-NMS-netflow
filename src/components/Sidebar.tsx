import React, { useState } from 'react';
import { Nav, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Grid, List, ExclamationTriangle, Eye, Bell, BarChart, Gear } from 'react-bootstrap-icons';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus(prevState => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  };

  return (
    <Nav className={`flex-column h-100 py-3 ${isCollapsed ? 'collapsed' : ''}`} style={{ backgroundColor: '#0052CC', color: 'white' }}>
      <Button 
        onClick={toggleSidebar} 
        className="mb-3 d-flex align-items-center justify-content-center"
        variant="outline-light"
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="d-flex align-items-center text-white">
          <Grid className="me-2" />
          {!isCollapsed && "仪表盘"}
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link 
          onClick={() => toggleMenu('insights')} 
          className="d-flex align-items-center justify-content-between text-white"
        >
          <span className="d-flex align-items-center">
            <Eye className="me-2" />
            {!isCollapsed && "洞察"}
          </span>
          {!isCollapsed && (openMenus.insights ? <ChevronLeft /> : <ChevronRight />)}
        </Nav.Link>
        <Collapse in={openMenus.insights && !isCollapsed}>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/sessions" className="text-white">会话列表</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/important-devices" className="text-white">重点设备关注</Nav.Link>
            </Nav.Item>
          </Nav>
        </Collapse>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link 
          onClick={() => toggleMenu('alarms')} 
          className="d-flex align-items-center justify-content-between text-white"
        >
          <span className="d-flex align-items-center">
            <Bell className="me-2" />
            {!isCollapsed && "告警"}
          </span>
          {!isCollapsed && (openMenus.alarms ? <ChevronLeft /> : <ChevronRight />)}
        </Nav.Link>
        <Collapse in={openMenus.alarms && !isCollapsed}>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/alarm-list" className="text-white">告警列表</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/alarm-analysis" className="text-white">告警分析</Nav.Link>
            </Nav.Item>
          </Nav>
        </Collapse>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link 
          onClick={() => toggleMenu('trafficAnalysis')} 
          className="d-flex align-items-center justify-content-between text-white"
        >
          <span className="d-flex align-items-center">
            <BarChart className="me-2" />
            {!isCollapsed && "流量详细分析"}
          </span>
          {!isCollapsed && (openMenus.trafficAnalysis ? <ChevronLeft /> : <ChevronRight />)}
        </Nav.Link>
        <Collapse in={openMenus.trafficAnalysis && !isCollapsed}>
          <Nav className="flex-column ms-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/traffic-analysis" className="text-white">流量汇总</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/network-app-analysis" className="text-white">网络应用详细分析</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/subnet-traffic-analysis" className="text-white">网段流量详细分析</Nav.Link>
            </Nav.Item>
          </Nav>
        </Collapse>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/configuration" className="d-flex align-items-center text-white">
          <Gear className="me-2" />
          {!isCollapsed && "配置"}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;