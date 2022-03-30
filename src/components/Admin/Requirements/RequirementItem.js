import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import style from "./style.module.css"
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Service from "../../../api/service";
import { BiTask } from "react-icons/bi";
import { formatDate } from "../../../utils/utils";

const RequirementItem = ({ requirement }) => {
    const date = new Date(requirement.deadline)
    const [show, setShow] = useState(false);
    var issecretary = JSON.parse(localStorage.getItem('user')).role === "secretary"

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteRequirement = () => {
        const service = new Service();
        setShow(false);
        var url = "/after-interview/" + requirement._id
        service.delete(url).then(async (res) => {
            if (res) {
                window.location.reload()
            }
        }).catch(async (err) => { console.log(err); })


    }
    const [showYCSPV, setShowYCSPV] = useState(false);
    const handleCloseYCSPV = () => {
        setShowYCSPV(false);
        setValidated(false);
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
            const service = new Service();
            event.preventDefault();
            const formData = new FormData(event.target);
            var data = {
                content: formData.get("content"),
                deadline: formData.get("deadline"),
                semester: (localStorage.getItem("semester") === "Học kỳ 1") ? 1 : 2,
                schoolYear: localStorage.getItem("schoolYear"),
                progress: formData.get("progress") === "true" ? true : false,
            }
            var url = "/after-interview/" + requirement._id
            await service.put(url, data).then(async (res) => {
                YCSPV()
                if (res) {
                    requirement.content = data.content
                    requirement.deadline = data.deadline
                    requirement.progress = data.progress
                }

                // setisLoading(false)
            })
        }
        setValidated(true);
    };

    const progress = (requirement.progress) ? "Đã hoàn thành" : "Chưa hoàn thành"

    return (
        <tr className={style.row}>
            <td data-label='Họ và tên'>{requirement.studentName}</td>
            <td data-label='Thuộc G' align="center">{requirement.teams}</td>
            <td data-label='Cộng đồng' align="center">{requirement.group}</td>
            <td data-label='Nội dung yêu cầu' align="justify">{requirement.content}</td>
            <td data-label='Deadline'>{formatDate(date)}</td>
            <td data-label='Tiến độ' align="center">{progress}</td>
            {issecretary ? <td data-label='Chỉnh sửa' style={{ display: "flex", justifyContent: "center" }}>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Chỉnh sửa yêu cầu sau phỏng vấn</Tooltip>}
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
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Xóa yêu cầu sau phỏng vấn</Tooltip>}
                    onClick={handleShow}
                >
                    {({ ref, ...triggerHandler }) => (
                        <div {...triggerHandler} ref={ref}>
                            <RiDeleteBin6Line
                                onClick={handleShow}
                                style={{ margin: "0 10px", cursor: "pointer" }} size={25}
                            />
                        </div>
                    )}
                </OverlayTrigger>

            </td> : ''}
            <Modal show={showYCSPV} onHide={handleCloseYCSPV} size="lg" backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa yêu cầu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control placeholder="Nguyễn Văn A" required value={requirement.studentName} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Thuộc G</Form.Label>
                            <Form.Control placeholder="G13" required value={requirement.teams} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cộng đồng</Form.Label>
                            <Form.Control placeholder="Hà Nội" required value={requirement.group} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung yêu cầu</Form.Label>
                            <Form.Control name="content" as="textarea" rows={3} required >{requirement.content}</Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hạn chót</Form.Label>
                            <Form.Control placeholder="dd-mm-yyyy" required type="datetime-local" name="deadline" defaultValue={requirement.deadline} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>tiến độ</Form.Label>
                            <Form.Select name="progress" defaultValue={requirement.progress}
                            >
                                <option value={true}>Đã hoàn thành</option>
                                <option value={false}>Chưa hoàn thành</option>
                            </Form.Select>
                        </Form.Group>

                        <div style={{ textAlign: "right" }}>
                            <Button style={{ margin: "10px 0 10px 10px" }} variant="info" type="submit">Chỉnh sửa</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Xóa yêu cầu</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn xóa yêu cầu của {requirement.studentName} - G{requirement.teams} - Cộng đồng {requirement.group}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteRequirement}>
                        Xóa
                    </Button>

                </Modal.Footer>
            </Modal>

        </tr>
    );
}

export default RequirementItem;