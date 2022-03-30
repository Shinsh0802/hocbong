import { useEffect, useState } from "react";
import style from "./style.module.css";
import Service from "../../../api/service";
import Acount from "./Acount";
import { Form, Button } from "react-bootstrap";

const Acounts = () => {
  // COMPONENT STATE
  const admin = JSON.parse(localStorage.getItem("user")).role === "admin";
  const [filterG, setfilterG] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [acounts, setAcounts] = useState([]);
  const [filterCongDong, setfilterCongDong] = useState(false);
  const [filterChucVu, setFilterChucVu] = useState(false);
  const [congDong, setcongDong] = useState("Huế");
  const [chucVu, setChucVu] = useState("student");
  const [G, setG] = useState(15);
  const [congdong, setCongdong] = useState("Hồ Chí Minh");
  const [hinhthuc, setHinhthuc] = useState("Phỏng vấn cấp cộng đồng");

  // testRequirements.sort((a, b) => {
  //   const tenA = a.hoTen.split(" ").slice(-1).join(" ");
  //   const tenB = b.hoTen.split(" ").slice(-1).join(" ");
  //   return tenA.localeCompare(tenB);
  // });
  const [filteredAcounts, setfilteredAcounts] = useState(acounts);
  const [editable, setEditable] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);

  //
  const handleDelete = (e) => {
    const service = new Service();
    service.delete(`/users/${e.target.id}`);
    console.log(e.target.id);
    console.log("abc");
    let newData = [...acounts];
    for (let i = 0; i < acounts.length; i++)
      if (newData[i].time === e.target.id) {
        newData.splice(i, 1);
        break;
      }
    setAcounts(newData);
    getAcounts();
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };
  const getAcounts = async (data) => {
    var service = new Service();
    try {
      await service
        .get("/users/all-account?page=0&size=1000")
        .then((res) => {
          let data = res.data.data.docs;
          setAcounts(data);
          if (!data) {
            setAcounts([]);
            setCheckLoading(true);
          } else {
            setAcounts([...data]);
            console.log(data);
            setCheckLoading(true);
          }
        })
        .catch((err) => {
          setCheckLoading(true);
        });
    } catch (error) {
      setAcounts([]);
      setCheckLoading(true);
    }
  };
  const handleFilter = () => {
    setfilteredAcounts(
      acounts.filter((acount) => {
        // console.log(acount);
        // console.log(acount.teams);
        // console.log(G);
        if (
          (!filterG || acount.teams === G) &&
          (!filterChucVu || acount.role == chucVu) &&
          (!filterCongDong || acount.group === congDong)
        )
          return true;
        else return false;
      })
    );
  };

  useEffect(() => {
    getAcounts();
    handleFilter();
  }, []);
  return (
    <div>
      {checkLoading ? (
        <div>
          <h1 align="center">Quản lý tài khoản</h1>
          {/* <RegisterPage /> */}
          {/* Filter */}

          <div className={style.filterBox}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Check box lọc theo G */}
              <input
                onChange={() => setfilterG(!filterG)}
                className={style.checkBox}
                type="checkbox"
              />
              <div>Theo G</div>
              {/* Input lọc theo G */}
              <input
                style={{ height: "30px", marginLeft: "10px" }}
                type="number"
                min="1"
                max="15"
                defaultValue="15"
                onChange={(e) => setG(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Check box lọc theo cộng đồng */}
              <input
                onChange={() => setfilterCongDong(!filterCongDong)}
                className={style.checkBox}
                type="checkbox"
              />
              {/* Select cộng đồng */}
              <div>Cộng đồng</div>
              <select
                onChange={(e) => {
                  setcongDong(e.target.value);
                }}
                style={{ height: "30px", marginLeft: "10px" }}
              >
                <option>Huế</option>
                <option>Đà Nẵng</option>
                <option>Hồ Chí Minh</option>
                <option>Cần Thơ</option>
                <option>Hà Nội</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Check box lọc theo chức vụ */}
              <input
                onChange={() => setFilterChucVu(!filterChucVu)}
                className={style.checkBox}
                type="checkbox"
              />
              {/* Select chức vụ */}
              <div>Chức vụ</div>
              <select
                onChange={(e) => {
                  setChucVu(e.target.value);
                }}
                style={{ height: "30px", marginLeft: "10px" }}
              >
                <option value="student">Sinh viên</option>
                <option value="leader">Trưởng G</option>
                <option value="bdh">Ban điều hành</option>
                <option value="secretary">Thư ký</option>
                <option value="ctsv">Trưởng CTSV</option>
              </select>
            </div>
            <button onClick={handleFilter}>Lọc</button>
            {/* Chỉnh sửa */}
          </div>
          {/* Table */}
          <div style={{ width: "calc(100vh-250px)", overflowX: "scroll" }}>
            <table className={style.table}>
              <tr className={style.thead} align="center">
                <td width="140">Họ và tên</td>
                <td width="100">Thuộc G</td>
                <td width="140">Cộng đồng</td>
                <td width="140">Chức vụ</td>
                {editable ? (
                  <>
                    <td width="140">Mật khẩu hiện tại</td>
                    <td width="120">Mật khẩu mới</td>
                  </>
                ) : (
                  <>
                    <td width="140">Tên tài khoản</td>
                    <td width="120">Mật khẩu</td>
                    <td width="100"></td>
                  </>
                )}
              </tr>
              {filteredAcounts.map((acount) => {
                return (
                  <Acount
                    editable={editable}
                    acount={acount}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div
            className="spinner-grow"
            style={{ width: "15rem", height: "15rem", text: "center" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Acounts;
