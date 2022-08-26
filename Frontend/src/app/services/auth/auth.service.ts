import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ENVIRONMENT } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  privilege = [];
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  constructor(private http: HttpClient) { }
  curentUser;
  employee;
  login(authCredentials) {
    return this.http.post(
      ENVIRONMENT.API + "/auth/signin",
      authCredentials,
      this.noAuthHeader
    );
  }
  setCurrentUserId(user) {
    localStorage.setItem("id", user.id);
  }
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    localStorage.removeItem("connect");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
  setRole(privilege: any[]) {
    if (privilege.indexOf('ADMIN') > -1)
      localStorage.setItem('privilege', '123')
    else if (privilege.indexOf('CLIENT') > -1)
      localStorage.setItem('privilege', '456')
  }
  getRole() {
    let privilege = localStorage.getItem("privilege");
    if (privilege == "123")
      return 'ADMIN';
    else if (privilege == '456')
      return 'CLIENT';
  }
  isAdmin() {
      return this.getRole() == 'ADMIN';
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
  getUser(id) {
    let params = new HttpParams().set("id", id);
    return this.http.get(ENVIRONMENT.API + "/auth/user", {
      params: params,
    });
  }
  getUserByMail(mail) {
    let params = new HttpParams().set("mail", mail);
    return this.http.get(ENVIRONMENT.API + "/auth/user/find", {
      params: params,
    });
  }
  editUserSettings(user) {
    return this.http.put(ENVIRONMENT.API + "/auth/edit-user-settings", user);
  }
  getUsers() {
    return this.http.get(ENVIRONMENT.API + "/auth/users/all");
  }
  editUserRole(user) {
    return this.http.put(ENVIRONMENT.API + "/auth/edit-user-role", user);
  }
  resetPassword(user) {
    return this.http.post(ENVIRONMENT.API + "/auth/reset-password/", user);
  }
  forgotPassword(email) {
    let params = new HttpParams().set("email", email);
    return this.http.get(ENVIRONMENT.API + "/auth/forgot-password/", {
      params: params,
    });
  }
  register(user) {
    return this.http.post(
      ENVIRONMENT.API + "auth/register",
      user,
      this.noAuthHeader
    );
  }
  sendEmail(mail) {
    return this.http.post(
      ENVIRONMENT.API + "/auth/send-email",
      mail,
      this.noAuthHeader
    );
  }
}
