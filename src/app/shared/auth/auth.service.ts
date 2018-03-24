import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './auth.model';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class AuthService {
  private authUserUrl = 'api/users';  // URL to web api
  private isUserAuthenticated = false;
  private userData = null;
  private sessionInfo;

  constructor(
    private logger: LoggerService,
    private router: Router
  ) {
  }

  isAuthenticated() {
    let sessionObj = localStorage.getItem('userSession');
    if (sessionObj) {
      sessionObj = JSON.parse(sessionObj);
      const sessionUsername = sessionObj['username'];
      const storageData = localStorage.getItem(sessionUsername);
      if (storageData) {
        const userData: User = JSON.parse(storageData);
        this.userData = userData;
        this.isUserAuthenticated = true;
        this.sessionInfo = sessionObj;
      } else {
        localStorage.removeItem('userSession');
      }
    }

    return this.isUserAuthenticated;
  }

  getToken() {
    if (this.isUserAuthenticated) {
      return this.sessionInfo.token;
    } else {
      return null;
    }
  }

  getUserInfo() {
    return this.userData;
  }

  signOutUser() {
    this.isUserAuthenticated = false;
    this.userData = null;
    localStorage.removeItem('userSession');
    this.router.navigate(['/signin']);
  }

  authenticateUser(username: string, password: string) {
    const data = localStorage.getItem(username);
    if (data) {
      const userData: User = JSON.parse(data);
      if (userData.password === password) {
        this.userData = userData;

        const sessionObject = { 'username': userData.username, 'token': userData.username + ':' + userData.password };
        localStorage.setItem('userSession', JSON.stringify(sessionObject));
        this.isUserAuthenticated = true;
        this.sessionInfo = sessionObject;
        return true;
      } else {
        this.isUserAuthenticated = false;
        this.userData = null;
        localStorage.removeItem('userSession');
        return false;
      }
    }
  }

  addUser(user: User) {
    localStorage.setItem(user.username, JSON.stringify(user));
  }
}
