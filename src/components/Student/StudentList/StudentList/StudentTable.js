import { Table } from "react-bootstrap";
import StudentRow from "./StudentRow";
import "./StudentList.css";


const StudentList = ({ student }) => {
    return (
        <div>
            <br />
            <p><b>Ghi chú:</b> Sinh viên được tô màu xanh nghĩa là đã hoàn thành kỳ phỏng vấn</p>
            <Table
                style={{ backgroundColor: "white", marginTop: "10px", borderColor: "white" }}
            >
                <thead align="center">
                    <tr>
                        <th>Họ và tên</th>
                        <th>Cộng đồng</th>
                        <th>Thuộc G</th>
                        <th>Bảng điều khiển</th>
                    </tr>
                </thead>
                <tbody>
                    {student?.map((item) => (
                        <StudentRow
                            item={item}
                            studentState={[]}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default StudentList;