import { Nav } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineFile } from "react-icons/ai";
import { AiOutlineForm } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";
import { Link, useRouteMatch } from "react-router-dom";
import "./SideBar.css"
import { FaRegComment } from "react-icons/fa";



const SideBar = (p) => {
    let { url } = useRouteMatch();
    console.log(`url`, url)
    const isHidden = url.includes("profile")
    return (
        <div>
            <Nav className="flex-column" id="sidebar">
                {isHidden ? null :
                    <Link className="sidebar-item" to={`/student-list`}>
                        <AiOutlineArrowLeft size={20} className="sidebar-icon" />
                        Trở về
                    </Link>}
                <Link className="sidebar-item" to={`${url}`}>
                    <BsFillPersonFill size={20} className="sidebar-icon" />
                    Thông Tin Cơ Bản
                </Link>
                <Link className="sidebar-item" to={`${url}/phieu_phong_van`}>
                    <AiOutlineForm size={20} className="sidebar-icon" />
                    Phiếu Phỏng Vấn
                </Link>
                <Link className="sidebar-item" to={`${url}/ke-hoach-tai-chinh`}>
                    <GrMoney size={20} className="sidebar-icon" />
                    Kế Hoạch Tài Chính
                </Link>
                <Link className="sidebar-item" to={`${url}/ke-hoach-cong-viec`}>
                    <MdWorkOutline size={20} className="sidebar-icon" />
                    Kế Hoạch Công Việc
                </Link>
                <Link className="sidebar-item" to={`${url}/video`}>
                    <AiOutlineFile size={20} className="sidebar-icon" />
                    File
                </Link>
                {/* <Link className="sidebar-item" to={`${url}/bienlai-bangdiem`}>
                    <CgTranscript size={20} className="sidebar-icon"/>
                    Biên Lai - Bảng Điểm
                </Link> */}
                <Link className="sidebar-item" to={`${url}/danhgia-nhanxet`}>
                    <FaRegComment size={20} className="sidebar-icon" />
                    Đánh giá - Nhận xét
                </Link>
            </Nav>
        </div>
    );
}

export default SideBar;