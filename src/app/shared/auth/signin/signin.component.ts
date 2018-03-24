import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationMessages } from '../auth.model';
import { SiginiSuccessNotifyComponent } from './siginsuccessnotify.component';
import { MatSnackBar } from '@angular/material';
import { SiginiErrorNotifyComponent } from './signinerrornotify.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  formDisplayError = {};
  showForm = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    } else {
      this.loginForm = this.fb.group(
        {
          signinUsername: ['', [Validators.required]],
          signinPassword: ['', [Validators.required]],
        }
      );

      this.loginForm.valueChanges.subscribe(
        (data) => {
          // console.log('form value change');
          // tslint:disable-next-line:forin
          for (const field in ValidationMessages) {
            const control = <FormControl>this.loginForm.controls[field];

            this.formDisplayError[field] = '';

            if (control && control.dirty && !control.valid) {
              // see if the control being reffered to is having any changes.
              const messages = ValidationMessages[field];

              // tslint:disable-next-line:forin
              for (const key in control.errors) {
                // there can be more than one validation break, so concatenate the messages.
                this.formDisplayError[field] += messages[key] + ' ';
              }
            }
          }
        }
      );
    }
  }
  authenticateUser() {

  }
  navigateToSignUp() {
    this.router.navigate(['./signup']);
  }

  loginUser() {
    if (this.loginForm.status === 'VALID') {
      const value = this.loginForm.value;
      if (this.authService.authenticateUser(value.signinUsername, value.signinPassword) === true) {
        this.snackBar.openFromComponent(SiginiSuccessNotifyComponent, {
          duration: 5000,
        });

        this.router.navigate(['./home']);
      } else {

        this.showForm = false;
        setTimeout(() => {
          this.loginForm.reset();
          this.showForm = true;
        });
        this.snackBar.openFromComponent(SiginiErrorNotifyComponent, {
          duration: 5000,
        });

      }
    }
  }
}
