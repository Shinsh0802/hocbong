import React, { useEffect, useRef, useState } from "react";
import "./style.css"
import StudentModal from "./StudentModal";
import { BsCheckLg, BsPencilSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Service from "../../../../api/service";
import style from './style.module.css'
import { Button, Modal, Form, Image, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { GrStatusUnknown } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import ProfilePage from "../../Profile/ProfileRouter";

const StudentRow = (props) => {
    //variable
    const history = useHistory()
    const { item, studentState, setisLoading, getStates } = props;
    const isBDH = JSON.parse(localStorage.getItem('user')).role === "bdh"
    var issecretary = JSON.parse(localStorage.getItem('user')).role === "secretary"
    const [showDG, setShowDG] = useState(false);
    //effect
    useEffect(() => {
        try {
            if (studentState[0].states) // nếu tồn tại, khác undefined
                setState(studentState[0])
        } catch {
            return;
        }
    }, [])
    //state
    const [state, setState] = useState(
        {
            "states": {
                "approve_document": false,
                "cd_interviewed": false,
                "bdh_interviewed": false,
                "approved_scholarship": false,
                "received_scholarship": false,
                "give_scholarship": false,
                "stop_scholarship": false
            }
        }
    );
    const [showModal, setShowModal] = useState(false);
    //function
    async function handleSave() {
        const service = new Service();
        let url = `/bdh/stateinterview?userId=${item._id}&semester=3&schoolYear=2021`
        setisLoading(true)
        if (studentState.length)
            await service.put(url, state)
        else
            await service.post(url, state)
        setisLoading(false)
        getStates();
    }
    const pushLoading = () => { 
       document.getElementById('loading').style.zIndex=2000
     }
    const show = () => {
        if (showModal) setShowModal(false);
        else setShowModal(true);
    }
    const [showYCSPV, setShowYCSPV] = useState(false);
    const handleClose = () => {
        setShowYCSPV(false);
        setValidated(false);
        document.getElementById('loading').style.zIndex=10;
        console.log('close')
    }
    const YCSPV = () => {
        if (showYCSPV) setShowYCSPV(false);
        else setShowYCSPV(true);
    }

    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            // setisLoading(true)
            event.preventDefault();
            const formData = new FormData(event.target);
            var data = {
                content: formData.get("content"),
                deadline: formData.get("deadline"),
                semester: (localStorage.getItem("semester") === "Học kỳ 1") ? 1 : 2,
                schoolYear: localStorage.getItem("schoolYear")
            }
            var url = "/after-interview/" + item.studentId + "/create"
            const service = new Service();
            await service.post(url, data).then(async (res) => {
                YCSPV()
                // setisLoading(false)
            })
        }
        setValidated(true);
    };

    const checkDone = () => {
        let res = true
        for (var prop in state.states) {
            if (Object.prototype.hasOwnProperty.call(state.states, prop)) {
                res &= state.states[prop]
            }
        }
        return res;
    }
    //render
    return (
        <tr style={{ backgroundColor: checkDone() ? '#a8ffaa' : 'white' }} to="/" align="center" >
            <td width="25%" align="left">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>{item.fullName}</div>
                </div>
            </td>
            <td>{item.group}</td>
            <td>{item.teams}</td>
            <td>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="button-tooltip-2">Đánh giá hồ sơ sinh viên</Tooltip>}
                    >
                        {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler} ref={ref} onClick={() =>{setShowDG(true); pushLoading()} }>
                                <BsPencilSquare
                                    style={{ margin: "0 10px", cursor: "pointer" }} size={25}
                                />
                            </div>
                        )}
                    </OverlayTrigger>
                    <Modal
                        show={showDG}
                        onHide={() => {setShowDG(false); document.getElementById('loading').style.zIndex=10}}
                        fullscreen={true}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Hồ sơ phỏng vấn của sinh viên {item.fullName}
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProfilePage studentId={item.studentId}/>
                        </Modal.Body>
                    </Modal>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="button-tooltip-2">Cập nhật trạng thái sinh viên</Tooltip>}
                    >
                        {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler} ref={ref}>
                                <GrStatusUnknown
                                    style={{ margin: "0 10px", cursor: "pointer" }} size={25}
                                />
                            </div>
                        )}
                    </OverlayTrigger>
                    {issecretary ? <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="button-tooltip-2">Tạo yêu cầu sau phỏng vấn</Tooltip>}
                        onClick={YCSPV}
                    >
                        {({ ref, ...triggerHandler }) => (
                            <div {...triggerHandler} ref={ref}>
                                <BiTask
                                    onClick={YCSPV}
                                    style={{ margin: "0 10px", cursor: "pointer" }} size={25}
                                />
                            </div>
                        )}

                    </OverlayTrigger> : ""
                    }
                    <Modal show={showYCSPV} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm yêu cầu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control placeholder="Nguyễn Văn A" required value={item.fullName} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Thuộc G</Form.Label>
                                    <Form.Control placeholder="G13" required value={item.teams} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cộng đồng</Form.Label>
                                    <Form.Control placeholder="Hà Nội" required value={item.group} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nội dung yêu cầu</Form.Label>
                                    <Form.Control  name="content" as="textarea" rows={3} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hạn chót</Form.Label>
                                    <Form.Control placeholder="dd-mm-yyyy" required type="datetime-local" name="deadline" />
                                </Form.Group>
                                <div style={{ textAlign: "right" }}>
                                    <Button style={{ margin: "10px 0 10px 10px" }} variant="info" type="submit">Thêm</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>

                </div>
            </td>
            <StudentModal
                isBDH={isBDH}
                state={state}
                setState={setState}
                show={show}
                showModal={showModal}
                item={item}
                handleSave={handleSave}
            />
        </tr>
    )
}

export default StudentRow;