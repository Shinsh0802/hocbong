import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
export const formatTime = (today, format) => {
  return (
    today.toLocaleDateString(format) + " " + today.toLocaleTimeString(format)
  );
};
export const formatDate = (dateObj) => {
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = day + "/" + month + "/" + year;
  return output;
};
export const formatDate2 = (dateObj) => {
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = year + "-" + month + "-" + day;
  return output;
};
export const decodeToken = (token) => {
  return jwt_decode(token);
};
export const getRole = () => {
  const res = JSON.parse(localStorage.getItem("user"));
  if (res) return res.role;
  else return res;
};
export const getViewportWidth = () => {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
};
export const getGMax = () => new Date().getFullYear() - 2007;
