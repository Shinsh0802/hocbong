import { Form, Button, Modal } from 'react-bootstrap'
import { BrowserRouter, useRouteMatch, useLocation, Link } from 'react-router-dom';
import { BsPencil } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import { AiOutlineClose } from "react-icons/ai"
import EditButton from '../EditButton'
import "./Comment.css";
import Service from "../../../../api/service"
import axios from "axios"
import environment from "../../../../api/environments/environment";

const Comment = p => {
  const [editable, setEditable] = useState(false)
  let role = JSON.parse(localStorage.getItem("user")).role;
  const isUpdate = (role === "bdh")?true:false;
  const [approved, setApproved] = useState(false);
  const [agreement, setAgreement] = useState();
  const [commentText, setCommentText] = useState();
  const [commentId, setCommentId] = useState();
  const service = new Service();

  const getData = async () => {
    await axios.get(`http://localhost:1995/api/interview-profiles/user?studentId=${p.studentId}&semester=${localStorage.semester}&schoolYear=${localStorage.schoolYear}`, environment.headers).then((res) => {
      if(res.data.data){
        setCommentId(res.data.data._id)
        if(res.data.data.approval.status === "Đã duyệt"){
          setAgreement(true)
          setApproved(true)
        }
        else if(res.data.data.approval.status === "Không đồng ý"){
          setAgreement(false)
          setApproved(true)
        }

        if(res.data.data.comments.length === 0){
          setCommentText("Không có nhận xét")
        }
        else{
          setCommentText(res.data.data.comments[0].content)
        }
      }
    })
  }

  useEffect(() => {
    getData();
  },[])

  const handleApprovalSubmit = async() => {
    const url1 = `/interview-profiles/${commentId}/approval`;
    await service.patch(url1, {status: "Đã duyệt"})

    const url2 = `/interview-profiles/${commentId}/comments`;
    await service.patch(url2, {content: commentText})

    setApproved(true)
    setAgreement(true)
  }

  const handleNoApprovalSubmit = async() => {
    const url1 = `/interview-profiles/${commentId}/approval`;
    await service.patch(url1, {status: "Không đồng ý"})

    const url2 = `/interview-profiles/${commentId}/comments`;
    await service.patch(url2, {content: commentText})

    setApproved(true)
    setAgreement(false)
  }

  return (
    <div>
      <EditButton path={p.path} title={'Đánh giá - Nhận xét'} editable={editable} hidden={JSON.parse(localStorage.getItem('user')).role !== 'student'} setEditable={setEditable}/>
      <Form>
          <div style={{ marginTop: "20px" }}>
            <div style={{display: "flex"}}>
              <div style={{ fontWeight: "bold", marginRight: "2%", marginTop: "auto", marginBottom: "auto" }}><p style={{ marginBottom: "0" }}>Tình trạng phê duyệt:</p></div>
              {
                approved ? <>
                {
                  agreement ? <div style={{ color: "green", fontWeight: "bold", marginRight: "2%", textAlign: "center", marginTop: "auto", marginBottom: "auto" }}><p style={{ marginBottom: "0" }}><TiTick size={10} />Đồng ý</p></div> :
                  <span style={{ color: "red", fontWeight: "bold", marginRight: "2%", textAlign: "center", marginTop: "auto", marginBottom: "auto" }}><p style={{ marginBottom: "0" }}><AiOutlineClose size={10} />Không đồng ý</p></span>
                }
                  
                </>
                  : <div style={{ color: "gray", fontWeight: "bold", marginRight: "2%", textAlign: "center", marginTop: "auto", marginBottom: "auto" }}><p style={{ marginBottom: "0" }}>Chưa được phê duyệt</p></div>
              }
            </div>
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ marginTop: "20px" }}>
            <Form.Label><b>Lời đánh giá - nhận xét:</b></Form.Label>
            <Form.Control disabled={(!isUpdate)} as="textarea" defaultValue={commentText} rows={3} name="target1" onChange={(e) => { setCommentText(e.target.value) }}/>
          </Form.Group>
          {
            approved ? '' : <div align="center" style={{marginTop: "24px"}}>

              <Button
                variant="success"
                hidden={(!isUpdate)}
                onClick={handleApprovalSubmit}
                style={{marginRight: "2%"}}
              >
                Đồng ý
              </Button>
              <Button
                variant="danger"
                hidden={(!isUpdate)}
                onClick={handleNoApprovalSubmit}
              >
                Không đồng ý
              </Button>
                
            </div>
          }
          

      </Form>

    </div>
  )
}

export default Comment
