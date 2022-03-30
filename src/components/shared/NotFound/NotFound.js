import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <div className="mt-5" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <h1>Đường dẫn không tồn tại!</h1>
            <Link align="center" to="/">Trở về trang chủ</Link>
        </div>
    );
}

export default NotFound;