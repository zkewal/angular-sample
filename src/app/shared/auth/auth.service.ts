import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './auth.model';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  private authUserUrl = 'api/users';  // URL to web api
  private isUserAuthenticated = false;
  private userData = null;

  constructor(
    private http: HttpClient,
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
      }
    }

    return this.isUserAuthenticated;
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
