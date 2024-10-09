import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface NetworkInterface {
  id: string;
  name: string;
  type: string;
  networkAddress: string;
  subnetMask: string;
  group: string;
  status: string;
}

interface NetworkInterfaceModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (item: NetworkInterface) => void;
  item: NetworkInterface | null;
}

const NetworkInterfaceModal: React.FC<NetworkInterfaceModalProps> = ({ show, onHide, onSave, item }) => {
  const [formData, setFormData] = useState<NetworkInterface>({
    id: '',
    name: '',
    type: '',
    networkAddress: '',
    subnetMask: '',
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
        networkAddress: '',
        subnetMask: '',
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
        <Modal.Title>{item ? '编辑用户网段' : '新建用户网段'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>网络名称</Form.Label>
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
              <option value="有线">有线</option>
              <option value="无线">无线</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>网段地址</Form.Label>
            <Form.Control
              type="text"
              name="networkAddress"
              value={formData.networkAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>网络掩码</Form.Label>
            <Form.Control
              type="text"
              name="subnetMask"
              value={formData.subnetMask}
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

export default NetworkInterfaceModal;