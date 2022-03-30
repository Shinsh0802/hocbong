import { useDispatch } from "react-redux";
import Service from "../../../api/service";
import { setLoading } from "../../shared/Loading/loadingSlice";

const HomePage = () => {
    return (
        <div style={{paddingTop: "30vh"}}>
            <h2 align="center">Quỹ học bổng Thắp Sáng Niềm Tin</h2>
            <h1 align="center">Hệ thống xét cấp lại học bổng cho sinh viên</h1>
        </div >
    );
}

export default HomePage;