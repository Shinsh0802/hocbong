import { useEffect, useState } from "react";
import Service from "../../../api/service";
import { formatDate, formatTime } from "../../../utils/utils";
import { formatDate2 } from "../../../utils/utils";
import "./Conclude.css";
// import RenderConclude from "./EditorContent/RenderConclude";
// import ConcludeExam from "./EditorContent/ConcludeExam";
import { Form, Button } from "react-bootstrap";

const Conclude = () => {
  const isBTK = JSON.parse(localStorage.getItem("user")).role === "secretary";
  const [data, setData] = useState([]);
  const [conclude, setConclude] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [group, setCongdong] = useState("Hồ Chí Minh");
  const [typeMeeting, setHinhthuc] = useState("Phỏng vấn cấp cộng đồng");

  //renderget all Conclude
  useEffect(() => {
    getConcludes();
  }, []);

  const getConcludes = async () => {
    const service = new Service();
    await service
      .get("/result-interview?size=1000") //data test
      .then((res) => {
        let items = res.data.data.docs;
        var curDate = new Date();
        // var dateCurrent = formatTime(new Date(curDate), "en-GB");
        var dateCurrent = formatDate2(new Date(curDate));
        // console.log(dateCurrent);
        setData(items);
        setCheckLoading(true);
        if (!res.data.data.docs) {
          setConclude([]);
          setCheckLoading(true);
        } else {
          setConclude([res.data.data.docs]);
          setCheckLoading(true);
        }
      })
      .catch((err) => {
        setCheckLoading(true);
      });
  };
  const handleSubmit = async (event) => {
    // console.log("abc");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setCheckLoading(false);
      event.preventDefault();
      var curDate = new Date();
      const formData = new FormData(event.target);
      // console.log(formData);
      // let result = "google.com";
      const ketluan = {
        dateInterview: formData.get("dateInterview"),
        group: formData.get("group"),
        typeMeeting: formData.get("typeMeeting"),
        result: formData.get("result"),
      };
      setData([ketluan]);
      console.log(ketluan);
      console.log("testdata");
      const url = "/result-interview";
      const service = new Service();
      service
        .post(url, ketluan)
        .then((response) => {
          setCheckLoading(true);
          console.log(ketluan);
          console.log("post thanh cong");
          getConcludes();
        })
        .catch((error) => {
          alert(error.message);
          setCheckLoading(true);
        });
    }
  };
  //function
  const handleDelete = (e) => {
    const service = new Service();
    service.delete(`/result-interview/${e.target.id}`);
    // console.log(e.target.id);
    let newData = [...data];
    for (let i = 0; i < data.length; i++)
      if (newData[i].time === e.target.id) {
        newData.splice(i, 1);
        break;
      }
    setData(newData);
    getConcludes();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 600);



    
  };
  return (
    <div style={{maxWidth: "700px", margin: "auto"}} >
      <h1 align="center" className="mb-3">
        {isBTK ? "Quản lý kết luận" : "Kết luận"}
      </h1>
      <h4 hidden align="center" style={{ marginTop: "30vh", color: "gray" }}>
        Không có kết luận mới
      </h4>

      {isBTK ? (
        <div class="form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Ngày phỏng vấn</Form.Label>
              <Form.Control
                name="dateInterview"
                type="date"
                rows={1}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-1"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Cộng đồng</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCongdong(e.target.value);
                }}
                aria-label="Chọn cộng đồng"
                name="group"
              >
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà nẵng</option>
                <option value="Huế">Huế</option>
                <option value="Cần Thơ">Cần thơ</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-1"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Hình thức</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setHinhthuc(e.target.value);
                }}
                aria-label="Chọn hình thức phỏng vấn"
                name="typeMeeting"
              >
                <option value="Phỏng vấn cấp cộng đồng">
                  Phỏng vấn cấp cộng đồng
                </option>
                <option value="Phỏng vấn cấp BDH">Phỏng vấn cấp BDH</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Link</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                required
                name="result"
                value={conclude ? conclude[0]?.result : ""}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập thông tin!
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              style={{ width: "100%", marginBottom: "20px" }}
              type="submit"
            >
              Đăng
            </Button>
            {/* {isBDH ? (

            ) : null} */}
          </Form>
        </div>
      ) : null}

      {data.length !== 0
        ? data?.map((obj) => {
            // console.log(obj);
            return (
              <div className="noti-card">
                <p>
                  <b>Cộng đồng: </b>
                  {obj.group}
                </p>
                <p>
                  <b>Hình thức: </b>
                  {obj.typeMeeting}
                </p>
                <p>
                  <b>Link: </b>
                  <a href={obj.result}>{obj.result}</a>
                </p>
                <p>
                  <b>Thời gian phỏng vấn: </b>
                  {formatDate(new Date(obj.dateInterview), "en-GB")}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default Conclude;
