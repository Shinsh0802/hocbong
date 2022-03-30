import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getRole } from "../../../utils/utils";
import { setProfile } from "./profileSlice";
import style from "./style.module.css"

// props = {
//     path, editable, hidden, setEditable, state, setState

// }

const EditButton = (props) => {
    const history = useHistory();
    const url = window.location.href
    const state = useSelector(state => state.profile)
    console.log(state)
    const role = getRole()
    const dispatch = useDispatch()
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Cần phải điền thông tin cơ bản trước khi điền các thông tin khác</Tooltip>}
            >
                <select disabled={role === 'student' && !localStorage.getItem('profile')}
                    onChange={(e) => {
                        if (role === 'student')
                            history.push(e.target.value)
                        else
                            dispatch(setProfile(e.target.value))
                    }}
                    className={style.titleDropdown}
                >
                    <option selected value={role === 'student' ? `${props.path}` : 'basic'}>Thông tin cơ bản</option>
                    <option selected={role === 'student' ? url.includes('phieu_phong_van') : state === 'interview'}
                        value={role === 'student' ? `${props.path}/phieu_phong_van` : 'interview'}>
                        Phiếu phỏng vấn
                    </option>
                    <option selected={role === 'student' ? url.includes('ke-hoach-tai-chinh') : state === 'financial'}
                        value={role === 'student' ? `${props.path}/ke-hoach-tai-chinh` : 'financial'}>
                        Kế hoạch tài chính
                    </option>
                    <option selected={role === 'student' ? url.includes('ke-hoach-cong-viec') : state === 'work'}
                        value={role === 'student' ? `${props.path}/ke-hoach-cong-viec` : 'work'}>
                        Kế hoạch công việc
                    </option>
                    <option selected={role === 'student' ? url.includes('media') : state === 'file'}
                        value={role === 'student' ? `${props.path}/media` : 'file'}>
                        Tài liệu khác
                    </option>
                    <option selected={role==='student'?url.includes('danhgia_nhanxet'):state==='comment'}
                        value={role==='student'?`${props.path}/danhgia_nhanxet`:'comment'}>
                        Đánh giá - Nhận xét
                    </option>
                </select>
            </OverlayTrigger>
            {/* <h1>{props.title}</h1> */}
            <Button hidden={props.editable || props.hidden} style={{ margin: "auto" }} variant="light"
                onClick={() => props.setEditable(true)}>
                <BiPencil size={20} style={{ marginRight: "5px" }} />
                <span>
                    Chỉnh sửa
                </span>
            </Button>
        </div>
    );
}

export default EditButton;