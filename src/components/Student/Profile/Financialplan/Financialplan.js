import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Service from "../../../../api/service";
import EditButton from "../EditButton";
import axios from "axios";
import environment from "../../../../api/environments/environment";
import { endLoading, startLoading } from "../../../shared/Loading/loadingSlice";

const Financialplan = (p) => {
  const dispatch = useDispatch();
  //rerender
  const [rerender, setRerender] = useState(true);
  //editable
  const [editable, setEditable] = useState(false);
  //exist
  const [exist, setExist] = useState(false);
  // Validation & load data
  const [financial, setFinancial] = useState([]);
  useEffect(() => {
    if (!p.studentId) getFinancial();
    else {
      getFinancialByStudentId();
    }
  }, [rerender]);

  const getFinancialByStudentId = async () => {
    dispatch(startLoading);
    await axios
      .get(
        `http://localhost:1995/api/financial-plans/user?studentId=${p.studentId}&semester=${localStorage.semester}&schoolYear=${localStorage.schoolYear}`,
        environment.headers
      )
      .then((res) => {
        if (!res.data.data) {
          setFinancial([]);
        } else {
          var data = res.data.data;
          setFinancial([data]);
        }
        console.log(res);
      })
      .catch((err) => {
        setFinancial([]);
      })
      .finally(() => {
        dispatch(endLoading);
      });
  };

  const getFinancial = async () => {
    try {
      var service = new Service();
      dispatch(startLoading);
      service
        .get("/financial-plans/all-financial-plans/of-current-user")
        .then((res) => {
          const filteredData = res.data.data.filter((item) => {
            if (
              item.timePlan.semester == localStorage.getItem("semester") &&
              item.timePlan.schoolYear === localStorage.getItem("schoolYear")
            )
              return true;
            else return false;
          });
          setFinancial(filteredData);
          if (filteredData.length !== 0) {
            setExist(true);
          }
        })
        .finally((params) => {
          dispatch(endLoading);
        });
    } catch (error) {
      setFinancial([]);
      dispatch(endLoading);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        timePlan: {
          semester: parseInt(localStorage.getItem("semester")),
          schoolYear: localStorage.getItem("schoolYear"),
        },
        receipts: {
          costOfLiving: parseInt(formData.get("costOfLiving")),
          tuition: parseInt(formData.get("tuition")),
          otherCosts: parseInt(formData.get("otherCosts")),
        },
        expenditures: {
          familyAllowance: parseInt(formData.get("familyAllowance")),
          salaryPartTime: parseInt(formData.get("salaryPartTime")),
          loan: parseInt(formData.get("loan")),
          otherEx: parseInt(formData.get("otherEx")),
        },
        inDetail: formData.get("inDetail"),
        solution: formData.get("solution"),
      };
      setFinancial([{ ...financial[0], ...data }]);
      var service = new Service();
      dispatch(startLoading);
      if (exist) {
        const url = "/financial-plans/" + financial[0]._id;
        service.patch(url, data).then((response) => {
          if (response) {
            setRerender(!rerender);
            setEditable(false);
          } else dispatch(endLoading);
        });
      } else {
        const url = "/financial-plans";
        service.post(url, data).then((response) => {
          if (response) {
            setRerender(!rerender);
            setEditable(false);
          } else dispatch(endLoading);
        });
      }
    }
  };

  return (
    <div>
      <EditButton
        hidden={JSON.parse(localStorage.getItem("user")).role !== "student"}
        title={"K??? ho???ch t??i ch??nh"}
        editable={editable}
        setEditable={setEditable}
        path={p.path}
      />
      <Form className="financialplan-page" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              Sinh ho???t h??ng th??ng (ti???n nh??, ti???n ??n, ti???n ???,???)
            </Form.Label>
            <Form.Control
              disabled={!editable}
              as="input"
              type="Number"
              rows={3}
              required
              name="costOfLiving"
              defaultValue={
                Object.keys(financial).length > 0
                  ? financial[0]?.receipts?.costOfLiving
                  : ""
              }
            />
            <Form.Control.Feedback type="invalid">
              Vui l??ng nh???p th??ng tin!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ti???n h???c ph??</Form.Label>
            <Form.Control
              disabled={!editable}
              as="input"
              type="Number"
              rows={3}
              required
              name="tuition"
              defaultValue={
                Object.keys(financial).length > 0
                  ? financial[0]?.receipts?.tuition
                  : ""
              }
            />
            <Form.Control.Feedback type="invalid">
              Vui l??ng nh???p th??ng tin!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Chi ph?? kh??c</Form.Label>
            <Form.Control
              disabled={!editable}
              as="input"
              type="Number"
              rows={3}
              required
              name="otherCosts"
              defaultValue={
                Object.keys(financial).length > 0
                  ? financial[0]?.receipts?.otherCosts
                  : ""
              }
            />
            <Form.Control.Feedback type="invalid">
              Vui l??ng nh???p th??ng tin!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>T???ng chi</Form.Label>
            <Form.Control
              as="input"
              type="Number"
              rows={3}
              // disabled
              defaultValue={
                Object.keys(financial).length > 0
                  ? Number(financial[0]?.receipts?.costOfLiving) +
                    Number(financial[0]?.receipts?.tuition) +
                    Number(financial[0]?.receipts?.otherCosts)
                  : ""
              }
            />
            <Form.Control.Feedback type="invalid">
              Vui l??ng nh???p th??ng tin!
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Group>
        <br></br>
        <h3>Ngu???n thu:</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tr??? c???p t??? gia ????nh</Form.Label>
          <Form.Control
            disabled={!editable}
            as="input"
            type="Number"
            rows={3}
            required
            name="familyAllowance"
            defaultValue={
              Object.keys(financial).length > 0
                ? financial[0]?.expenditures?.familyAllowance
                : ""
            }
          />
          <Form.Control.Feedback type="invalid">
            Vui l??ng nh???p th??ng tin!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Thu nh???p t??? vi???c l??m th??m</Form.Label>
          <Form.Control
            disabled={!editable}
            as="input"
            type="Number"
            rows={3}
            required
            name="salaryPartTime"
            defaultValue={
              Object.keys(financial).length > 0
                ? financial[0]?.expenditures?.salaryPartTime
                : ""
            }
          />
          <Form.Control.Feedback type="invalid">
            Vui l??ng nh???p th??ng tin!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>C??c kho???n vay</Form.Label>
          <Form.Control
            disabled={!editable}
            as="input"
            type="Number"
            rows={3}
            required
            name="loan"
            defaultValue={
              Object.keys(financial).length > 0
                ? financial[0]?.expenditures?.loan
                : ""
            }
          />
          <Form.Control.Feedback type="invalid">
            Vui l??ng nh???p th??ng tin!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Kh??c</Form.Label>
          <Form.Control
            disabled={!editable}
            as="input"
            type="Number"
            rows={3}
            required
            name="otherEx"
            defaultValue={
              Object.keys(financial).length > 0
                ? financial[0]?.expenditures?.otherEx
                : ""
            }
          />
          <Form.Control.Feedback type="invalid">
            Vui l??ng nh???p th??ng tin!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>T???ng thu</Form.Label>
          <Form.Control
            as="input"
            type="Number"
            rows={3}
            disabled
            defaultValue={
              Object.keys(financial).length > 0
                ? Number(financial[0]?.expenditures?.familyAllowance) +
                  Number(financial[0]?.expenditures?.salaryPartTime) +
                  Number(financial[0]?.expenditures?.loan) +
                  Number(financial[0]?.expenditures?.otherEx)
                : ""
            }
          />
        </Form.Group>
        <br></br>
        <h3>Th???c tr???ng v?? ph????ng h?????ng:</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>T??nh tr???ng c??? th???(Thi???u/d??/????? bao nhi??u) </Form.Label>
          <Form.Control
            disabled={!editable}
            as="textarea"
            rows={3}
            required
            name="inDetail"
            defaultValue={
              Object.keys(financial).length > 0 ? financial[0]?.inDetail : ""
            }
          />
          <Form.Control.Feedback type="invalid">
            Vui l??ng nh???p th??ng tin!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            Ph????ng ??n gi???i quy???t t??nh tr???ng t??i ch??nh c???a b???n th??n
          </Form.Label>
          <Form.Control
            disabled={!editable}
            as="textarea"
            rows={3}
            required
            name="solution"
            defaultValue={
              Object.keys(financial).length > 0 ? financial[0]?.solution : ""
            }
          />
          <Form.Control.Feedback type="invalid">
            Vui l??ng nh???p th??ng tin!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          style={{ width: "100%", marginBottom: "20px" }}
          type="submit"
          hidden={!editable}
        >
          C???p nh???t
        </Button>
      </Form>
    </div>
  );
};

export default Financialplan;
