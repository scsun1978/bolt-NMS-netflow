import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface DataSource {
  id: string;
  name: string;
  type: string;
  address: string;
  group: string;
  status: string;
}

interface DataSourceModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (item: DataSource) => void;
  item: DataSource | null;
}

const DataSourceModal: React.FC<DataSourceModalProps> = ({ show, onHide, onSave, item }) => {
  const [formData, setFormData] = useState<DataSource>({
    id: '',
    name: '',
    type: '',
    address: '',
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
        address: '',
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
        <Modal.Title>{item ? '编辑数据来源' : '新建数据来源'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>设备名称</Form.Label>
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
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">选择类别</option>
              <option value="交换机">交换机</option>
              <option value="路由器">路由器</option>
              <option value="防火墙">防火墙</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>设备地址</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
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

export default DataSourceModal;