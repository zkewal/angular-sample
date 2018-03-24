import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private logger: LoggerService
  ) { }

  isAuthenticated() {
    return this.isUserAuthenticated;
  }

  getUserInfo() {
    return this.userData;
  }

  authenticateUser(username: string, password: string) {
    const data = localStorage.getItem(username);
    if (data) {
      const userData: User = JSON.parse(data);
      if (userData.password === password) {
        this.userData = userData;
        this.isUserAuthenticated = true;
        return true;
      } else {
        this.isUserAuthenticated = false;
        this.userData = null;
        return false;
      }
    }
  }

  addUser(user: User) {
    localStorage.setItem(user.username, JSON.stringify(user));
  }
}
