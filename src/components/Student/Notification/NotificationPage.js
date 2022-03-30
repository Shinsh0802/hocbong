import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import renderSlate from "./TextEditor/RenderSlate";
import RichTextExample from "./TextEditor/RichTextExample";
import "./style.css";
import Service from "../../../api/service";
import { formatTime, getRole } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../shared/Loading/loadingSlice";
const NotificationPage = () => {
  const dispatch = useDispatch();
  const role = getRole();
  const editable = role === "bdh" || role === "secretary";
  console.log(editable);
  //state
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);

  function post(postObject) {
    try {
      const service = new Service();
      service.post("/notify", postObject);
      getNotifications();
      console.log(data);

      setCheckLoading(true);
    } catch (error) {
      alert(error.message);
    }
    setData([postObject, ...data]);
    console.log(data);
  }
  //renderget all notification
  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const service = new Service();
    dispatch(startLoading);
    await service
      .get("/notify?size=10")
      .then((res) => {
        let items = res.data.data.docs;
        setData(items);
        setCheckLoading(true);
        if (!res.data.data.docs) {
          setNotification([]);
          setCheckLoading(true);
        } else {
          setNotification([...JSON.parse(res.data.data.docs)]);
          setCheckLoading(true);
        }
      })
      .catch((err) => {
        setCheckLoading(true);
      })
      .finally(() => {
        dispatch(endLoading);
      });
  };
  //function
  const handleDelete = (e) => {
    const service = new Service();
    service.delete(`/notify/${e.target.id}`);
    let newData = [...data];
    for (let i = 0; i < data.length; i++)
      if (newData[i].time === e.target.id) {
        newData.splice(i, 1);
        break;
      }
    setData(newData);
    getNotifications();
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };
  return (
    <div style={{maxWidth: "700px", margin: "auto"}} classname="Noti">
      <h1 align="center" className="mb-3">
        {editable ? "Thông báo" : "Thông báo"}
      </h1>
      <h4 hidden align="center" style={{ marginTop: "30vh", color: "gray" }}>
        Không có thông báo mới
      </h4>
      {editable ? (
        <RichTextExample
          nameplaceholder="Nhập nội dung thông báo"
          nameButton="Đăng"
          post={post}
        />
      ) : null}
      {data.length !== 0
        ? data?.map((obj) => {
            return (
              <div className="noti-card">
                <p>
                  <b
                    style={{
                      color:
                        `${obj.type}` == "Thường"
                          ? "blue"
                          : `${obj.type}` == "Khẩn"
                          ? "red"
                          : "Orange",
                    }}
                  >
                    {obj.type}
                  </b>
                </p>
                {renderSlate(JSON.parse(obj.content))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#bfbfbf", fontSize: "1.2em" }}>
                    {formatTime(new Date(obj.createdAt), "en-GB")}
                  </span>
                  {editable ? (
                    <Button
                      hidden={!editable}
                      onClick={handleDelete}
                      id={obj._id}
                      variant="danger"
                    >
                      Hủy thông báo
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default NotificationPage;
