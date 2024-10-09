import React, { useState, useEffect } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';

const AlarmTimeline: React.FC<{ alarms: any[] }> = ({ alarms }) => {
  const [timelineEvents, setTimelineEvents] = useState([]);

  useEffect(() => {
    if (alarms && alarms.length > 0) {
      setTimelineEvents(generateInitialEvents());

      const interval = setInterval(() => {
        setTimelineEvents(prevEvents => [generateNewEvent(), ...prevEvents.slice(0, 19)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [alarms]);

  const generateInitialEvents = () => {
    return Array.from({ length: 20 }, (_, index) => generateNewEvent(Date.now() - index * 1000));
  };

  const generateNewEvent = (timestamp = Date.now()) => {
    if (!alarms || alarms.length === 0) {
      return null;
    }
    const alarm = alarms[Math.floor(Math.random() * alarms.length)];
    return {
      id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(timestamp).toISOString(),
      content: alarm.content,
      category: alarm.category,
      sourceIP: alarm.sourceIP,
      destinationIP: alarm.destinationIP,
      protocol: alarm.protocol
    };
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      '安全威胁': 'danger',
      '性能问题': 'warning',
      '网络异常': 'info',
      '配置错误': 'secondary'
    };
    return <Badge bg={categoryColors[category] || 'primary'}>{category}</Badge>;
  };

  if (!alarms || alarms.length === 0) {
    return <div>暂无告警数据</div>;
  }

  return (
    <div className="alarm-timeline">
      <h4 className="mb-3">实时告警事件</h4>
      <ListGroup className="overflow-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
        {timelineEvents.map((event) => (
          event && (
            <ListGroup.Item key={event.id} className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{event.content}</div>
                <small>{new Date(event.timestamp).toLocaleString()}</small>
                <div>
                  {event.sourceIP} <ArrowRight /> {event.destinationIP}
                </div>
                <div>协议: {event.protocol}</div>
              </div>
              {getCategoryBadge(event.category)}
            </ListGroup.Item>
          )
        ))}
      </ListGroup>
    </div>
  );
};

export default AlarmTimeline;