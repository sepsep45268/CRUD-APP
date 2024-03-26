import { Form, Input, Button, DatePicker, Select, Modal, Space, Table } from 'antd';
import './App.css';

import { useState } from 'react';
import moment from 'moment';

const { Option } = Select;

function App() {

  const dateFormat = 'DD/MM/YYYY';
  const formatDate = (date) => moment(date).format(dateFormat);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [recordIndex, setRecordIndex] = useState(null);

  const onFinish = (values) => {
    const updatedData = [...data];
    if (recordIndex !== null) {
      updatedData[recordIndex] = values;
      setRecordIndex(null);
    } else {
      updatedData.push(values);
    }
    setData(updatedData);
    setVisible(false);
    form.resetFields();
  };

  const handleEdit = (index) => {
    setRecordIndex(index);
    form.setFieldsValue(data[index]);
    setVisible(true);
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'ชื่อจริง',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'ชื่อเล่น',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'วัน เดือน ปีเกิด',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text) => formatDate(text),
    },
    {
      title: 'อายุ',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'เพศ',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(index)}>แก้ไข</Button>
          <Button onClick={() => handleDelete(index)}>ลบ</Button>
        </Space>
      ),
    },
  ];
  

  return (
    <div className="header">
      <header className="header">
        <Button onClick={() => setVisible(true)}>เพิ่มข้อมูล</Button>
        <br/> 
        <Modal
          title={recordIndex !== null ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="firstName" label="ชื่อจริง">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="นามสกุล">
              <Input />
            </Form.Item>
            <Form.Item name="nickname" label="ชื่อเล่น">
              <Input />
            </Form.Item>
            <Form.Item name="birthday" label="วัน เดือน ปีเกิด">
              <DatePicker />
            </Form.Item>
            <Form.Item name="age" label="อายุ">
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="เพศ">
              <Select>
                <Option value="male">ชาย</Option>
                <Option value="female">หญิง</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">ยืนยัน</Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={data} />
      </header> 
    </div>
  );
}

export default App;
