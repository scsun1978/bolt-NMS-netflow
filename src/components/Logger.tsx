import React, { useState, useEffect } from 'react';

const Logger: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      setLogs(prevLogs => [...prevLogs, args.join(' ')]);
      originalLog.apply(console, args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, maxWidth: '300px', maxHeight: '200px', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', padding: '10px' }}>
      <h4>Logs:</h4>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};

export default Logger;