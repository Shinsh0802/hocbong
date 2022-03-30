import { Form } from 'react-bootstrap'
import Select from 'react-select';
import Data from '../Data';
import { useEffect, useState } from 'react'

const InterviewScheduleSave = () => {
    const [optionsGroup, setOptionsGroup] = useState([]);
    useEffect(() => {
        const options = []
        for (let i = 0; i < Data.groups.length; i++) {
            options.push({ value: Data.groups[i], label: Data.groups[i] })
        }
        setOptionsGroup(options)

    }, [])
    const loais = [
        { value: "Phỏng vấn BĐH", label: "Phỏng vấn BĐH" },
        { value: "Phỏng vấn học bổng cấp Ban Điều Hành", label: "Phỏng vấn học bổng cấp Ban Điều Hành" },
    ];
    return (
        <Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Link họp</Form.Label>
                <Form.Control type="text" name="meetingLink" rows={3} required />
                <Form.Control.Feedback type="invalid">
                    Vui lòng nhập thông tin!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Thời gian</Form.Label>
                <Form.Control
                    type="datetime-local"
                    my-date-format="DD/MM/YYYY, hh:mm:ss"
                    name="schedule"
                    rows={3}
                    required
                    defaultValue="2022-01-01T12:00"
                />
                <Form.Control.Feedback type="invalid">
                    Vui lòng nhập thông tin!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Loại</Form.Label>
                <Select
                    name="type"
                    options={loais}
                />
                <Form.Control.Feedback type="invalid">
                    Vui lòng nhập thông tin!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Cộng đồng</Form.Label>
                {
                    Object.keys(optionsGroup).length > 0 ? (
                        <Select
                            name="group"
                            options={Object.keys(optionsGroup).length > 0 ? optionsGroup : ""}
                        />
                    ) : null
                }
                <Form.Control.Feedback type="invalid">
                    Vui lòng nhập thông tin!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ghi chú (Phải ghi đẩy đủ tên người phỏng vấn)</Form.Label>
                <Form.Control name="note" as="textarea" rows={3} required />
                <Form.Control.Feedback type="invalid">
                    Vui lòng nhập thông tin!
                </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Thứ tự phỏng vấn dự kiến</Form.Label>
                <Form.Control name="dukien" as="textarea" rows={3} required />
                <Form.Control.Feedback type="invalid">
                    Vui lòng nhập thông tin!
                </Form.Control.Feedback>
            </Form.Group> */}

        </Form.Group>
    )
}

export default InterviewScheduleSave
