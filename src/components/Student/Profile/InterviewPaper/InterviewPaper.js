import React, { useState, useEffect } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import Service from "../../../../api/service";
import EditButton from "../EditButton";
import Study from "./Study";
import axios from "axios";
import environment from "../../../../api/environments/environment";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../../shared/Loading/loadingSlice";

const TestInterView = (props) => {
  const dispatch = useDispatch()
  const [checkLoading, setCheckLoading] = useState(false);
  const [InterView, setInterView] = useState([]);
  const [editable, setEditable] = useState(false)
  const study = {
    "mediumScore": {
      "reality": "Mreality",
      "target": "Mtarget",
      "explanation": "Mexplanation"
    },
    "failedSubject": {
      "reality": "Freality",
      "target": "Ftarget",
      "explanation": "Fexplanation"
    },
    "pointTraining": {
      "reality": "Preality",
      "target": "Ptarget",
      "explanation": "Pexplanation"
    },
    "schoolAct": {
      "reality": "Sreality",
      "target": "Starget",
      "explanation": "Sexplanation"
    },
    "englishConditions": {
      "reality": "Ereality",
      "target": "Etarget",
      "explanation": "Eexplanation"
    }
  }
  useEffect(() => {
    if(!props.studentId) getInterView();
    else{
      getInterViewByStudentId();
    }
  }, []);

  const getInterViewByStudentId = async () => {
    setCheckLoading(false);
    await axios.get(`http://localhost:1995/api/interviews/user?studentId=${props.studentId}&semester=${localStorage.semester}&schoolYear=${localStorage.schoolYear}`, environment.headers).then(res => {
      if (!res.data.data) {
        setInterView([]);
        setCheckLoading(true);
      } else {
        var data = res.data.data;
        setInterView([data]);
        setCheckLoading(true);
      }
      console.log(res);
    }).catch(err => {
      setInterView([]);
      setCheckLoading(true);
    });
  }
  const getInterView = async () => {
    try {
      const service = new Service();
      setCheckLoading(false);
      dispatch(startLoading)
      await service.get("/interviews/all-interview/current-user").then(res => {
        console.log(res.data.data);
        if (!res.data.data) {
          setInterView([]);
          setCheckLoading(true);
        } else {
          var datas = res.data.data;
          for (let i = 0; i < datas.length; i++) {
            if (datas[i]?.timePlan?.semester === parseInt(localStorage.getItem("semester")) & datas[i]?.timePlan?.schoolYear === localStorage.getItem("schoolYear")) {
              setInterView([datas[i]]);
              setCheckLoading(true);
              return
            }
          }
          setInterView([]);
          setCheckLoading(true);

        }
      }).catch(err => {
        setInterView([]);
        setCheckLoading(true);
      }).finally(() => { dispatch(endLoading) })

    } catch (error) {
      setInterView([]);
      setCheckLoading(true);
    }
  };

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setCheckLoading(false);
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        timePlan: { semester: parseInt(localStorage.getItem("semester")), schoolYear: localStorage.getItem("schoolYear") },
        study: {
          "mediumScore": {
            "reality": parseInt(formData.get('Mreality')),
            "target": parseInt(formData.get('Mtarget')),
            "explanation": formData.get('Mexplanation')
          },
          "failedSubject": {
            "reality": parseInt(formData.get('Freality')),
            "target": parseInt(formData.get('Ftarget')),
            "explanation": formData.get('Fexplanation')
          },
          "pointTraining": {
            "reality": parseInt(formData.get('Preality')),
            "target": parseInt(formData.get('Ptarget')),
            "explanation": formData.get('Pexplanation')
          },
          "schoolAct": {
            "reality": formData.get('Sreality'),
            "target": formData.get('Starget'),
            "explanation": formData.get('Sexplanation')
          },
          "englishConditions": {
            "reality": formData.get('Ereality'),
            "target": formData.get('Etarget'),
            "explanation": formData.get('Eexplanation')
          }
        },
        health: {
          physically: {
            weight: formData.get("weight"),
            height: formData.get("height"),
          },
          exerciseSport: {
            name: formData.get("sport"),
            frequency: formData.get("frequency"),
          },
          commonDiseases: formData.get("chronicDiseases"),
        },
        join_activity: {
          regularAct: formData.get("regular"),
          periodicalAct: formData.get("periodic"),
          levelCompletion: formData.get("performWork"),
          numAbsence: formData.get("absent"),
          discipline: formData.get("discipline"),
        },
        share_love: {
          contributeToG: formData.get("contribute"),
          nameFriendsInG: formData.get("nameSituation"),
          interactInSocial: formData.get("interactG"),
          communicateInG: formData.get("communicate"),
          helpInG: formData.get("helpInG"),
          MeaningOfAct: formData.get("operationalMeaning"),
        },
        scholarship_purpose: {
          useScholarshipFor: formData.get("purpose"),
          meaningOfScholarship: formData.get("meaning"),
        }
      };
      console.log(data);
      setInterView([data])
      if (Object.keys(InterView).length > 0) {
        const url = "/interviews/" + InterView[0]?._id;
        const service = new Service();
        service
          .patch(url, data)
          .then((response) => {
            console.log(2);
            setInterView([data])
            setCheckLoading(true);
          })
          .catch((error) => {
            console.log(3);
            setInterView([data])
            setCheckLoading(true);
          });
      } else {
        const url = "/interviews";
        const service = new Service();
        service
          .post(url, data)
          .then((response) => {
            getInterView();
            setCheckLoading(true);
          })
          .catch((error) => {
            getInterView()
            setCheckLoading(true);
          });
      }
    }
    setValidated(true);
  };

  return (
    <div>
      <EditButton title={'Phiếu phỏng vấn'} editable={editable} setEditable={setEditable} path={props.path} hidden={JSON.parse(localStorage.getItem('user')).role !== 'student'}/>
      {
        checkLoading ?
          <Form
            className="InterView-page"
            noValidate
            onSubmit={handleSubmit}
          >
            <Form.Group className="ppv">
              <h3>Học tập</h3>
              <div className="ppv">
                <Accordion flush>

                  <Accordion.Item eventKey="0">
                    <Accordion.Header >Điểm trung bình</Accordion.Header>
                    <Accordion.Body >
                      <Study data={InterView[0]?.study?.mediumScore} name="mediumScore" study={study?.mediumScore} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Số môn không đạt</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.failedSubject} name="failedSubject" study={study?.failedSubject} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Điểm rèn luyện</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.pointTraining} name="pointTraining" study={study?.pointTraining} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Hoạt động trong trường</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.schoolAct} name="schoolAct" study={study?.schoolAct} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Điều kiện tiếng Anh</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.englishConditions} name="englishConditions" study={study?.englishConditions} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>
              </div>
              <br></br>
              <h3>Sức khỏe:</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Cân nặng</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="weight"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.health?.physically?.weight
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Chiều cao</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="height"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.health?.physically?.height
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Bệnh thường gặp/mãn tính</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="chronicDiseases"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.health?.commonDiseases
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Môn thể thao tập luyện</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="sport"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.health?.exerciseSport?.name
                      : ""
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Tần suất</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="frequency"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.health?.exerciseSport?.frequency
                      : ""
                  }
                />
              </Form.Group>
              <br></br>
              <h3>Thái độ, ý thức tham gia sinh hoạt Quỹ</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Đối với sinh hoạt thường xuyên: là sinh hoạt với tần suất một tháng,
                  ba tháng, sáu tháng tùy mỗi G theo quy định quản lý sinh viên
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="regular"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.join_activity?.regularAct
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Đối với sinh hoạt định kỳ: là những sinh hoạt do chính G tổ chức, do
                  G khác tổ chức, hoặc BĐH tổ chức ứng với những nội dung lớn trong
                  năm theo quy định quản lý sinh viên
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="periodic"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.join_activity?.periodicalAct
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Thực hiện các công việc được giao từ BCS G, BCTSV của cộng đồng.
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="performWork"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.join_activity?.levelCompletion
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Số lần vắng sinh hoạt, tình trạng hoạt động công ích Quỹ.
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="absent"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.join_activity?.numAbsence
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Kỷ luật (mức kỷ luật đã nhận từ BĐH Qũy)</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="discipline"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.join_activity?.discipline
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <br></br>
              <h3>Chia sẽ yêu thương</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Liệt kê những đóng góp cho việc duy trì, xây dựng cho tập thể G, cho
                  cộng đồng mà sinh viên đang sinh hoạt.
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="contribute"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.share_love?.contributeToG
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Bạn biết tên và hoàn cảnh của bao nhiêu bạn trong G của mình?
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="nameSituation"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.share_love?.nameFriendsInG
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Bạn có tương tác với G của mình trên mạng xã hội không?
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="interactG"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.share_love?.interactInSocial
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Bạn đã giao tiếp được với bao nhiêu bạn trong G của mình? Hãy liệt
                  kê cụ thể.
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="communicate"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.share_love?.communicateInG
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Trong kỳ vừa qua, bạn giúp đỡ bao nhiêu trường hợp khó khăn của G, của cộng đồng? Hãy liệt kê cụ thể.
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="helpInG"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.share_love?.helpInG
                      : ""
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập thông tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Các hoạt động của Quỹ học bổng có ý nghĩa gì đối với bạn? Nêu cụ thể
                  những điều học được từ những hoạt động đó.
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="operationalMeaning"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.share_love?.MeaningOfAct
                      : ""
                  }
                />
              </Form.Group>

              <br></br>
              <h3>Mục đích sử dụng học bổng</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Bạn sử dụng học bổng để làm gì?</Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="purpose"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.scholarship_purpose?.useScholarshipFor
                      : ""
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Số tiền học bổng có ý nghĩa gì đến việc duy trì cuộc sống? Mức độ
                  ảnh hưởng của học bổng đến học tập và cuộc sống của bạn không?
                </Form.Label>
                <Form.Control
                  disabled={!editable}
                  as="textarea"
                  rows={3}

                  name="meaning"
                  defaultValue={
                    Object.keys(InterView).length > 0
                      ? InterView[0]?.scholarship_purpose?.meaningOfScholarship
                      : ""
                  }
                />
              </Form.Group>
            </Form.Group>
            <Button style={{ width: "100%", marginBottom: "20px" }} type="submit" hidden={!editable}>
              Lưu
            </Button>
          </Form> :
          <div className="text-center">
            <div className="spinner-grow" style={{ width: "15rem", height: "15rem", text: "center" }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
      }
    </div>
  );
};
export default TestInterView;
