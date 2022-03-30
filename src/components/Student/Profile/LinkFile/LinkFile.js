import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Service from "../../../../api/service";
import Loading from "../../../shared/Loading/Loading";
import EditButton from "../EditButton";
import style from "./style.module.css";
import axios from "axios";
import environment from "../../../../api/environments/environment";
import { endLoading, startLoading } from "../../../shared/Loading/loadingSlice";

const HealthVideo = (p) => {
    const dispatch = useDispatch()
    const [txtLink, setTxtLink] = useState({});
    const [validated, setValidated] = useState(false);
    const [editable, setEditable] = useState(false);
    const [exist, setExist] = useState(false)
    const [rerender, setRerender] = useState(true)
    //get
    useEffect(() => {
        if(!p.studentId){
            const service = new Service();
            dispatch(startLoading)
            service.get('/condition-interview/all-condition/of-student')
                .then((res) => {
                    let filteredData = [];
                    if (res.status !== 204) {
                        filteredData = res.data.data.filter((item) => {
                            return item.timePlan.semester == localStorage.getItem('semester') && item.timePlan.schoolYear === localStorage.getItem('schoolYear')
                        })
                    }
                    if (filteredData.length) {
                        setExist(true)
                        setTxtLink(filteredData[0])
                    }

                })
                .finally(() => dispatch(endLoading))
        }
        else{
            getLinkByStudentId()
        }
    }, [rerender])

    const getLinkByStudentId = async () => {
        dispatch(startLoading)
        await axios.get(`http://localhost:1995/api/condition-interview/user?studentId=${p.studentId}&semester=${localStorage.semester}&schoolYear=${localStorage.schoolYear}`, environment.headers).then(res => {
          if (!res.data.data) {
            setTxtLink([]);

          } else {
            var data = res.data.data;
            setTxtLink(data);

          }
          console.log(res);
        }).catch(err => {
            setTxtLink([]);

        }).finally(() => { dispatch(endLoading) })
      }

    //
    const onSave = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        setTxtLink({ ...txtLink, linkCondition: data.get('txtLink') })
        const service = new Service();
        dispatch(startLoading)
        if (exist) {
            service.patch(`/condition-interview/${txtLink._id}`, {
                semester: parseInt(localStorage.getItem('semester')),
                schoolYear: localStorage.getItem('schoolYear'),
                linkCondition: data.get('txtLink')
            })
                .then((res) => {
                    if (res) {
                        setRerender(!rerender)
                        setEditable(false)
                    }
                })
                .finally(() => dispatch(endLoading))
        } else {
            service.post('/condition-interview', {
                semester: parseInt(localStorage.getItem('semester')),
                schoolYear: localStorage.getItem('schoolYear'),
                linkCondition: data.get('txtLink')
            })
                .then((res) => {
                    if (res) {
                        setRerender(!rerender)
                        setEditable(false)
                    }
                })
                .finally(() => dispatch(endLoading))
        }
    }

    const showLink = () => {
        return (
            <Form noValidate validated={validated} onSubmit={onSave} >
                <Form.Group role="form" className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ fontWeight: "bold", marginTop: "20px" }}>
                        Link drive (chứa biên lai, bảng điểm, video sức khỏe,...)
                    </Form.Label>
                    <Form.Control defaultValue={txtLink?.linkCondition} disabled={!editable} type="text" required name="txtLink" style={{ marginTop: "10px" }} />
                    <Form.Control.Feedback type="invalid">Chưa nhập thông tin</Form.Control.Feedback>
                    <Button hidden={p.studentId} variant="primary" type="submit" className="Submit-bt" style={{ width: "100%", marginTop: "20px" }}>Cập nhật</Button>
                </Form.Group>
            </Form>
        )
    }
    return (
        <>
            {
                <div>
                    <EditButton path={p.path} title={'Link tài liệu'} editable={editable} setEditable={setEditable} hidden={JSON.parse(localStorage.getItem('user')).role !== 'student'}/>
                    {showLink()}
                    {/* {showVideo(link)} */}
                </div>
            }
        </>
    )
}

export default HealthVideo;