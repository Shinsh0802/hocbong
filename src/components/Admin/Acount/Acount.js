import { Button } from "react-bootstrap";
const Acount = ({ acount, editable, handleDelete }) => {
  return (
    <tr>
      <td align="center">{acount.fullName}</td>
      <td align="center">{acount.teams}</td>
      <td align="center">{acount.group}</td>
      <td align="center">{acount.role}</td>
      {editable ? (
        <>
          {/* Chỉnh sửa */}
          <td>
            <textarea
              align="center"
              style={{ width: "100%", height: "50px" }}
              defaultValue={acount.password}
            />
          </td>
          <td>
            <textarea
              align="center"
              style={{ width: "100%", height: "50px" }}
            />
            <Button
              style={{ height: "40px" }}
              hidden={!editable}
              // onClick={(e) => {
              //   handleUpdate({ ...acount, password: e.target.value });
              // }}
            >
              Đổi
            </Button>
          </td>
        </>
      ) : (
        <>
          {/* Hiển thị */}
          <td align="center">{acount.username}</td>
          <td align="center">{acount.password}</td>
          <Button
            onClick={handleDelete}
            id={acount.id}
            variant="danger"
            style={{ margin: "15px" }}
          >
            Xóa tài khoản
          </Button>
        </>
      )}
    </tr>
  );
};

export default Acount;
