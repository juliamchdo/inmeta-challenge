import api from "../router/index";

export class AuthService {
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  static logout() {
    localStorage.removeItem('token');
    api.push('/')
  }
}

export default new AuthService();
