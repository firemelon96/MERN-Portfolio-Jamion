import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux"
import { HideLoading, ShowLoading } from "../../redux/rootSlice"
import axios from 'axios';

function AdminContact() {
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state)=>state.root);
    const onfinish = async (values)=>{
        try {
            dispatch(ShowLoading())
            const response = await axios.post("/api/portfolio/update-contact", {
                ...values,
                _id: portfolioData.contacts._id
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
            }else{
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
  return (
    <div>
      <Form
        onFinish={onfinish}
        layout="vertical"
        initialValues={portfolioData.contacts}
      >
        <Form.Item name="name" label="Welcome text">
          <Input placeholder="Intro" />
        </Form.Item>
        <Form.Item name="gender" label="First Name">
          <Input placeholder="Enter your First name" />
        </Form.Item>
        <Form.Item name="age" label="Last Name">
          <Input placeholder="Enter your last name" />
        </Form.Item>
        <Form.Item name="email" label="Caption">
          <Input placeholder="Enter a Caption" />
        </Form.Item>
        <Form.Item name="mobile" label="Description">
          <Input placeholder="Enter Description" />
        </Form.Item>
        <Form.Item name="country" label="Description">
          <Input placeholder="Enter Description" />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminContact;
