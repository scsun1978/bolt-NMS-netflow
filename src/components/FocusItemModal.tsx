import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface FocusItem {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  group: string;
  status: string;
}

interface FocusItemModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (item: FocusItem) => void;
  item: FocusItem | null;
}

const FocusItemModal: React.FC<FocusItemModalProps> = ({ show, onHide, onSave, item }) => {
  const [formData, setFormData] = useState<FocusItem>({
    id: '',
    name: '',
    type: '',
    ipAddress: '',
    group: '',
    status: '启用'
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        id: '',
        name: '',
        type: '',
        ipAddress: '',
        group: '',
        status: '启用'
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
        <Modal.Title>{item ? '编辑重点关注项' : '新建重点关注项'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>名称</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>类别</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>IP地址</Form.Label>
            <Form.Control
              type="text"
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>组别</Form.Label>
            <Form.Control
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>状态</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="启用">启用</option>
              <option value="禁用">禁用</option>
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

export default FocusItemModal;