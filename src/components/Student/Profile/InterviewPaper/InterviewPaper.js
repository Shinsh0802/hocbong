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
      <EditButton title={'Phi???u ph???ng v???n'} editable={editable} setEditable={setEditable} path={props.path} hidden={JSON.parse(localStorage.getItem('user')).role !== 'student'}/>
      {
        checkLoading ?
          <Form
            className="InterView-page"
            noValidate
            onSubmit={handleSubmit}
          >
            <Form.Group className="ppv">
              <h3>H???c t???p</h3>
              <div className="ppv">
                <Accordion flush>

                  <Accordion.Item eventKey="0">
                    <Accordion.Header >??i???m trung b??nh</Accordion.Header>
                    <Accordion.Body >
                      <Study data={InterView[0]?.study?.mediumScore} name="mediumScore" study={study?.mediumScore} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>S??? m??n kh??ng ?????t</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.failedSubject} name="failedSubject" study={study?.failedSubject} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>??i???m r??n luy???n</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.pointTraining} name="pointTraining" study={study?.pointTraining} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Ho???t ?????ng trong tr?????ng</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.schoolAct} name="schoolAct" study={study?.schoolAct} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>??i???u ki???n ti???ng Anh</Accordion.Header>
                    <Accordion.Body>
                      <Study data={InterView[0]?.study?.englishConditions} name="englishConditions" study={study?.englishConditions} isView={!editable} />
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>
              </div>
              <br></br>
              <h3>S???c kh???e:</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>C??n n???ng</Form.Label>
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Chi???u cao</Form.Label>
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>B???nh th?????ng g???p/m??n t??nh</Form.Label>
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>M??n th??? thao t???p luy???n</Form.Label>
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
                <Form.Label>T???n su???t</Form.Label>
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
              <h3>Th??i ?????, ?? th???c tham gia sinh ho???t Qu???</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  ?????i v???i sinh ho???t th?????ng xuy??n: l?? sinh ho???t v???i t???n su???t m???t th??ng,
                  ba th??ng, s??u th??ng t??y m???i G theo quy ?????nh qu???n l?? sinh vi??n
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  ?????i v???i sinh ho???t ?????nh k???: l?? nh???ng sinh ho???t do ch??nh G t??? ch???c, do
                  G kh??c t??? ch???c, ho???c B??H t??? ch???c ???ng v???i nh???ng n???i dung l???n trong
                  n??m theo quy ?????nh qu???n l?? sinh vi??n
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Th???c hi???n c??c c??ng vi???c ???????c giao t??? BCS G, BCTSV c???a c???ng ?????ng.
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  S??? l???n v???ng sinh ho???t, t??nh tr???ng ho???t ?????ng c??ng ??ch Qu???.
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>K??? lu???t (m???c k??? lu???t ???? nh???n t??? B??H Q??y)</Form.Label>
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <br></br>
              <h3>Chia s??? y??u th????ng</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Li???t k?? nh???ng ????ng g??p cho vi???c duy tr??, x??y d???ng cho t???p th??? G, cho
                  c???ng ?????ng m?? sinh vi??n ??ang sinh ho???t.
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  B???n bi???t t??n v?? ho??n c???nh c???a bao nhi??u b???n trong G c???a m??nh?
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  B???n c?? t????ng t??c v???i G c???a m??nh tr??n m???ng x?? h???i kh??ng?
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  B???n ???? giao ti???p ???????c v???i bao nhi??u b???n trong G c???a m??nh? H??y li???t
                  k?? c??? th???.
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Trong k??? v???a qua, b???n gi??p ????? bao nhi??u tr?????ng h???p kh?? kh??n c???a G, c???a c???ng ?????ng? H??y li???t k?? c??? th???.
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
                  Vui l??ng nh???p th??ng tin!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  C??c ho???t ?????ng c???a Qu??? h???c b???ng c?? ?? ngh??a g?? ?????i v???i b???n? N??u c??? th???
                  nh???ng ??i???u h???c ???????c t??? nh???ng ho???t ?????ng ????.
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
              <h3>M???c ????ch s??? d???ng h???c b???ng</h3>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>B???n s??? d???ng h???c b???ng ????? l??m g???</Form.Label>
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
                  S??? ti???n h???c b???ng c?? ?? ngh??a g?? ?????n vi???c duy tr?? cu???c s???ng? M???c ?????
                  ???nh h?????ng c???a h???c b???ng ?????n h???c t???p v?? cu???c s???ng c???a b???n kh??ng?
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
              L??u
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
