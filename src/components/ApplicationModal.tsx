import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Application {
  id: string;
  name: string;
  source: string;
  destination: string;
  protocol: string;
  sourcePort: string;
  destinationPort: string;
}

interface ApplicationModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (item: Application) => void;
  item: Application | null;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ show, onHide, onSave, item }) => {
  const [formData, setFormData] = useState<Application>({
    id: '',
    name: '',
    source: '',
    destination: '',
    protocol: '',
    sourcePort: '',
    destinationPort: ''
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        id: '',
        name: '',
        source: '',
        destination: '',
        protocol: '',
        sourcePort: '',
        destinationPort: ''
      });
    }
  }, [item]);

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
        <Modal.Title>{item ? '编辑应用类型' : '新建应用类型'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>应用名称</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
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

export default ApplicationModal;