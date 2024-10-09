import React, { useState } from 'react';
import { Table, Badge, Form } from 'react-bootstrap';

const TrafficCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  
  const getCalendarData = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks = Math.ceil((firstDay + daysInMonth) / 7);
    
    return Array.from({ length: weeks }, (_, weekIndex) =>
      Array.from({ length: 7 }, (_, dayIndex) => {
        const day = weekIndex * 7 + dayIndex - firstDay + 1;
        return day > 0 && day <= daysInMonth ? day : null;
      })
    );
  };

  const getTrafficLevel = (day) => {
    const random = Math.random();
    if (random < 0.7) return 'normal';
    if (random < 0.9) return 'warning';
    return 'danger';
  };

  const getColor = (level) => {
    switch (level) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      default: return 'light';
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const [year, month] = selectedMonth.split('-').map(Number);
  const calendarData = getCalendarData(year, month - 1);

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Control
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </Form.Group>
      <Table bordered className="text-center">
        <thead>
          <tr>
            {days.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (day === null) return <td key={dayIndex}></td>;
                const level = getTrafficLevel(day);
                return (
                  <td key={dayIndex}>
                    <Badge bg={getColor(level)} className="w-100">
                      {day}
                    </Badge>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-2">
        <Badge bg="success" className="me-2">正常</Badge>
        <Badge bg="warning" className="me-2">警告</Badge>
        <Badge bg="danger">危险</Badge>
      </div>
    </>
  );
};

export default TrafficCalendar;