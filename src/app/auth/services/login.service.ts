import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';
import { ParentService } from 'src/app/shared/services/parent.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ParentService{

  uriLogin: string = "login";
  uriLogout : string =  "logout";


  isAuthenticate(): boolean {
    return localStorage.getItem(environment.appName + "_token") != null;
  }

  getToken(): string {
    if (this.isAuthenticate()) {

      return localStorage.getItem(environment.appName + "_token")!
    }
    return "";
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem(environment.appName + "_user")!) as User;
  }
}
