import style from "./style.module.css";
import LOGO from "../../../images/Logo.png";
import { useHistory } from "react-router-dom";
import {
  AiOutlineCalendar,
  AiOutlineNotification,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsBarChart, BsFillPersonFill, BsPerson, BsPen } from "react-icons/bs";
import { BiLogOut, BiTask } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { getViewportWidth } from "../../../utils/utils";
import { RiLockPasswordLine } from "react-icons/ri";

const AdminSidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileTitle, setMobileTitle] = useState(
    (() => {
      const url = window.location.href;
      if (url.includes("Posts")) return "Thông báo";
      if (url.includes("Students")) return "Quản lý sinh viên";
      if (url.includes("Schedules")) return "Lịc phỏng vấn";
      if (url.includes("Requirements")) return "Yêu cầu sau phỏng vấn";
      if (url.includes("Statistic")) return "Thống kê";
    })()
  );
  const admin = JSON.parse(localStorage.getItem("user")).role === "admin";
  const isBDH = JSON.parse(localStorage.getItem("user")).role === "bdh";
  //ép url
  const history = useHistory();
  if (!localStorage.getItem("user")) {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div>
      <div className="mobile-header">
        <div>
          <FaBars
            size={35}
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => setMobileMenu(true)}
          />
        </div>
        <div style={{ flexGrow: "1" }}>
          <h1
            style={{ color: "white", fontSize: "24px", fontWeight: "600" }}
            align="center"
          >
            {mobileTitle}
          </h1>
        </div>
      </div>
      <div
        style={{
          display: !mobileMenu && getViewportWidth() <= 767 ? "none" : "flex",
          overflowY: "scoll",
        }}
        className={style.sideBar}
      >
        {/* Logo quỹ */}
        <img
          style={{ marginBottom: 10 }}
          className={style.logo}
          width="70"
          src={LOGO}
          alt="Logo quy"
        />
        {/* Menu */}
        {admin ? (
          <div>
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Acounts");
              }}
            >
              <VscAccount size={25} style={{ marginRight: "5px" }} />
              Quản lý tài khoản
            </div>
            <div
              onClick={() => {
                history.push("/Admin/Register");
              }}
              className={style.sideBarItem}
            >
              <BsFillPersonFill size={25} style={{ marginRight: "5px" }} />
              Đăng ký tài khoản
            </div>
            <div
              style={{
                position: "absolute",
                // bottom: 40,
              }}
              className={style.sideBarItem}
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              <BiLogOut size={25} style={{ marginRight: "5px" }} />
              Đăng xuất
            </div>
          </div>
        ) : (
          <div>
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Profile");
              }}
            >
              <BsPerson size={25} style={{ marginRight: "5px" }} />
              Thông tin cá nhân
            </div>
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Posts");
              }}
            >
              <AiOutlineNotification size={25} style={{ marginRight: "5px" }} />
              Thông báo
            </div>
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Students");
              }}
            >
              <AiOutlineUnorderedList
                size={25}
                style={{ marginRight: "5px" }}
              />
              Danh sách sinh viên
            </div>
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Schedules");
              }}
            >
              <AiOutlineCalendar size={25} style={{ marginRight: "5px" }} />
              Lịch phỏng vấn
            </div>
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Requirements");
              }}
            >
              <BiTask size={25} style={{ marginRight: "5px" }} />
              Yêu cầu sau phỏng vấn
            </div>
            {/* <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Statistic");
              }}
            >
              <BsBarChart size={25} style={{ marginRight: "5px" }} />
              Thống kê
            </div> */}
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/Conclude");
              }}
            >
              <BsPen size={25} style={{ marginRight: "5px" }} />
              Kết luận phỏng vấn
            </div>
            {admin ? (
              <div>
                <div
                  className={style.sideBarItem}
                  onClick={() => {
                    history.push("/Admin/Acounts");
                  }}
                >
                  <VscAccount size={25} style={{ marginRight: "5px" }} />
                  Quản lý tài khoản
                </div>
              </div>
            ) : null}
            {/* Đổi mật khẩu */}
            <div
              className={style.sideBarItem}
              onClick={() => {
                history.push("/Admin/ChangePassword");
              }}
            >
              <RiLockPasswordLine size={25} style={{ marginRight: "5px" }} />
              Đổi mật khẩu
            </div>
            {/* Đăng xuất */}
            <div
              className={style.sideBarItem}
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              <BiLogOut size={25} style={{ marginRight: "5px" }} />
              Đăng xuất
            </div>
            <div>
              {isBDH ? (
                <div
                  onClick={() => {
                    history.push("/Admin/Register");
                  }}
                  className={style.sideBarItem}
                >
                  <VscAccount size={25} style={{ marginRight: "5px" }} />
                  Đăng ký tài khoản
                </div>
              ) : null}
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
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
