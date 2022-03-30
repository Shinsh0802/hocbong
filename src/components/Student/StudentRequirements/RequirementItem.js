import style from "./../../Admin/Requirements/style.module.css"
import { formatDate } from "../../../utils/utils";

const RequirementItem = ({ requirement }) => {
    const date = new Date(requirement.deadline)
    const progress = (requirement.progress) ? "Đã hoàn thành" : "Chưa hoàn thành"

    return (
        <tr className={style.row}>
            <td data-label='Họ và tên'>{requirement.studentName}</td>
            <td data-label='Thuộc G' align="center">{requirement.teams}</td>
            <td data-label='Cộng đồng' align="center">{requirement.group}</td>
            <td data-label='Nội dung yêu cầu' align="justify">{requirement.content}</td>
            <td data-label='Deadline'>{formatDate(date)}</td>
            <td data-label='Tiến độ' align="center">{progress}</td>


        </tr>
    );
}

export default RequirementItem;