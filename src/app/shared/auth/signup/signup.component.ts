import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImgCropComponent } from './../../views/img-crop/img-crop.component';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
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
      imageSrc: ['', Validators.required]
    });
  }

  /**
   * this is used to trigger the input
   */
  openInput() {
    // your can use ElementRef for this later
    this.fileUpload.nativeElement.click();
  }

  openCropper() {
    const dialogRef = this.dialog.open(ImgCropComponent, {
      // width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
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

  readUrl(file: any) {

    const reader = new FileReader();

    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event: any) => {
      this.imgSrc = event.target.result;
      this.userForm.get('imageSrc').setValue(this.imgSrc);
      this.renderImgFromSource(this.imgSrc);
    };

    reader.readAsDataURL(file);

  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.ourFile = files[0];
      this.readUrl(this.ourFile);
    }
  }

  navigateToSignIn() {
    // this.router.navigate(['./signin']);
  }
}
