import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";
  //PATH_OF_API = "http://192.168.49.2:30200";
  //PATH_OF_API = "http://ec2-3-8-133-131.eu-west-2.compute.amazonaws.com:9090";

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  )
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader });
  }

  public forUser() {
    return this.httpClient.get(this.PATH_OF_API +"/user", {
      responseType: "text"
    });
  }

  public forAdmin() {
    return this.httpClient.get(this.PATH_OF_API +"/admin", {
      responseType: "text"
    });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName == allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }

  public register(registerData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/registerUser", registerData);
  }
}
