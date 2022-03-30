import { Switch, Route, useHistory, Redirect } from 'react-router-dom'
import StudentMenu from './StudentMenu/StudentMenu';
import HomePage from './Home/HomePage';
import NotificationPage from './Notification/NotificationPage';
import ProfilePage from './Profile/ProfileRouter';
import InterviewSchedulePage from './Schedule/SchedulePage';
import StatPage from './Statistic/StatisticPage';
import style from "./style.module.css"
import Commit from './Commit/Commit';
import CreateProfile from './CreateProfile/CreateProfile';
import { useEffect } from 'react';
import Service from '../../api/service';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Conclude from './Conclude/Conclude ';
import ChangePassword from './ChangePassword/ChangePassword';
import { endLoading, startLoading } from '../shared/Loading/loadingSlice';
import StudentRequirements from './StudentRequirements/StudentRequirements'
const StudentRouter = () => {
    //set profile
    let api = new Service()
    console.log("uuuuuuuuuuukkkkkkkkkkkk");
    const dispatch = useDispatch()
    if (localStorage.getItem('profile') === null) {
        const api = new Service()
        dispatch(startLoading)
        api.get('/profiles/current-user-profile')
            .then((res) => {
                localStorage.setItem('profile', true)
            })
            .catch((res) => {
                localStorage.setItem('profile', 'none')
            })
            .finally((params) => {
                dispatch(endLoading)
                checkProfile()
            })
    }
    //check Profile
    const history = useHistory()
    const checkProfile = () => {
        if (localStorage.getItem('profile') === 'none' && localStorage.getItem('token') !== null && window.location.pathname !== '/student/profile') {
            history.push('/student/profile');
            toast.info('Vui lòng điền thông tin cơ bản trước khi sử dụng hệ thống')
        }
    }

    // listen change url
    useEffect(() => {
        history.listen((location) => {
            checkProfile()
        })
    }, [])
    //render
    return (
        <div>
            <StudentMenu />

            <div className={style.profileContent}>
                <Switch>
                    {/* Trang chủ */}
                    <Route path="/student/home" exact>
                        <HomePage />
                    </Route>
                    {/* Hồ sơ cá nhân */}
                    <Route path="/student/profile">
                        <ProfilePage />
                    </Route>
                    {/* Trang thông báo */}
                    <Route path="/student/notification" exact>
                        <div>
                            <NotificationPage />
                        </div>
                    </Route>
                    {/* Thống kê */}
                    <Route path="/student/stat" exact>
                        <StatPage />
                    </Route>
                    {/* Lịch phỏng vấn */}
                    <Route path="/student/schedule" exact>
                        <InterviewSchedulePage></InterviewSchedulePage>
                    </Route>
                    {/* Kết luận */}
                    <Route path="/student/conclude" exact>
                        <Conclude />
                    </Route>
                    {/* Cam kết */}
                    <Route path="/student/commitment" exact>
                        <Commit />
                    </Route>
                    {/* Tạo thông tin cá nhân */}
                    <Route path="/student/create-profile" exact>
                        <CreateProfile />
                    </Route>

                    {/* Thống kê */}
                    <Route path="/student/stat" exact>
                        <StatPage />
                    </Route>

                    <Route path="/student/yeu-cau-sau-phong-van" exact>
                        <StudentRequirements />
                    </Route>
                    {/*Đổi mật khẩu */}
                    <Route path="/student/changepassword" exact>
                        <ChangePassword />
                    </Route>
                    {/* Không tìm thấy url */}
                    <Route path="/*">
                        <Redirect to="/notFound" />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default StudentRouter;
