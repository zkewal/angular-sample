import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    const phoneNumberPattern = '^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$';
    const passwordControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
    this.userForm = this.fb.group({
      firstName: ['', Validators.required, Validators.maxLength(30)],
      lastName: ['', Validators.required, Validators.maxLength(30)],
      surname: ['', Validators.required, Validators.maxLength(30)],
      email: ['', Validators.required, Validators.email],
      phoneNumber: ['', Validators.required, Validators.maxLength(13), Validators.pattern(phoneNumberPattern)],
      address: ['', Validators.required, Validators.maxLength(300)],
      birthday: ['', Validators.required],
      username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      password: passwordControl,
      confirmPassword: ['', CustomValidators.equalTo(passwordControl)],
    });
  }
  navigateToSignIn() {
    this.router.navigate(['./signin']);
  }
}
