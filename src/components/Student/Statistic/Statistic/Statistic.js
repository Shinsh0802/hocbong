import { Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Service from "../../../../api/service";
import { testdata } from "./testdata";
import {GrFilter} from 'react-icons/gr';
import "./style.css";

const Statistic = (props) => {
    //console.log(props.student);
    // filter
    const groups = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Huế", "Cần Thơ"]
    const teams = [9, 10, 11, 12, 13, 14];
    return (
        <div  >
            <Form style={{ margin: "10px 0px 0px 0px" }} onSubmit={props.handleSubmit}>
                <Row className="g-2" >
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Lọc theo cộng đồng">
                            <Form.Select aria-label="Floating label select example" name="group" >
                                <option value="">Tất cả</option>
                                {
                                    groups.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))


                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Lọc theo G">
                            <Form.Select aria-label="Floating label select example" name="teams" >
                                <option value="">Tất cả</option>
                                {
                                    teams.map((item, index) => (<option key={index} value={item}>{item}</option>))

                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <button type="submit" className="dark" style={{ backgroundColor: "white" }} ><GrFilter size={30} /></button>
                    </Col>

                </Row>
                
            </Form>
            <div>
                                <div className ="noti-card">
                                    <p>Tổng số sinh viên theo bộ lọc hiện tại:  {props.num} </p>
                                </div>
                                <div className ="noti-card">
                                    <p>Số lượng sinh viên đủ điều kiện phỏng vấn: {props.num1}</p>
                                    <p>Số lượng sinh viên đã phỏng vấn cấp cộng đồng: {props.num2}</p>
                                    <p>Số lượng sinh viên đã phỏng vấn cấp BĐH: {props.num3}</p>
                                    <p>Số lượng sinh viên đủ điều kiện nhận học bổng: {props.num4}</p>
                                    <p>Số lượng sinh viên đã chuyển học bổng: {props.num5}</p>
                                </div>
                                <div className ="noti-card">
                                    <p>Số lượng sinh viên ngừng trao học bổng: {props.num7}</p>
                                    <p>Số lượng sinh viên nhường học bổng: {props.num6}</p>
                                </div>
                    </div>  
        </div>
    );
}

export default Statistic;