import environment from "./environments/environment";
import axios from "axios";
import { toast } from "react-toastify";
import { decodeToken } from "../utils/utils";
class Service {
  //refresh token mỗi khi gọi api
  constructor() {
    axios
      .post(
        environment.url + "/users/refreshtoken",
        { refreshToken: localStorage.getItem("refreshToken") },
        environment.headers
      )
      .then((data) => {
        const refreshToken = data.data.refreshToken;
        const token = data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        environment.headers = {
          headers: {
            "x-access-token": data.data.accessToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      })
      .catch((e) => {
        // hết hạn
        if (e?.response?.status === 403 || e?.response?.status === 404) {
          localStorage.clear();
          window.location.reload();
        }
      });
  }
  url = environment.url;
  login(user) {
    return axios.post(environment.url + "/users/login", user)
      .then((res) => {
        const user = decodeToken(res.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        environment.headers = {
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        return true;
      })
      .catch((e) => {
        try {
          toast.error(e.response.data.message)
        } catch (error) {
          window.location = ('/error')
        }
      });
  }
  register(user) {
    return axios.post(environment.url + "/users/register", user);
  }
  get(url) {
    return axios.get(this.url + url, environment.headers);
  }
  async post(url, data) {
    return axios
      .post(this.url + url, data, environment.headers)
      .then(() => {
        toast.success("Thành công");
        return true
      })
      .catch((e) => {
        if (e.response?.status === 400) toast.error(e.response.data.message);
        else {
          toast.error("Lỗi hệ thống");
          // window.location=('/error')
        }
        return false
      });
  }
  async put(url, data) {
    return axios
      .put(this.url + url, data, environment.headers)
      .then(() => {
        toast.success("Cập nhật thành công");
        return true
      })
      .catch((e) => {
        if (e.response?.status === 400) toast.error(e.response.data.message);
        else {
          toast.error("Lỗi hệ thống");
        }
        return false
      });
  }
  async delete(url) {
    return axios.delete(this.url + url, environment.headers).catch((e) => {
      toast.success("xóa thành công");
      if (e.response?.status === 401) {
        this.refreshToken();
      }
    });
  }
  async patch(url, data) {
    return axios
      .patch(this.url + url, data, environment.headers)
      .then(() => {
        toast.success("Cập nhật thành công");
        return true
      })
      .catch((e) => {
        if (e.response?.status === 400) toast.error(e.response.data.message);
        else {
          toast.error("Lỗi hệ thống");
        }
        return false
      });
  }
}

export default Service;
