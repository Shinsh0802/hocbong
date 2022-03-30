import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import style from "./style.module.css"
const ExplanationPage = (props) => {
    const [isView, setisView] = useState(true);
    const [input, setinput] = useState("");
    let user="sinh viên";
    return (
        <div>
            <textarea
                placeholder={`Ý kiến của ${user}`}
                disabled={isView}
                className={style.input}
                onChange={(e) => {setinput(e.target.value)}}
            />
            <Button onClick={() => setisView(!isView)} hidden={isView} type="submit">
                Cập nhật
            </Button>
            <button hidden={!isView} onClick={() => setisView(!isView)} className={style.edit}>
                Chỉnh sửa
            </button>
            <div className={style.line}></div>
            <div style={{color: "#f74a3e", fontWeight: "bold"}}>Chưa được phê duyệt</div>
        </div>
    );
}

export default ExplanationPage;