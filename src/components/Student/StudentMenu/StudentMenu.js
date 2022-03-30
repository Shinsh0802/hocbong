import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Logo from "../../../images/Logo.png";
import "./StudentMenu.css";
import { BiTask } from "react-icons/bi";
import { AiOutlineCalendar, AiOutlineNotification } from "react-icons/ai";
import { BsBarChart, BsFolder, BsPen } from "react-icons/bs";
import { TiDocument } from "react-icons/ti";
import { MdLogout } from "react-icons/md";
import { FaBars, FaSignature } from "react-icons/fa";
import { useState } from "react";
import { getViewportWidth } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { RiLockPasswordLine } from "react-icons/ri";

const StudentMenu = () => {
  const dispatch = useDispatch();
  const [mobileMenu, setMobileMenu] = useState(
    getViewportWidth() <= 767 ? false : true
  );
  const [mobileTitle, setMobileTitle] = useState(
    (() => {
      const url = window.location.href;
      if (url.includes("profile")) return "Hồ sơ phỏng vấn";
      if (url.includes("schedule")) return "Lịch phỏng vấn";
      if (url.includes("notification")) return "Thông báo";
      if (url.includes("stat")) return "Thống kê";
    })()
  );
  //check authentication
  let history = useHistory();
  if (!localStorage.getItem("user")) {
    localStorage.clear();
    history.push("/");
  } else if (
    JSON.parse(localStorage.getItem("user")).role === "bdh" ||
    JSON.parse(localStorage.getItem("user")).role === "secretary"
  )
    history.push("/Admin");
  // on log out
  function onLogout() {
    localStorage.clear();
  }
  //render
  return (
    <div style={{ display: "flex" }} className="menu">
      <div className="mobile-header">
        <div>
          <FaBars
            size={35}
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => setMobileMenu(true)}
          />
        </div>
        <div style={{ flexGrow: "1" }}>
          <h1 style={{ color: "white" }} align="center">
            {mobileTitle}
          </h1>
        </div>
      </div>
      <div
        style={{ display: `${mobileMenu ? "flex" : "none"}` }}
        className="student-sidebar"
      >
        <Link className="im" to="/home">
          <img
            src={Logo}
            width="auto"
            height="70"
            marginRight="10"
            alt="Logo"
          />
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/notification"
        >
          <AiOutlineNotification size={25} style={{ marginRight: "5px" }} />
          Thông Báo
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/stat"
        >
          <BsBarChart size={25} style={{ marginRight: "5px" }} />
          Thống Kê
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/schedule"
        >
          <AiOutlineCalendar size={25} style={{ marginRight: "5px" }} />
          Lịch Phỏng Vấn
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/profile"
        >
          <TiDocument size={25} style={{ marginRight: "5px" }} />
          Hồ Sơ Phỏng Vấn
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/commitment"
        >
          <FaSignature size={25} style={{ marginRight: "5px" }} />
          Cam kết
        </Link>
        <Link to="/" onClick={onLogout} className="my-nav-link">
          <MdLogout size={25} style={{ marginRight: "5px" }} />
          Đăng Xuất
        </Link>
      </div>
      <div
        style={{
          display: `${
            mobileMenu && getViewportWidth() <= 767 ? "block" : "none"
          }`,
        }}
        className="menu-outer"
        onClick={() => setMobileMenu(false)}
      ></div>
      <div
        style={{ display: `${mobileMenu ? "flex" : "none"}` }}
        className="student-sidebar"
        id="left"
      >
        <Link className="im" to="/home">
          <img
            src={Logo}
            width="auto"
            height="70"
            marginRight="10"
            alt="Logo"
          />
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/notification"
        >
          <AiOutlineNotification size={25} style={{ marginRight: "5px" }} />
          Thông Báo
        </Link>
        {/* <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/stat"
        >
          <BsBarChart size={25} style={{ marginRight: "5px" }} />
          Thống Kê
        </Link> */}
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/schedule"
        >
          <AiOutlineCalendar size={25} style={{ marginRight: "5px" }} />
          Lịch Phỏng Vấn
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/profile"
        >
          <BsFolder size={25} style={{ marginRight: "5px" }} />
          Hồ Sơ Phỏng Vấn
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/conclude"
        >
          <BsPen size={25} style={{ marginRight: "5px" }} />
          Kết luận phỏng vấn
        </Link>
        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/yeu-cau-sau-phong-van"
        >
          <BiTask size={25} style={{ marginRight: "5px" }} />
          Yêu cầu sau phỏng vấn
        </Link>

        <Link
          onClick={(e) => {
            setMobileTitle(e.target.textContent);
          }}
          className="my-nav-link"
          to="/student/changepassword"
        >
          <RiLockPasswordLine size={25} style={{ marginRight: "5px" }} />
          Đổi mật khẩu
        </Link>
        <Link to="/" onClick={onLogout} className="my-nav-link">
          <MdLogout size={25} style={{ marginRight: "5px" }} />
          Đăng Xuất
        </Link>
      </div>
      <div
        style={{
          display: `${
            mobileMenu && getViewportWidth() <= 767 ? "block" : "none"
          }`,
        }}
        className="menu-outer"
        onClick={() => setMobileMenu(false)}
      ></div>
    </div>
  );
};

export default StudentMenu;
