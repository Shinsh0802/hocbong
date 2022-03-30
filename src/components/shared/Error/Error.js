import { BiErrorCircle } from "react-icons/bi";

const Error = () => {
    return (
        <div style={{ fontSize: "30px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "40vh" }}>
            <BiErrorCircle style={{ color: "red", marginRight: "10px" }} />Lỗi hệ thống
        </div>
    );
}

export default Error;
