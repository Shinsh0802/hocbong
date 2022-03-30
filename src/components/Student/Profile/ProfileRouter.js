import WorkPlan from "./WorkPlan/WorkPlan";
import { useEffect, useState, useRef } from "react";
import SideBar from "./SideBar/SideBar";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// import Financialplan from "./Financialplan/Financialplan";
import Comment from "./Comment/Comment";
import TestInterView from "./InterviewPaper/InterviewPaper";
import HealthVideo from "./LinkFile/LinkFile";
import ExplanationPage from "./Explanation/ExplanationPage";
import Basic from "./Basic/Basic";
import { getRole } from "../../../utils/utils";
import { useSelector } from "react-redux";
import Financialplan from "./Financialplan/Financialplan";

const ProfileRouter = (props) => {
  let { path } = useRouteMatch();
  const role = getRole()
  const state = useSelector(state => state.profile)
  //render
  return (
    <div >
      <div style={{ padding: "0 5%" }}>
        {role==='student'?
          <Switch >
            <Route path={`${path}/ke-hoach-cong-viec`}>
              <WorkPlan path={path} studentId={props.studentId} />
            </Route>
            <Route path={`${path}/ke-hoach-tai-chinh`}>
              <Financialplan path={path} studentId={props.studentId} />
            </Route>
            <Route path={`${path}/media`}>
              <HealthVideo path={path} studentId={props.studentId} />
            </Route>
            <Route path={`${path}/phieu_phong_van`}>
              <TestInterView path={path} studentId={props.studentId} />
            </Route>
            <Route path={`${path}/danhgia_nhanxet`}>
              <Comment path={path} studentId={props.studentId} />
            </Route>
            <Route path={`${path}/giai-trinh`}>
              <ExplanationPage path={path} />
            </Route>
            <Route path={`${path}`}>
              <Basic path={path} studentId={props.studentId} />
            </Route>
          </Switch>
          :
          state === 'basic' ? <Basic path={path} studentId={props.studentId} /> :
            state === 'interview' ? <TestInterView path={path} studentId={props.studentId} /> :
              state === 'work' ? <WorkPlan path={path} studentId={props.studentId} /> :
                state === 'financial' ? <Financialplan path={path} studentId={props.studentId} /> :
                  state === 'file' ? <HealthVideo path={path} studentId={props.studentId} /> :
                    state === 'comment' ? <Comment path={path} studentId={props.studentId} /> : null
        }
      </div>
    </div>
  );
};

export default ProfileRouter;
