import { Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './components/Authentication/LoginPage';
import AdminRouter from './components/Admin/AdminRouter/AdminRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/shared/NotFound/NotFound';
import StudentRouter from './components/Student/Router';
import Loading from './components/shared/Loading/Loading';
import Error from './components/shared/Error/Error';
import CodeRunner from './components/shared/CodeRunner/CodeRunner';
import "./index.css"

const App = () => {
  return (
    <>
      <Loading />
      <ToastContainer />
      <Switch>
        {/* Trang đăng nhập */}
        <Route path="/" exact>
          <LoginPage />
        </Route>
        {/* Sinh viên */}
        <Route path="/student">
          <StudentRouter />
        </Route>
        {/* Admin */}
        <Route path="/admin">
          <AdminRouter />
        </Route>
        {/* Không tìm thấy url */}
        <Route path="/notFound">
          <NotFound />
        </Route>
        {/* Error */}
        <Route path="/error">
          <Error />
        </Route>
        {/* Code runner */}
        <Route path="/code-runner">
          <CodeRunner />
        </Route>
        {/* Redirect */}
        <Route path="/*">
          <Redirect to="/notFound" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
