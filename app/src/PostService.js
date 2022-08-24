import axios from "axios";
const url = "http://localhost:5000/api/";

class PostService {
  ///////////////////////////////////////
  /////// PERMIT APPLICATIONS ///////////
  ///////////////////////////////////////

  //// Create a new permit request ////
  static sendPermitApplication(application) {
    return axios.post(url + "permits/apply", { application });
  }

  //// Get all permit requests ////
  static getAllPermitRequests() {
    return axios.get(url + "permits/submissions");
  }
}

export default PostService;
