import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly ROLES = 'ROLES';
  constructor() { }

  public setRoles(roles:[]) {
    localStorage.setItem(this.ROLES, JSON.stringify(roles));
  }

  public getRoles(): [] {
    const roles = localStorage.getItem(this.ROLES);
    return roles != null ? JSON.parse(roles) : null;
  }

  public setJwtToken(jwtToken: string) {
    localStorage.setItem(this.JWT_TOKEN, jwtToken);
  }

  public getJwtToken() {
    return  localStorage.getItem(this.JWT_TOKEN);
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getJwtToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'admin';
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'user';
  }
}
