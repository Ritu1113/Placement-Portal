import axios from "axios";

const userLocal = "IIITL_Placement_Portal_User";

const instance = axios.create({
  baseURL: "https://placements-iiitl.herokuapp.com/",
  withCredentials: true,
});

const obj = JSON.parse(localStorage.getItem(userLocal));

if (obj?.authHeader) {
  instance.defaults.headers.common["Authorization"] = obj.authHeader;
}

export default instance;
