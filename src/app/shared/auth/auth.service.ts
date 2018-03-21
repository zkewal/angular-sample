import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  isAuthenticated() {
    return true;
  }
}
