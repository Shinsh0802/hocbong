import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { getGMax } from "../../../utils/utils";
import Basic from "../../Student/Profile/Basic/Basic";

const AdminProfile = () => {
    //handle submit
    const handleSubmit = (e) => { 
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = {
            fullName: formData.get('fullName'),
            dateOfBirth: formData.get('dateOfBirth'),
            phoneNumber: formData.get('phoneNumber'),
            email: formData.get('email'),
            address: formData.get('address'),
        }
        console.log(data)
    }
    //editable
    const [editable, setEditable] = useState(false)
    //render
    return (
        <div style={{maxWidth: "700px", margin: "auto", padding: "0 10px"}}>
            <h1 align="center">Thông tin cá nhân</h1>
            <Button hidden={editable} style={{ margin: "auto", display: "block" }} variant="light" 
            onClick={()=>{setEditable(true)}}>
                <BsPencil size={20} style={{ marginRight: "5px" }} />
                <span>
                    Chỉnh sửa
                </span>
            </Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên hiển thị:</Form.Label>
                    <Form.Control name="fullName" disabled={!editable} type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ngày sinh:</Form.Label>
                    <Form.Control name="dateOfBirth" disabled={!editable} type="date" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control name="phoneNumber" disabled={!editable} type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control name="email" disabled={!editable} type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quê quán:</Form.Label>
                    <Form.Control name="address" disabled={!editable} type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quản lý cộng đồng:</Form.Label>
                    <Form.Control disabled type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quản lý G:</Form.Label>
                    <Form.Control disabled type="text" placeholder="" />
                </Form.Group>
                <Button type="submit" className="mb-3" style={{width: "100%"}} hidden={!editable}>Cập nhật</Button>
            </Form>
        </div>
    );
}

export default AdminProfile;