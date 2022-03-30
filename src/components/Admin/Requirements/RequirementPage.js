import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Service from "../../../api/service"
import { Button, Modal, Form } from "react-bootstrap";
import RequirementItem from "./RequirementItem";
import style from "./style.module.css"
import { MdSaveAlt } from "react-icons/md";
import { RiAddBoxLine } from "react-icons/ri"
import Filter from "../../shared/Filter/Filter";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../shared/Loading/loadingSlice";
const Requirements = () => {
    const dispatch = useDispatch()
    // COMPONENT STATE  
    let history = useHistory();
    const [requirements, setrequirements] = useState([])
    const [stateG, setstateG] = useState('')
    const [stateCongDong, setstateCongDong] = useState('Tất cả')
    const [editable, setEditable] = useState(false);
    const [checkLoading, setCheckLoading] = useState(true);
    const [arrPages, setArrPages] = useState([])
    const [page, setPage] = useState(1)

    const taoMangtrang = (page, totalPages) => {
        let mangtrang = []
        for (let i = 0; i < totalPages; i++) {
            if (page === i + 1) {
                mangtrang.push(true)
            } else {
                mangtrang.push(false)
            }
        }
        setArrPages(mangtrang);
    }
    const getData = (trang, team, group) => {
        if (!trang) { trang = 1 }
        setPage(trang)
        trang = trang - 1
        setCheckLoading(false);
        if (group === "Tất cả") group = ""
        let url = "/after-interview?page=" + trang
        if (team) {
            url = url + "&teams=" + team
        }
        if (group) {
            if (group.length != 1) {
                url = url + "&group=" + group

            }
        }
        url = url + "&size=10"
        const service = new Service();
        dispatch(startLoading)
        service
            .get(url)
            .then(async (res) => {
                console.log(res);
                if (res.status === 200) {
                    let datas = res.data.data.docs
                    taoMangtrang(trang + 1, res.data.data.totalPages)
                    setrequirements(datas)
                    setCheckLoading(true);
                }
                else {
                    taoMangtrang(1, 1)
                    setrequirements([])
                    setCheckLoading(true);
                }
            })
            .catch((e) => {
                setCheckLoading(true);
                console.log(e);
            }).finally(() => { dispatch(endLoading) })
    }
    //
    const handleFilter = () => {
        console.log(stateG, stateCongDong);
        getData(1, stateG, stateCongDong)
    }
    useEffect(() => {
        getData(1, "", "");
    }, [])
    //

    const useViewport = () => {
        const [width, setWidth] = React.useState(window.innerWidth);
        React.useEffect(() => {
            const handleWindowResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleWindowResize);
            return () => window.removeEventListener("resize", handleWindowResize);
        }, []);
        return { width };
    }

    const viewPort = useViewport();
    const ishidden = viewPort.width <= 1530;
    const tableWidth = (viewPort.width >= 1024) ? "100%" : "calc(100vh-250px)"

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setValidated(false);
    }

    var issecretary = JSON.parse(localStorage.getItem('user')).role === "secretary"

    // Add requirement
    const [validated, setValidated] = useState(false);

    const [formHoTen, setFormHoten] = useState();
    const [formG, setFormG] = useState();
    const [formCd, setFormCd] = useState();
    const [formRequirement, setFormRequirement] = useState();
    const [formDeadline, setFormDeadline] = useState();
    const [formProgress, setFormProgress] = useState("false");

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            const service = new Service();
            const semester = (localStorage.getItem("semester") === "Học kỳ 1") ? 1 : 2
            await service
                .post("/after-interview", {
                    semester: semester,
                    schoolYear: localStorage.getItem("schoolYear"),
                    content: formRequirement,
                    deadline: formDeadline,
                })
                .then(async (res) => {

                    const requirement = {
                        studentName: formHoTen,
                        teams: formG,
                        group: formCd,
                        content: formRequirement,
                        deadline: formDeadline,
                        progress: formProgress
                    }
                    requirements.push(requirement);
                    setShow(false);
                    handleFilter()
                })
                .catch((e) => {
                    alert(e)
                });

        }
        setValidated(true);
    };
    //render
    return (
        <div>
            <h1 align="center">Yêu cầu sau phỏng vấn</h1>
            {/* Filter */}
            <div className={style.filterBox}>

                <Filter setstateG={setstateG} setstateCongDong={setstateCongDong} handleFilter={handleFilter} />
                <Button
                    className={style.buttonAdd}
                    hidden={editable}
                    variant="info"
                    onClick={() => history.push("/Admin/Students")}
                >
                    <RiAddBoxLine style={{ fontSize: "120%" }} />
                    {
                        ishidden ?
                            <> Thêm</>
                            : <> Thêm yêu cầu</>
                    }
                </Button>
            </div>
            {checkLoading ? <div>
                <div className={style.filterBox}>
                    {/* <Filter setstateG={setstateG} setstateCongDong={setstateCongDong} handleFilter={handleFilter} /> */}
                    {/* Chỉnh sửa */}
                    <div className={style.classButton}>
                        {/* <Button
                            className={style.buttonAdd}
                            hidden={editable}
                            variant="info"
                            onClick={() => history.push("/Admin/Students")}
                        >
                            <RiAddBoxLine style={{ fontSize: "120%" }} />
                            {
                                ishidden ?
                                    <> Thêm</>
                                    : <> Thêm yêu cầu</>
                            }
                        </Button> */}
                        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thêm yêu cầu</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Họ và tên</Form.Label>
                                        <Form.Control placeholder="Nguyễn Văn A" required onChange={e => setFormHoten(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Thuộc G</Form.Label>
                                        <Form.Control placeholder="G13" required onChange={e => setFormG(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Cộng đồng</Form.Label>
                                        <Form.Select onChange={e => setFormCd(e.target.value)}>
                                            <option>Hồ Chí Minh</option>
                                            <option>Cần Thơ</option>
                                            <option>Huế</option>
                                            <option>Đà Nẵng</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nội dung yêu cầu</Form.Label>
                                        <Form.Control  as="textarea" rows={3} required onChange={e => setFormRequirement(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Hạn chót</Form.Label>
                                        <Form.Control placeholder="dd-mm-yyyy" required onChange={e => setFormDeadline(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tiến độ</Form.Label>
                                        <Form.Select onChange={e => setFormProgress(e.target.value)}>
                                            <option value="false">Chưa hoàn thành</option>
                                            <option value="true">Đã hoàn thành</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <div style={{ textAlign: "right" }}>
                                        <Button style={{ margin: "10px 0 10px 10px" }} variant="info" type="submit">Thêm</Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        <Button className={style.buttonUpdate} variant="success" hidden={!editable} onClick={() => setEditable(false)}><MdSaveAlt style={{ fontSize: "120%" }} /> Lưu</Button>
                    </div>

                </div>
                {/* Table */}
                <div style={{ width: { tableWidth }, overflowX: "scroll" }}>
                    <table className={style.table} style={{ width: tableWidth }}>
                        <tr className={style.thead} align="center">
                            <td width="140">Họ và tên</td>
                            <td width="100">Thuộc G</td>
                            <td width="140">Cộng đồng</td>
                            <td width="300">Nội dung yêu cầu</td>
                            <td width="120">Hạn chót</td>
                            <td width="150">Tiến độ</td>
                            {
                                issecretary ? <td width="130">Chức năng</td> : ""
                            }
                        </tr>
                        {requirements.sort(function (a, b) {
                            if (a.studentName.toLowerCase() < b.studentName.toLowerCase()) return -1;
                            if (a.studentName.toLowerCase() > b.studentName.toLowerCase()) return 1;
                            return 0;
                        }).map(
                            (requirement) => {
                                const index = requirements.findIndex((data) => {
                                    return data === requirement
                                })
                                return (<RequirementItem
                                    key={index}
                                    index={index}
                                    editable={editable}
                                    requirement={requirement}
                                />)
                            }

                        )}
                    </table>
                </div>
            </div> : null
            }
            <nav style={{ marginTop: "10px" }} aria-label="...">
                <ul class="pagination" style={{ display: "flex", justifyContent: "center" }}>

                    <li class="page-item disabled">
                        <Button style={{ color: "blue", backgroundColor: 'white' }} onClick={() => {
                            if (page > 1)
                                getData(page - 1, stateG[0], stateCongDong[0])
                        }}>Trước </Button>
                    </li>
                    {arrPages.map((item, index) => (
                        <li class="page-item" key={index}>
                            {page === index - 2 ? "..." : ""}
                            {(page > index - 2 && page < index + 4) ?
                                <li class="page-item" key={index}>
                                    {item ?
                                        <li class="page-item active">
                                            <Button >{index + 1}</Button>
                                        </li> :
                                        <li class="page-item">
                                            {/* <a class="page-link" >{index + 1}</a> */}
                                            <Button style={{ color: "blue", backgroundColor: 'white' }} onClick={() => {
                                                getData(index + 1, stateG[0], stateCongDong[0])
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
                            getData(page + 1, stateG[0], stateCongDong[0])
                        // getInterviewSchedule(page + 1)
                    }}>Sau </Button>
                </ul>
            </nav>


        </div>
    );
}

export default Requirements;