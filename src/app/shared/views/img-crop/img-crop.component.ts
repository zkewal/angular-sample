import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-img-crop',
  templateUrl: './img-crop.component.html',
  styleUrls: ['./img-crop.component.css']
})
export class ImgCropComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  data: any;
  cropperSettings: CropperSettings;

  constructor(
    public dialogRef: MatDialogRef<ImgCropComponent>
  ) {
  }

  ngOnInit() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
  }

  onCancel() {
    this.dialogRef.close();
  }
}
