import { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Logo from "../../../images/Logo.png";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Nav } from "react-bootstrap";
import "./TopMenu.css";
import { AiOutlineCalendar, AiOutlineNotification } from "react-icons/ai";
import { BsBarChart, BsPerson, BsCaretLeft } from "react-icons/bs";
import { TiDocument } from "react-icons/ti";
import { MdLogout, MdOutlineSchool } from "react-icons/md";

const MyNavbar = () => {
  const [showmenu, setShowmenu] = useState(false);
  let history = useHistory();
  let { url } = useRouteMatch();
  if (!localStorage.getItem("user")) {
    localStorage.clear();
    history.push("/");
  } else if (JSON.parse(localStorage.getItem("user")).role === "bdh")
    history.push("/Admin");
  function onLogout() {
    localStorage.clear();
  }
  function showMenu() {
    setShowmenu(!showmenu);
  }
  return (
    <div style={{ left: 0, top: 0, position: "sticky", zIndex: 100 }}>
      <div
        className="header-transparent"
        hidden={!showmenu}
        onClick={showMenu}
      ></div>
      <div className="header-mobile" hidden={!showmenu}>
        <Link to="/notification">Thông Báo</Link>
        <Link to="/student-list">Danh Sách Sinh Viên</Link>
        <Link to="/stat">Thống Kê</Link>
        <Link to="/discuss">Thảo Luận</Link>
        <div style={{ minHeight: "50px" }}></div>
        <Link to="/profile">Hồ Sơ Phỏng Vấn</Link>
        <Link to="/" onClick={onLogout}>
          Đăng Xuất
        </Link>
      </div>
      <Nav className="header" id="left">
        <Link className="im" to="/home">
          <img
            src={Logo}
            width="auto"
            height="70"
            marginRight="10"
            alt="Logo"
          />
        </Link>

        <Link className="my-nav-link" to="/notification">
          <AiOutlineNotification size={25} style={{ marginRight: "5px" }} />
          Thông Báo
        </Link>
        <Link className="my-nav-link" to="/student-list">
          <BsPerson size={25} style={{ marginRight: "5px" }} />
          Sinh Viên
        </Link>
        <Link className="my-nav-link" to="/stat">
          <BsBarChart size={25} style={{ marginRight: "5px" }} />
          Thống Kê
        </Link>
        <Link className="my-nav-link" to="/InterviewSchedule">
          <AiOutlineCalendar size={25} style={{ marginRight: "5px" }} />
          Lịch Phỏng Vấn
        </Link>
        <Link className="my-nav-link" to="/profile">
          <TiDocument size={25} style={{ marginRight: "5px" }} />
          Hồ Sơ Phỏng Vấn
        </Link>
        <Link to="/" onClick={onLogout} className="my-nav-link">
          <MdLogout size={25} style={{ marginRight: "5px" }} />
          Đăng Xuất
        </Link>
        {showmenu ? (
          <GrClose onClick={showMenu} size={30} className="header-icon" />
        ) : (
          <FaBars onClick={showMenu} size={30} className="header-icon" />
        )}
      </Nav>
    </div>
  );
};

export default MyNavbar;
