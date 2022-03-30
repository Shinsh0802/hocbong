import { Container, Form, Button } from "react-bootstrap";
import Service from "../../../../api/service";
import { useEffect, useState } from "react";
import EditButton from "../EditButton";
import Loading from "../../../shared/Loading/Loading";
import { useDispatch } from "react-redux";
import axios from "axios";
import environment from "../../../../api/environments/environment";
import { endLoading, startLoading } from "../../../shared/Loading/loadingSlice";

const WorkPlan = (p) => {
  const dispatch = useDispatch();
  //rerender
  const [rerender, setRerender] = useState(true);
  //editable
  const [editable, setEditable] = useState(false);
  const [exist, setExist] = useState(false);
  // Validation & load data
  const [congviec, setCongviec] = useState();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!p.studentId) getCongviec();
    else {
      getWorkPlanByStudentId();
    }
  }, [rerender]);

  const getWorkPlanByStudentId = async () => {
    dispatch(startLoading);
    await axios
      .get(
        `http://localhost:1995/api/work-plans/user?studentId=${p.studentId}&semester=${localStorage.semester}&schoolYear=${localStorage.schoolYear}`,
        environment.headers
      )
      .then((res) => {
        if (!res.data.data) {
          setCongviec([]);
        } else {
          var data = res.data.data;
          setCongviec([data]);
        }
        console.log(res);
      })
      .catch((err) => {
        setCongviec([]);
      })
      .finally(() => {
        dispatch(endLoading);
      });
  };

  const getCongviec = async () => {
    const service = new Service();
    dispatch(startLoading);
    service
      .get("/work-plans/all-work-plans/of-current-user")
      .then((res) => {
        const filteredData = res.data.data.filter((item) => {
          if (
            item.timePlan.semester == localStorage.getItem("semester") &&
            item.timePlan.schoolYear === localStorage.getItem("schoolYear")
          )
            return true;
          else return false;
        });
        setCongviec(filteredData);
        if (filteredData.length !== 0) {
          setExist(true);
        }
      })
      .finally((params) => {
        dispatch(endLoading);
      });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const data = new FormData(event.target);
      const work = {
        timePlan: {
          semester: parseInt(localStorage.getItem("semester")),
          schoolYear: localStorage.getItem("schoolYear"),
        },
        works: {
          target1: data.get("target1"),
          target2: data.get("target2"),
          target3: data.get("target3"),
        },
        implProcess: {
          pastToPresent: data.get("pastToPresent"),
          future: data.get("future"),
        },
      };
      setCongviec([work]);
      console.log(work);
      const service = new Service();
      dispatch(startLoading);
      if (exist) {
        console.log(congviec[0]._id);
        const url = "/work-plans/" + congviec[0]._id;
        service.patch(url, work).then((response) => {
          if (response) {
            setRerender(!rerender);
            setEditable(false);
          } else dispatch(endLoading);
        });
      } else {
        const url = "/work-plans";
        service.post(url, work).then((response) => {
          if (response) {
            setRerender(!rerender);
            setEditable(false);
          } else dispatch(endLoading);
        });
      }
    }
    setValidated(true);
  };
  return (
    <div>
      <EditButton
        hidden={JSON.parse(localStorage.getItem("user")).role !== "student"}
        title={"Kế hoạch công việc"}
        editable={editable}
        setEditable={setEditable}
        path={p.path}
      />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Công việc mong muốn - Ưu tiên 1</Form.Label>
            <Form.Control
              disabled={!editable}
              as="textarea"
              rows={3}
              required
              name="target1"
              defaultValue={congviec ? congviec[0]?.works?.target1 : ""}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập thông tin!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Công việc mong muốn - Ưu tiên 2</Form.Label>
            <Form.Control
              disabled={!editable}
              as="textarea"
              rows={3}
              required
              name="target2"
              defaultValue={congviec ? congviec[0]?.works?.target2 : ""}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập thông tin!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Công việc mong muốn - Ưu tiên 3</Form.Label>
            <Form.Control
              disabled={!editable}
              as="textarea"
              rows={3}
              required
              name="target3"
              defaultValue={congviec ? congviec[0]?.works?.target3 : ""}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập thông tin!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bạn đã làm được những gì?</Form.Label>
            <Form.Control
              disabled={!editable}
              as="textarea"
              rows={3}
              required
              name="pastToPresent"
              defaultValue={
                congviec ? congviec[0]?.implProcess?.pastToPresent : ""
              }
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập thông tin!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              Dự kiến những việc cần làm cho đến khi ra trường
            </Form.Label>
            <Form.Control
              disabled={!editable}
              as="textarea"
              rows={3}
              required
              name="future"
              defaultValue={congviec ? congviec[0]?.implProcess?.future : ""}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập thông tin!
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Group>
        <Button
          style={{ width: "100%", marginBottom: "20px" }}
          type="submit"
          hidden={!editable}
        >
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default WorkPlan;
