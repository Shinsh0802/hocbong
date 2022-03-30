import React from 'react'
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import InterviewScheduleSave from './ScheduleSave/ScheduleSave';
import Service from '../../../api/service';
import ScheduleItem from './ScheduleItem';
import { getRole } from '../../../utils/utils';
import style from "./style.module.css"
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../shared/Loading/loadingSlice';
// import PaginatedItems from "../Schedule/PaginatedItems"
const InterviewSchedulePage = () => {
    const dispatch = useDispatch()
    let service = new Service();
    const [isView, setIsView] = useState(true)
    // const [datas, setDatas] = useState(Data.InterviewSchedule);
    const [isBDH, setIsBDH] = useState(getRole() === 'bdh')
    const [InterviewSchedule, setInterviewSchedule] = useState([]);
    const [checkLoading, setCheckLoading] = useState(true);
    const [isBCTSV, setIsBCTSV] = useState(getRole() === 'ctsv')
    const [arrPages, setArrPages] = useState([])
    const [page, setPage] = useState(1)
    //Xử lý phê duyệt
    const handleApprove = (id, status) => {
        var data = {
            "status": "Không đồng ý"
        };
        if (status === true) {
            data = {
                "status": "Đã duyệt"
            };
        }
        setCheckLoading(false);
        service.patch("/schedules/" + id + "/approval", data).then(response => {
            setCheckLoading(true);
            window.location.reload()
        }).catch(e => {
            setCheckLoading(true);
            window.location.reload()

        })
    }

    const taoMangtrang = (page, totalPages) => {
        var mangtrang = []
        for (let i = 0; i < totalPages; i++) {
            if (page === i + 1) {
                mangtrang.push(true)
            } else {
                mangtrang.push(false)
            }
        }
        setArrPages(mangtrang);
    }
    useEffect(() => {
        getInterviewSchedule();
    }, [])
    const getInterviewSchedule = async (trang) => {
        try {
            dispatch(startLoading)
            if (!trang) { trang = 1 }
            setPage(trang)
            trang = trang - 1
            let service = new Service();
            await service.get("/schedules?page=" + trang+"&size=10")
                .then(async response => {
                    taoMangtrang(trang + 1, response.data.data.totalPages)
                    setInterviewSchedule(response.data.data.docs);
                }).catch(e => {
                    setInterviewSchedule([]);
                }).finally(() => { dispatch(endLoading) })
        } catch (error) {
            setInterviewSchedule([]);
            dispatch(endLoading)
        }
    }

    // Xử lý đặt lịch
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setCheckLoading(false);
            const formData = new FormData(event.target);
            const data = {
                "schedule": formData.get('schedule'),
                "type": formData.get('type'),
                "group": formData.get('group'),
                "teams": 13,
                "note": formData.get('note'),
                "meetingLink": formData.get('meetingLink')
            };
            let service = new Service();
            service.post("/schedules", data).then(response => {
                setCheckLoading(true);
                getInterviewSchedule()
            }).catch(e => {
                setCheckLoading(true);
                setCheckLoading(true);
            })
        }
    }
    return (
        <div style={{ padding: '10px', width: "100%" }}>
            {checkLoading ?
                <div>
                    {
                        isBCTSV ?
                            <div>
                                {isView ?
                                    /*Nút đặt lịch */
                                    <Button
                                        hidden={isBDH}
                                        className={style.bookButton}
                                        onClick={() => { window.scrollTo(0, 0); setIsView(false) }}
                                        style={{ borderRadius: "50%", height: "70px", position: "fixed", right: "0", marginRight: "20px" }}
                                    >
                                        Đặt lịch
                                    </Button>
                                    :
                                    /*Form đặt lịch*/
                                    <div id="profile-item">
                                        <h1>Đặt lịch phỏng vấn</h1>
                                        <Form noValidate onSubmit={handleSubmit} >
                                            <InterviewScheduleSave />
                                            <div style={{ display: "flex", justifyContent: "end" }}>
                                                <Button
                                                    style={{ marginRight: 10, width: "49%" }}
                                                    className="btn btn-danger"
                                                    onClick={() => setIsView(true)}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button style={{ width: "49%" }} type="submit">Đặt lịch</Button>
                                            </div>
                                        </Form>
                                    </div>
                                }
                            </div> : <div></div>
                    }
                </div> : <div className="text-center">
                    <div className="spinner-grow" style={{ width: "15rem", height: "15rem", text: "center" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            }
            {/* Danh sách lịch phỏng vấn */}
            <br />
            <br />
            <h1 className={style.title} align="center">Lịch phỏng vấn</h1>
            <div id="profile-item">
                {
                    InterviewSchedule.sort((a, b) => a.date > b.date ? 1 : -1).map((item, index) => (
                        <ScheduleItem
                            handleApprove={handleApprove}
                            schedule={item}
                            index={index}
                        />
                    ))
                }
            </div>
            <nav aria-label="...">
                <ul class="pagination" style={{ display: "flex", justifyContent: "center" }}>

                    <li class="page-item disabled">
                        <Button style={{ color: "blue", backgroundColor: 'white' }} onClick={() => {
                            if (page > 1)
                                getInterviewSchedule(page - 1)
                        }}>Trước</Button>
                    </li>
                    {arrPages.map((item, index) => (
                        <li class="page-item">
                            {page === index - 2 ? "..." : ""}
                            {(page > index - 2 && page < index + 4) ?
                                <li class="page-item">
                                    {item ?
                                        <li class="page-item active">
                                            <Button >{index + 1}</Button>
                                        </li> :
                                        <li class="page-item">
                                            {/* <a class="page-link" >{index + 1}</a> */}
                                            <Button style={{ color: "blue", backgroundColor: 'white' }} onClick={() => {
                                                getInterviewSchedule(index + 1)
                                            }}>{index + 1} </Button>
                                        </li>

                                    }
                                </li> : ""
                            }
                            {page === index + 4 ? "..." : ""}
                        </li>
                    ))}
                    <Button style={{ color: "blue", backgroundColor: 'white' }} onClick={() => {
                        if (page < arrPages.length)
                            getInterviewSchedule(page + 1)
                    }}>Sau </Button>
                </ul>
            </nav>
        </div >
    )
}

export default InterviewSchedulePage
