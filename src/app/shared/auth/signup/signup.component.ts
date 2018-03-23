import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  ourFile: File; // hold our file
  userForm: FormGroup;
  maxDate: Date;
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.maxDate = new Date(2020, 0, 1);
    console.log('date', this.maxDate);
  }
  createForm() {
    const phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
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

  /**
   * this is used to trigger the input
   */
  openInput() {
    // your can use ElementRef for this later
    this.fileUpload.nativeElement.click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.ourFile = files[0];
    }
  }

  navigateToSignIn() {
    this.router.navigate(['./signin']);
  }
}
