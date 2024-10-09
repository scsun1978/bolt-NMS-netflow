import React from 'react';
import { Alert } from 'react-bootstrap';

interface PlaceholderComponentProps {
  componentName: string;
}

const PlaceholderComponent: React.FC<PlaceholderComponentProps> = ({ componentName }) => {
  return (
    <Alert variant="info">
      {componentName} 组件正在开发中
    </Alert>
  );
};

export default PlaceholderComponent;