import Service from "../../../api/service";
import { useHistory } from "react-router-dom";
import Logo from "../../../images/Logo.png";
import { Button, Card, Form, FormSelect } from "react-bootstrap";
import { useState } from "react";
import "./Login.css";
import { getRole } from "../../../utils/utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../shared/Loading/loadingSlice";

const Login = () => {
  // Người dùng cố ý quay về trang đăng nhập dù chưa đăng xuất
  let history = useHistory();
  const dispatch = useDispatch();
  const redirect = () => {
    const role = getRole();
    if (role && role === "student") {
      history.push("/student/home");
    } else if (role && role === "admin") {
      history.push("/admin/acounts");
    } else if (role) {
      history.push("/admin");
    }
  };
  redirect();
  //
  const [checklogin, setCheckLogin] = useState(false);
  const [validated, setValidated] = useState(false);
  const [semester, setSemester] = useState("1");
  const [schoolYear, setSchoolYear] = useState("2021-2022");
  //handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let service = new Service();
    dispatch(startLoading);
    const data = new FormData(event.target);
    var user = {
      username: data.get("username"),
      password: data.get("password"),
    };
    service.login(user).then((res) => {
      if (res) {
        localStorage.setItem("semester", semester);
        localStorage.setItem("schoolYear", schoolYear);
        redirect();
        dispatch(endLoading);
      } else {
        dispatch(endLoading);
      }
    });
    // }
  };
  return (
    <div className="edit">
      {checklogin ? (
        <div className="text-center">
          <div
            className="spinner-grow"
            style={{ width: "15rem", height: "15rem", text: "center" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <Card className="box" border="dark" style={{ margin: "5%" }}>
          <div>
            <div style={{ padding: "5%" }}>
              <img
                src={Logo}
                style={{ marginBottom: "30px" }}
                alt="Logo"
                width="20%"
                className="center"
              />
              <Form onSubmit={handleSubmit} validated={validated} noValidate>
                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    type="username"
                    placeholder="Nhập tài khoản"
                    name="username"
                  />
                  <Form.Control.Feedback type="invalid">
                    Email không đúng định dạng
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required
                    name="password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập mật khẩu
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Select
                  onChange={(e) => {
                    setSemester(e.target.value);
                  }}
                  className="mb-3"
                  aria-label="Chọn học kỳ"
                >
                  <option value="1">Học kỳ 1</option>
                  <option value="2">Học kỳ 2</option>
                </Form.Select>
                <Form.Select
                  onChange={(e) => {
                    setSchoolYear(e.target.value);
                  }}
                  aria-label="Chọn năm học"
                >
                  <option>2021-2022</option>
                  <option>2022-2023</option>
                </Form.Select>
                <Button
                  type="submit"
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  Đăng nhập
                </Button>
              </Form>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
export default Login;
