import { SuccessNotifyComponent } from './../shared/auth/signup/successnotify.component';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { User } from './../shared/auth/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: User;
  uri = 'http://www.mocky.io/v2/5ab61bfb2f00005900361831';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
  }

  testHttpInterceptor() {
    this.http.get(this.uri).subscribe(
      resp => console.log('resp:', resp)
    );
  }

}
