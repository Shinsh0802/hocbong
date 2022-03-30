import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Service from "../../../api/service";
import { endLoading, startLoading } from "../../shared/Loading/loadingSlice";
const ChangePassword = () => {
  const dispatch = useDispatch()
  const handleUpdate = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const data = {
      password: formData.get("password"),
      newPassword: formData.get("newPassword"),
    };
    var service = new Service();
    console.log(data);
    const url = "/users/change-password/user-account";
    dispatch(startLoading)
    service
      .patch(url, data)
      .then((response) => {
        console.log("abc");
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => { dispatch(endLoading) })
  };
  return (
    <div style={{maxWidth: "500px", margin: "auto"}}>
        <div class="form" style={{marginTop: "10%"}}>
          <h1 align="center">Đổi mật khẩu</h1>
          <Form noValidate onSubmit={handleUpdate}>
            {/* <Form> */}
            <Form.Group
              className="mb-1"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mật khẩu hiện tại</Form.Label>
              <Form.Control
                type="password"
                rows={1}
                required
                name="password"
                // defaultValue={
                //   Object.keys(acounts).length > 0 ? acounts[0]?.password : ""
                // }
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập thông tin!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-1"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                rows={1}
                required
                name="newPassword"
                // defaultValue={
                //   Object.keys(financial).length > 0 ? financial[0]?.solution : ""
                // }
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập thông tin!
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              style={{ width: "100%", marginTop: "20px" }}
              type="submit"
              // hidden={!editable}
            >
              Cập nhật
            </Button>
          </Form>
        </div>
    </div>
  );
};
export default ChangePassword;
