import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ImgCropComponent } from './../../views/img-crop/img-crop.component';
import { ValidationMessages } from '../auth.model';
import { AuthService } from './../auth.service';
import { SuccessNotifyComponent } from './successnotify.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  ourFile: File; // hold our file
  userForm: FormGroup;
  maxDate: Date;
  imgSrc = '';
  formDisplayError = {};
  showImage = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
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
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneNumberPattern)]],
      address: ['', [Validators.required, Validators.maxLength(300)]],
      birthday: ['', [Validators.required]],
      imageSrc: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: passwordControl,
      confirmPassword: ['', [Validators.required, CustomValidators.equalTo(passwordControl)]]
    });

    this.userForm.valueChanges.subscribe(
      (data) => {
        // console.log('form value change');
        // tslint:disable-next-line:forin
        for (const field in ValidationMessages) {
          const control = <FormControl>this.userForm.controls[field];

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

  openCropper() {
    const dialogRef = this.dialog.open(ImgCropComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result) {
        this.showImage = true;
        this.userForm.get('imageSrc').setValue(result);
        this.renderImgFromSource(result);
      } else {
        this.userForm.get('imageSrc').setValue('');
        this.showImage = false;
      }
    });
  }

  renderImgFromSource(imgSrc) {
    const img = new Image();
    console.log('image src', typeof (imgSrc));
    img.src = imgSrc;
    const canvas = (<HTMLCanvasElement>this.myCanvas.nativeElement);
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
  }

  formSubmit() {
    console.log('form submit', this.userForm);
    console.log('form errors', this.formDisplayError);
    if (this.userForm.status === 'VALID') {
      console.log('value', this.userForm.value);
      this.authService.addUser(this.userForm.value);
      this.snackBar.openFromComponent(SuccessNotifyComponent, {
        duration: 5000,
      });
      this.navigateToSignIn();
    }
  }

  navigateToSignIn() {
    this.router.navigate(['./signin']);
  }
}
