import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Service from "../../../../api/service";
import EditButton from "../EditButton";
import axios from "axios";
import environment from "../../../../api/environments/environment";
import { endLoading, startLoading } from "../../../shared/Loading/loadingSlice";

const initialProfile = {
  fullName: "",
  dateOfBirth: "",
  university: "",
  major: "",
  phoneNumber: "",
  address: "",
  group: "Hà Nội",
  family: "",
  teams: "",
  gender: "Nam",
  email: "",
  religion: "",
  ethnicity: "",
};
//component
const Basic = (props) => {
  const [profile, setProfile] = useState(initialProfile);
  const [exist, setExist] = useState(true);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch()
  //lấy dữ liệu
  useEffect(() => {
    if(!props.studentId) getProfile();
    else{
      getProfileByStudentId();
    }
  }, []);
  //handle change
  const handleChange = (e) => {
    const value = e.target ? e.target.value : e.value;
    const field = e.target.name;
    let newData = { ...profile };
    newData[field] = value;
    setProfile(newData);
  };

  const getProfileByStudentId = async () => {
    dispatch(startLoading)
    const service = new Service()
    await service.get(`/profiles/student-id/${props.studentId}`).then(res => {
      if (!res.data.data) {
        setProfile([]);
      } else {
        var data = res.data.data;
        setProfile(data);
      }
      console.log(res);
    }).catch(err => {
      setProfile([]);
    }).finally(() => { dispatch(endLoading) })
  }

  // hàm lấy dữ liệu
  const getProfile = async () => {
    const service = new Service();
    dispatch(startLoading)
    try {
      await service
        .get("/profiles/current-user-profile")
        .then(async (response) => {
          if (response) {
            localStorage.setItem('profile', true)
            setProfile(response.data.data);
          }

        })
        .catch((e) => {
          const msg = e.response.data.message;
          if (msg === "Không tìm thấy profile của bạn") setExist(false);
        })
        .finally((params) => {
          dispatch(endLoading)
        })
    } catch (e) {
      dispatch(endLoading)
    }
  };
  //submit
  const handleSubmit = (event) => {
    let data;
    try {
      data = { ...profile, teams: parseInt(profile.teams) };
    } catch (e) {
      data = profile;
    }
    const service = new Service();
    dispatch(startLoading)
    event.preventDefault();
    if (exist) {
      service.put("/profiles/update-current-user-profile", data)
      .then((res) => {
        if (res) 
          localStorage.setItem('profile',true)
      })
      .finally((params) => {
        dispatch(endLoading)
      })
    } else {
      service.post("/profiles", data)
      .then((res) => {
        if (res) 
          localStorage.setItem('profile',true)
      })
      .finally((params) => {
        dispatch(endLoading)
      })
    }
  };

  return (
    <div>
      <EditButton
        hidden={JSON.parse(localStorage.getItem('user')).role !== 'student'}
        title={"Thông tin cơ bản"}
        editable={editable}
        setEditable={setEditable}
        path={props.path}
      />
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                disabled={!editable}
                name="fullName"
                defaultValue={profile ? profile?.fullName : ""}
                as="textarea"
                rows={1}
                required
                placeholder=" Phải nhập tối thiểu 5 ký tự!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                disabled={!editable}
                name="dateOfBirth"
                value={
                  profile && profile.dateOfBirth
                    ? new Date(profile.dateOfBirth).toISOString().slice(0, 10)
                    : null
                }
                type="date"
                rows={1}
                required
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Giới tính</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e)}
                aria-label="Default select example"
                disabled={!editable}
                name="gender"
              >
                <option value="Nam" selected={profile.gender==='Nam'?"selected":""}>Nam</option>
                <option value="Nữ" selected={profile.gender==='Nữ'?"selected":""}>Nữ</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Quê quán</Form.Label>
              <Form.Control
                disabled={!editable}
                name="address"
                defaultValue={profile ? profile?.address : ""}
                as="textarea"
                rows={1}
                required
                placeholder="Phải nhập tối thiểu 5 ký tự!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Dân tộc</Form.Label>
              <Form.Control
                disabled={!editable}
                name="ethnicity"
                defaultValue={profile ? profile?.ethnicity : ""}
                as="textarea"
                rows={1}
                required
                placeholder="Phải nhập tối thiểu 2 ký tự!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Tôn giáo</Form.Label>
              <Form.Control
                disabled={!editable}
                name="religion"
                defaultValue={profile ? profile?.religion : ""}
                as="textarea"
                rows={1}
                required
                placeholder="Phải nhập tối thiểu 5 ký tự!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                disabled={!editable}
                name="phoneNumber"
                defaultValue={profile ? profile?.phoneNumber : ""}
                as="textarea"
                rows={1}
                required
                placeholder="Phải nhập tối thiểu 8 chữ số!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Địa chỉ Email</Form.Label>
              <Form.Control
                disabled={!editable}
                name="email"
                defaultValue={profile ? profile?.email : ""}
                as="textarea"
                rows={1}
                required
                placeholder="Phải nhập đúng định dạng email của bạn!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Hoàn cảnh gia đình</Form.Label>
              <Form.Control
                disabled={!editable}
                name="family"
                defaultValue={profile ? profile?.family : ""}
                as="textarea"
                rows={4}
                required
                placeholder="Phải nhập tối thiểu 20 ký tự!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <h2>Thông tin học vấn: </h2>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Ngành</Form.Label>
              <Form.Control
                disabled={!editable}
                name="major"
                defaultValue={profile ? profile?.major : ""}
                as="textarea"
                rows={1}
                required
                placeholder="Phải nhập tối thiểu 5 ký tự!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Trường</Form.Label>
              <Form.Control
                disabled={!editable}
                name="university"
                defaultValue={profile ? profile?.university : ""}
                as="textarea"
                rows={1}
                required
                placeholder="Phải nhập tối thiểu 5 ký tự!"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <h2>Thông tin học bổng: </h2>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Thế hệ G</Form.Label>
              <Form.Control
                disabled={!editable}
                name="teams"
                defaultValue={profile ? profile?.teams : ""}
                as="textarea"
                placeholder="Phải nhập số trong khoảng từ 1 đến 15"
                rows={1}
                required
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Cộng đồng</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e)}
                aria-label="Default select example"
                defaultValue={profile.group}
                disabled={!editable}
                name="group"
              >
                <option value="Hà Nội" selected={profile.group==='Hà Nội'?"selected":""}>Hà Nội</option>
                <option value="Huế" selected={profile.group==='Huế'?"selected":""}>Huế</option>
                <option value="Đà Nẵng" selected={profile.group==='Đà Nẵng'?"selected":""}>Đà Nẵng</option>
                <option value="Hồ Chí Minh" selected={profile.group==='Hồ Chí Minh'?"selected":""}>Hồ Chí Minh</option>
                <option value="Cần Thơ" selected={profile.group==='Cần Thơ'?"selected":""}>Cần Thơ</option>
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              className="mb-3"
              style={{ width: "100%" }}
              onClick={() => setEditable(false)}
              hidden={!editable}
            >
              Lưu
            </Button>
          </Form>
    </div>
  );
};

export default Basic;
