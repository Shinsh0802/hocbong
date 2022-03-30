import { useState } from "react";
import { Button } from "react-bootstrap";
import Service from "../../../api/service";
import {useDispatch} from 'react-redux'
import { endLoading, startLoading } from "../../shared/Loading/loadingSlice";
const Commit = (props) => {
    //dispatch
    const dispatch = useDispatch()
    //state
    const [file, setFile] = useState(null)
    //onUpload
    const onUpload = (e) => {
        const curFile = e.target?.files[0]
        setFile(curFile)
    }
    //onSubmit
    const onSubmit = () => {
        const service = new Service();
        dispatch(startLoading)
        service.post('/commitments',file)
        .finally(()=>{
            dispatch(endLoading)
        })
    }
    
    //render
    return ( 
        <div>
            <div>Chỉ upload file pdf</div>
            <input type='file' onChange={onUpload}/>
            <Button onClick={onSubmit}>Gửi</Button>
            <h1>Danh sách cam kết của bạn</h1>
        </div>
    );
}
 
export default Commit;