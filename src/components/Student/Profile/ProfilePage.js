import Profile from "./Basic/Basic";
import WorkPlan from "./WorkPlan/WorkPlan";
// import ViewInterviewQ from "../../features/InterviewQ/ViewInterviewQ";
import "./ProfilePage.css";
import { useEffect, useState, useRef } from "react";
import SideBar from "./SideBar/SideBar";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Financialplan from "./Financialplan/Financialplan";
import Comment from "./Comment/Comment";
import TestInterView from "./InterviewPaper/InterviewPaper";
import HealthVideo from "./LinkFile/LinkFile";
import ProfileTitle from "./ProfileTitle";
import ExplanationPage from "./Explanation/ExplanationPage";
import StudentRequirements from "./StudentRequirements/StudentRequirements";
const ProfilePage = () => {
  let { path } = useRouteMatch();
  console.log("uuuuuuuuuuuuu");

  // timing
  const [remainSecond, setRemainSecond] = useState(300);
  let intervalRef = useRef();
  const decrease = () => {
    setRemainSecond((prev) => prev - 1);
  }
  if (remainSecond === 0 || remainSecond < 0) clearInterval(intervalRef.current)
  useEffect(() => {
    if (remainSecond > 0) intervalRef.current = setInterval(decrease, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
  return (
    <div >
      <div id="left">
        <SideBar remainSecond={remainSecond} />
      </div>
      <div id="profile-item">
        <Switch >

          <Route path={`${path}/ke-hoach-cong-viec`}>
            <ProfileTitle remainSecond={remainSecond} title="KẾ HOẠCH CÔNG VIỆC" />
            <WorkPlan />
          </Route>
          <Route path={`${path}/yeu-cau-sau-phong-van`}>
            <ProfileTitle remainSecond={remainSecond} title="yêu cầu sau phỏng vấn" />
            <StudentRequirements />
          </Route>
          <Route path={`${path}/ke-hoach-tai-chinh`}>
            <ProfileTitle remainSecond={remainSecond} title="KẾ HOẠCH TÀI CHÍNH" />
            <Financialplan />
          </Route>
          <Route path={`${path}/video`}>
            <HealthVideo />
          </Route>
          <Route path={`${path}/phieu-phong-van`}>
            <ProfileTitle remainSecond={remainSecond} title="PHIẾU PHỎNG VẤN" />
            <TestInterView />
          </Route>
          <Route path={`${path}/danhgia-nhanxet`}>
            <Comment />
          </Route>
          <Route path={`${path}/giai-trinh`}>
            <ExplanationPage />
          </Route>
          <Route path={`${path}`}>
            <ProfileTitle remainSecond={remainSecond} title="THÔNG TIN CƠ BẢN" />
            <Profile />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default ProfilePage;
