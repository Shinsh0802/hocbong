import React from "react";
import Service from "../../../api/service";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styleRegister.css";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const [valueFormRegister, setValueFormRegister] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const [errorFormRegister, setErrorFormRegister] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState({
    isShow: false,
    content: "",
  });

  function handleChangeValueRegister(e) {
    const { name, value } = e.target;
    setValueFormRegister({
      ...valueFormRegister,
      [name]: value,
    });
  }

  const fetchData = async () => {
    setIsLoading(true);
    let service = new Service();
    try {
      var data = {
        username: valueFormRegister.username,
        password: valueFormRegister.password,
        role: valueFormRegister.role,
      };
      service
        .register(data)
        .then((result) => {
          setValueFormRegister({
            username: "",
            password: "",
            role: "student",
          });
          if (result.status === 200 || result.status === 201) {
            setIsLoading(false);
            setShow({
              ...show,
              isShow: true,
              content: result.data?.message,
            });
          } else {
            setIsLoading(false);
            setShow({
              ...show,
              isShow: true,
              content: result.data?.message,
            });
          }
        })
        .catch((e) => {
          toast.error("Đăng ký thất bại!");
          setIsLoading(false);
          setShow({
            ...show,
            isShow: true,
            content: e.message,
          });
        });
    } catch (error) {
      if (error?.response?.status !== 200) {
        setIsLoading(false);
        setShow({
          ...show,
          isShow: true,
          content: "Lỗi hệ thống!",
        });
      }
    }
  };

  // setData(result.data);

  function handleSubmitRegister() {
    let isValue = true;

    const errorValue = {
      username: "",
      password: "",
      role: "",
    };

    if (valueFormRegister.username === "") {
      isValue = false;
      errorValue.username = "Vui lòng nhập tên tài khoản!";
    } else {
      errorValue.username = "";
    }

    // if (valueFormRegister.email === "") {
    //     isValue = false;
    //     errorValue.email = "Vui lòng nhập email của bạn";
    // } else if (!/.+@.+\.[A-Za-z]+$/.test(valueFormRegister.email)) {
    //     isValue = false;
    //     errorValue.email = "Email không hợp lệ.";
    // } else {
    //     errorValue.email = "";
    // }

    if (valueFormRegister.password === "") {
      isValue = false;
      errorValue.password = "Vui lòng nhập mật khẩu!";
    } else {
      errorValue.password = "";
    }

    if (isValue) {
      setErrorFormRegister({ ...errorValue });
      fetchData();
    } else {
      setErrorFormRegister({ ...errorValue });
    }
  }

  return (
    <div>
      <div style={{ width: "calc(100vm - 200px)" }}>
        <h1 align="center">Đăng ký tài khoản</h1>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="position-relative"
        >
          {/* <div style={{ position: "absolute", top: "0", right: "0", }}>
                    <Toast position="top-end" onClose={() => setShow({ ...show, isShow: false })} show={show.isShow} delay={3000} autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                        </Toast.Header>
                        <Toast.Body>{show.content}</Toast.Body>
                    </Toast>
                </div> */}
        </div>
        <main className="wrapper-main mb-5">
          {isLoading ? (
            <h1 align="center" style={{ marginTop: "30vh" }}>
              Loading ...
            </h1>
          ) : (
            <Container>
              <Row>
                <Col md={6} xs={12} className="m-auto mt-2">
                  <Form>
                    <Form.Group className="mb-2" controlId="formBasicUserName">
                      <Form.Label>Tên đăng nhập</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        defaultValue={valueFormRegister.username}
                        onChange={handleChangeValueRegister}
                      />

                      {errorFormRegister.username.length > 0 && (
                        <Form.Text className="text-muted ">
                          {errorFormRegister.username}
                        </Form.Text>
                      )}
                    </Form.Group>
                    {/* <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                onChange={handleChangeValueRegister}
                                            />
                                            {errorFormRegister.email.length > 0 && (
                                                <Form.Text className="text-muted ">
                                                    {errorFormRegister.email}
                                                </Form.Text>
                                            )}

                                        </Form.Group> */}

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        defaultValue={valueFormRegister.password}
                        onChange={handleChangeValueRegister}
                      />
                      {errorFormRegister.password.length > 0 && (
                        <Form.Text className="text-muted ">
                          {errorFormRegister.password}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Vai trò</Form.Label>
                      <Form.Control
                        as="select"
                        name="role"
                        onChange={handleChangeValueRegister}
                        defaultValue={valueFormRegister.role}
                      >
                        <option value="student">Sinh viên</option>
                        <option value="leader">Trưởng G</option>
                        <option value="ctsv">Ban công tác sinh viên</option>
                        <option value="bdh">Ban điều hành</option>
                      </Form.Control>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={handleSubmitRegister}
                      style={{ marginTop: 15, width: "100%" }}
                    >
                      Đăng ký
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          )}
        </main>
      </div>
    </div>
  );
};

export default RegisterPage;
