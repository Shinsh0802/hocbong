import { Button, Card } from "react-bootstrap";
import MyPin from "./pin.jfif"
import { AiOutlineLink, AiOutlineFieldTime } from "react-icons/ai";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { GrGroup, GrNote } from 'react-icons/gr';
import { BiCommentDetail, BiSave } from 'react-icons/bi';
import { useState } from "react";
import { formatTime, getRole } from "../../../utils/utils";
import { BsPencil } from "react-icons/bs";
import Service from '../../../api/service';
import style from "./style.module.css"

const ScheduleItem = ({ schedule, handleApprove, index }) => {
    const dateTime = new Date(schedule.schedule)
    console.log(dateTime)
    console.log(schedule)
    const [isBDH, setIsBDH] = useState(getRole() === 'bdh');
    const [isEditable, setisEditable] = useState(false)
    const [isBCTSV, setIsBCTSV] = useState(getRole() === 'ctsv')
    const [comment, setComment] = useState("")
    return (
        <Card style={{ width: '100%', marginBottom: '20px', border: "1px black solid" }}>
            <Card.Body>
                <Card.Text>
                    <img className={style.pin} width="50px" style={{ float: "right" }} src={MyPin} alt="pin" />
                    <AiOutlineLink style={{ width: "25px", marginRight: "10px" }} />
                    <span style={{ fontWeight: 'bold' }}>Link họp: </span>
                    <span>
                        <a href={schedule.meetingLink} rel="noreferrer" target="_blank">{schedule.meetingLink}</a>
                    </span>
                    <br />
                    <br />
                    <AiOutlineFieldTime style={{ width: "25px", marginRight: "10px" }} />
                    <span style={{ fontWeight: 'bold' }}>Thời gian: </span>
                    <span>{formatTime(dateTime,'en-GB')}</span><br />
                    <br />
                    <VscTypeHierarchySub style={{ width: "25px", marginRight: "10px" }} />
                    <span style={{ fontWeight: 'bold' }}>Hình thức: </span>
                    <span>{schedule.type}</span><br />
                    <br />
                    <GrGroup style={{ width: "25px", marginRight: "10px" }} />
                    <span style={{ fontWeight: 'bold' }}>Cộng đồng: </span>
                    <span>{schedule.group}</span><br />
                    <br />
                    <GrNote style={{ width: "25px", marginRight: "10px" }} />
                    <span style={{ fontWeight: 'bold' }}>Ghi chú: </span>
                    <span>{schedule.note}</span><br />
                    <br />
                    <BiCommentDetail style={{ width: "25px", marginRight: "10px" }} />
                    <span style={{ fontWeight: 'bold' }}>Ý kiến BĐH:
                        {
                            isBDH ? <Button style={{ marginLeft: "10px" }} onClick={() => setisEditable(true)}>Chỉnh sửa</Button> : ""
                        }
                    </span><br />
                </Card.Text>
                <div className="mb-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <textarea
                        disabled={!isEditable}
                        style={{ width: "calc(100%)", height: "80px" }}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div hidden={!isBDH} style={{
                        borderRadius: "50%",
                        backgroundColor: "#f2f2f2",
                        minWidth: "5vw",
                        minHeight: "5vw",
                        marginLeft: "10px"
                    }}>
                        <BsPencil hidden={isEditable} style={{ margin: "30%", cursor: "pointer", maxWidth: "2vw" }}
                            onClick={() => {
                                console.log(1);
                                setisEditable(true)
                            }
                            }
                        />
                        <BiSave hidden={!isEditable} style={{ margin: "30%", cursor: "pointer", maxWidth: "2vw" }}
                            onClick={() => {
                                // var data = {
                                //     ""
                                // }
                                // service.patch("/schedules/" + schedule._id + "/approval", data).then(response => {
                                //     window.location.reload()
                                // }).catch(e => {
                                //     window.location.reload()
                                // })
                                setisEditable(false)
                            }}
                        />
                    </div>
                </div>
                {
                    (isBDH && schedule.approval.status === "Chưa duyệt") ?
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <Button
                                style={{ width: "49%", }}
                                variant="success"
                                onClick={() => handleApprove(schedule._id, true)}
                            >
                                Phê duyệt
                            </Button>
                            <Button
                                style={{ width: "49%" }}
                                variant="danger"
                                onClick={() => handleApprove(schedule._id, false)}
                            >
                                Không đồng ý
                            </Button>
                        </div> : schedule.approval.status === "Đã duyệt" ?
                            <h6
                                style={{ textAlign: "center", color: "green", fontWeight: "bold" }}
                            >
                                BDH đã phê duyệt
                            </h6>
                            : schedule.approval.status === "Không đồng ý" ?
                                <h6
                                    style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
                                >
                                    BDH không đồng ý
                                </h6>
                                :
                                <h6
                                    style={{ textAlign: "center", color: "gray", fontWeight: "bold" }}
                                >
                                    Chờ BDH duyệt
                                </h6>

                }
                {
                    isBCTSV ?
                        <Button
                            style={{ width: "15%" }}
                            variant="danger"
                            onClick={() => {
                                let service = new Service();
                                service.delete("/schedules/" + schedule._id).then(response => {
                                    window.location.reload()
                                }).catch(e => {
                                    window.location.reload()

                                })

                            }}
                        >
                            Xóa
                        </Button> : <div></div>
                }
            </Card.Body>
        </Card>
    );
}

export default ScheduleItem;