import React from 'react'
import { Button } from 'react-bootstrap'

const CreateProfile = () => {
    return (
        <div>
            <h1>Vui lòng nhập thông tin cá nhân trước khi sử dụng hệ thống</h1>
            <Button onClick={()=>{localStorage.clear(); window.location.reload()}}>Đăng xuất</Button> 
        </div>
    )
}

export default CreateProfile
