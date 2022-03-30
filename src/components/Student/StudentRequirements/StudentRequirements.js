import React, { useEffect, useState } from "react";
import Service from "../../../api/service";
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../shared/Loading/loadingSlice';
import style from "./../../Admin/Requirements/style.module.css"
import RequirementItem from "./RequirementItem"
const StudentRequirements = (p) => {
  //editable
  const dispatch = useDispatch()
  const service = new Service();
  const [checkLoading, setCheckLoading] = useState(true);
  const [requirements, setrequirements] = useState([])

  const getData = () => {
    let url = "/after-interview/by-student-id"
    setCheckLoading(false);
    dispatch(startLoading)
    service
      .get(url)
      .then(async (res) => {
        setCheckLoading(true);
        console.log(res);
        if (res.status === 201) {
          setrequirements(res.data.data);
        }
        setCheckLoading(true);

      })
      .catch((e) => {
        setCheckLoading(true);
        console.log(e);
      }).finally(() => { dispatch(endLoading) });

  }
  useEffect(() => {
    getData();
  }, [])
  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return { width };
  }

  const viewPort = useViewport();

  const tableWidth = (viewPort.width >= 1024) ? "100%" : "calc(100vh-250px)"

  return (
    <div>
      <div className="noti-card">

        <h1 style={{ "text-align": "center" }}>Yêu cầu sau phỏng vấn</h1>
        {checkLoading ?
          <div style={{ width: { tableWidth }, overflowX: "scroll" }}>
            <table className={style.table} style={{ width: tableWidth }}>
              <tr className={style.thead} align="center">
                <td width="140">Họ và tên</td>
                <td width="100">Thuộc G</td>
                <td width="140">Cộng đồng</td>
                <td width="300">Nội dung yêu cầu</td>
                <td width="120">Deadline</td>
                <td width="150">Tiến độ</td>
              </tr>
              {requirements.sort(function (a, b) {
                if (a.studentName.toLowerCase() < b.studentName.toLowerCase()) return -1;
                if (a.studentName.toLowerCase() > b.studentName.toLowerCase()) return 1;
                return 0;
              }).map(
                (requirement) => {
                  const index = requirements.findIndex((data) => {
                    return data === requirement
                  })

                  return (<RequirementItem
                    key={index}
                    index={index}
                    requirement={requirement}
                  />)
                }

              )}
            </table>
          </div>
          : <div className="text-center">
            <div className="spinner-grow" style={{ width: "15rem", height: "15rem", text: "center" }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>


        }
      </div>

    </div>
  )
}

export default StudentRequirements
