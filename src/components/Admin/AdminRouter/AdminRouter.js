import { Switch, Route, useHistory } from "react-router-dom";
import { getRole, getViewportWidth } from "../../../utils/utils";
import NotificationPage from "../../Student/Notification/NotificationPage";
import InterviewSchedulePage from "../../Student/Schedule/SchedulePage";
import Statistic from "../../Student/Statistic/Statistic/Statistic";
import StudentListPage from "../../Student/StudentList/StudentListPage";
import RegisterPage from "../Register/RegisterPage";
import Requirements from "../Requirements/RequirementPage";
import AdminSidebar from "./AdminSidebar";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Conclude from "../../Student/Conclude/Conclude ";
import Acounts from "../Acount/Acounts";
import ChangePassword from "../../Student/ChangePassword/ChangePassword";
import AdminProfile from "../Profile/AdminProfile";
const AdminRouter = () => {
  //check role
  const history = useHistory()
  useEffect(() => {
    const role = getRole()
    if (role==="student"){
      toast.error('Bạn không có quyền truy cập tính năng này!')
      history.push('/')
    }
  }, []);
  const role = getRole()
  if (role==="student")
    return null
  //render
  return (
    <div>
      <AdminSidebar />
      <div style={{ marginLeft: getViewportWidth() <= 767 ? "0px" : "250px", marginTop: getViewportWidth() <= 767 ? "50px" : "0px" }}>
        <Switch>
          <Route path="/Admin/Posts">
            <div style={{ width: "100%", padding: "0 5px" }}>
              <NotificationPage />
            </div>
          </Route>
          <Route path="/Admin/Requirements">
            <Requirements />
          </Route>
          <Route path="/Admin/Schedules">
            <InterviewSchedulePage />
          </Route>
          <Route path="/Admin/Register">
            <RegisterPage />
          </Route>
          <Route path="/Admin/Interview">
            <StudentListPage />
          </Route>
          <Route path="/Admin/Statistic">
            <Statistic />
          </Route>
          <Route path="/Admin/Students">
            <StudentListPage />
          </Route>
          <Route path="/Admin/Conclude">
            <Conclude />
          </Route>
          <Route path="/Admin/Acounts">
            <Acounts />
          </Route>
          <Route path="/Admin/ChangePassword">
            <ChangePassword />
          </Route>
          <Route path="/Admin/Profile">
            <AdminProfile />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default AdminRouter;
