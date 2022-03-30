import { Button, Modal, Table } from "react-bootstrap";
import React from "react";

const StudentModal = (props) => {
    //state

    //function
    function handleCheck(e) {
        props.setState(
            { "states": { ...props.state.states, [e.target.name]: e.target.checked } }
        )
    }
    //support render
    const checkBox = (prop) => {
        return (
            <input
                disabled={!(JSON.parse(localStorage.getItem("user")).role === "bdh" || JSON.parse(localStorage.getItem("user")).role === "secretary")}
                onClick={handleCheck}
                name={prop}
                checked={props.state.states[prop]}
                type="checkbox"
                className="status-checkbox" />
        )
    }
    //render
    return (
        <Modal show={props.showModal} onHide={props.show} centered>
            <Modal.Header>
                <Modal.Title>Cập nhật trạng thái cho: {props.item.fullName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table >
                    <colgroup>
                        <col span="1" style={{ width: "90%" }} />
                        <col span="1" style={{ width: "10%" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>Đủ điều kiện phỏng vấn</td>
                            <td>
                                {checkBox("approve_document")}
                            </td>
                        </tr>
                        <tr>
                            <td>Đã phỏng vấn cấp cộng đồng</td>
                            <td>
                                {checkBox("cd_interviewed")}
                            </td>
                        </tr>
                        <tr>
                            <td>Đã phỏng vấn cấp BĐH</td>
                            <td>{checkBox("bdh_interviewed")}</td>
                        </tr>
                        <tr>
                            <td>Đủ điều kiện nhận học bổng</td>
                            <td>{checkBox("approved_scholarship")}</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid black" }}>
                            <td>Đã chuyển học bổng</td>
                            <td>{checkBox("received_scholarship")}</td>
                        </tr>
                        <tr>
                            <td>Nhường học bổng</td>
                            <td>{checkBox("give_scholarship")}</td>
                        </tr>
                        <tr>
                            <td>Ngừng cấp học bổng</td>
                            <td>{checkBox("stop_scholarship")}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    style={{ width: "45%" }}
                    hidden={!props.isBDH}
                    variant="danger"
                    onClick={() => { props.show(); }}>
                    Hủy
                </Button>
                <Button
                    hidden={!props.isBDH}
                    style={{ width: "45%" }}
                    variant="primary"
                    onClick={() => { props.show(); props.handleSave(); }}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StudentModal;