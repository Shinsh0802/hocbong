import StudentList from "./StudentList/StudentTable";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import { useDebugValue, useEffect, useState } from "react";
import Service from "../../../api/service";
import style from "./style.module.css";
import ProfilePage from "../Profile/ProfileRouter";
import { RiFilterLine } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { getGMax } from "../../../utils/utils";
import Filter from "../../shared/Filter/Filter";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../shared/Loading/loadingSlice";

const StudentListPage = () => {
  const dispatch = useDispatch()
  let { path } = useRouteMatch();
  const [isLoading, setisLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [congDong, setCongDong] = useState();
  const [G, setG] = useState();
  console.log("render")
  // get data
  useEffect(() => {
    (async () => {
      dispatch(startLoading)
      const url = "/profiles/get-all-students/list-students?size=50"
      const service = new Service(); 
      await service.get(url).then(res => {
        if (!res.data.data.docs) {
          setStudents([]);
          setisLoading(false);
        } else {
          setStudents(res.data.data.docs)
          setisLoading(false);
        }
      }).catch(err => {
        if (err) {
          setStudents([]);
          alert("Lỗi hệ thống!!!");
          console.log(err);
        }
      }).finally(() => { dispatch(endLoading) })
    })()
  }, []);
  // handle submit
  const handleSubmit = async (filterG, G, filterCongDong, congDong) => {
    setisLoading(true);
    try {
      let url = "/filter-students?";
      if (filterG)
        url += `teams=G${G}&`
      if (filterCongDong)
        url += `group=${congDong}`
      const service = new Service();
      const res = await service.get(url);
      setStudents(
        res.data.students.data.sort((a, b) => (a.fullName.split(' ').slice(-1).join(' ').localeCompare(b.fullName.split(' ').slice(-1).join(' '))))
      );
      setisLoading(false);
    } catch (error) {
      alert("Lỗi hệ thống!")
      setisLoading(false);
    }
  }
  //render
  return (
    <div style={{ width: "100%" }}>
      <h1 align="center">Danh sách sinh viên</h1>
      {/* Lọc */}
      <Filter setG={setG} setCongDong={setCongDong}/>
      {/* Danh sách sinh viên */}
      <div id={style.listTable} >
        {!isLoading ?
          <StudentList
            student={students}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            setisLoading={setisLoading}
          />
          :
          <div className="text-center">
            <div className="spinner-grow" style={{ width: "15rem", height: "15rem", text: "center" }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default StudentListPage;
