import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Threshold {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  sourcePort: string;
  destinationPort: string;
  thresholdValue: string;
  thresholdType: string;
}

interface ThresholdModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (threshold: Threshold) => void;
  threshold: Threshold | null;
}

const ThresholdModal: React.FC<ThresholdModalProps> = ({ show, onHide, onSave, threshold }) => {
  const [formData, setFormData] = useState<Threshold>({
    id: '',
    source: '',
    destination: '',
    protocol: '',
    sourcePort: '',
    destinationPort: '',
    thresholdValue: '',
    thresholdType: ''
  });

  useEffect(() => {
    if (threshold) {
      setFormData(threshold);
    } else {
      setFormData({
        id: '',
        source: '',
        destination: '',
        protocol: '',
        sourcePort: '',
        destinationPort: '',
        thresholdValue: '',
        thresholdType: ''
      });
    }
  }, [threshold]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{threshold ? '编辑阈值' : '新建阈值'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>源</Form.Label>
            <Form.Control
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>目的</Form.Label>
            <Form.Control
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>协议</Form.Label>
            <Form.Select
              name="protocol"
              value={formData.protocol}
              onChange={handleChange}
              required
            >
              <option value="">选择协议</option>
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="ICMP">ICMP</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>源端口</Form.Label>
            <Form.Control
              type="text"
              name="sourcePort"
              value={formData.sourcePort}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>目的端口</Form.Label>
            <Form.Control
              type="text"
              name="destinationPort"
              value={formData.destinationPort}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>阈值</Form.Label>
            <Form.Control
              type="text"
              name="thresholdValue"
              value={formData.thresholdValue}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>阈值类型</Form.Label>
            <Form.Select
              name="thresholdType"
              value={formData.thresholdType}
              onChange={handleChange}
              required
            >
              <option value="">选择阈值类型</option>
              <option value="连接数/分钟">连接数/分钟</option>
              <option value="Mbps">Mbps</option>
              <option value="包/秒">包/秒</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            取消
          </Button>
          <Button variant="primary" type="submit">
            保存
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ThresholdModal;