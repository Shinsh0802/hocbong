import React from 'react'
import { Button } from 'react-bootstrap'
import Service from '../../../api/service'
import data from './data'
import profileData from './profileData'


const CodeRunner = () => {
    const createProfile = () => {
        localStorage.clear()
        data.slice(0, 100).map((item, index) => {
            //login
            const api = new Service()
            api.login({
                username: item.username,
                password: item.password
            })
                .then(() => {
                    console.log('Thành công')
                    api.post('/profiles', { ...profileData[index], phoneNumber: "0123456789" })
                        .then(() => {
                            console.log('Tạo thành công')
                        })
                        .catch((e) => {
                            console.log(e.response.data.message)
                        })
                })
                .catch(() => console.log('Đăng nhập thất bại'))
            //tạo profile
            console.log(index)
            //logout
            localStorage.clear()
        })
    }
    //createRequirement
    const createRequirement = async (params) => {
        let data = []
        localStorage.clear()
        const api = new Service()
        await api.login({
            username: 'thuky1',
            password: 'Thuky1@Thuky'
        })
        data = await api.get('/profiles/get-all-students/list-students?size=1000')
        .then((res) => {
            return res.data.data.docs
        })
        data.slice(0,100).map((item,index) => {
            api.post(`/after-interview/${item.studentId}/create`,{
                    "content": "Không có gì cả",
                    "deadline": "2021-01-27T12:00",
                    "semester": 1,
                    "schoolYear": "2021-2022"
            })
        })
    }

    return (
        <div>
            <Button>Run code</Button>
        </div>
    )
}

export default CodeRunner
