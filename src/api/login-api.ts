import { toast } from "vue3-toastify";
import api from "../services";
import router from "../router";

export class LoginApi {
  static async login(params: { email: string; password: string }) {
    return await api.post("/login", params)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((error) => {
        const msg = error.response.data.message;
        toast(msg, {
          type: "error",
          transition: "slide",
          dangerouslyHTMLString: true,
        });
      });
  }

  static async registerUser(params: { name: string; email: string; password: string; }) {
    return await api.post("/register", params)
      .then(() => router.push("home"))
      .catch((error) => {
        const msg = error.response.data.message;
        toast(msg, {
          type: "error",
          transition: "slide",
          dangerouslyHTMLString: true,
        });
      });
  }

  static async getUserID(){
   return await api.get('me').then((res) => res.data.id);
  }
}
