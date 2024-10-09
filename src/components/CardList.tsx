import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import './CardList.css';

interface CardListProps {
  title: string;
  headers: string[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const CardList: React.FC<CardListProps> = ({ title, headers, data, onEdit, onDelete }) => {
  return (
    <Card className="card-list">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Table responsive hover>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              {(onEdit || onDelete) && <th>操作</th>}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value: any, valueIndex) => (
                    <td key={valueIndex}>{value}</td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td>
                      {onEdit && (
                        <Button variant="link" onClick={() => onEdit(item)}>
                          编辑
                        </Button>
                      )}
                      {onDelete && (
                        <Button variant="link" className="text-danger" onClick={() => onDelete(item)}>
                          删除
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + (onEdit || onDelete ? 1 : 0)}>暂无数据</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CardList;