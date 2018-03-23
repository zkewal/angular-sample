import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-img-crop',
  templateUrl: './img-crop.component.html',
  styleUrls: ['./img-crop.component.css']
})
export class ImgCropComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  data: any;
  // cropperSettings: CropperSettings;

  constructor() {
  }

  ngOnInit() {
    // this.cropperSettings = new CropperSettings();
    // this.cropperSettings.width = 100;
    // this.cropperSettings.height = 100;
    // this.cropperSettings.croppedWidth = 100;
    // this.cropperSettings.croppedHeight = 100;
    // this.cropperSettings.canvasWidth = 400;
    // this.cropperSettings.canvasHeight = 300;

    // this.data = {};
  }

  getBase64Image(img) {
    const canvas = (<HTMLCanvasElement>this.myCanvas.nativeElement);
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL('image/png');

    //     bannerImage = document.getElementById('bannerImg');
    // imgData = getBase64Image(bannerImage);
    // localStorage.setItem("imgData", imgData);


    // var dataImage = localStorage.getItem('imgData');
    // bannerImg = document.getElementById('tableBanner');
    // bannerImg.src = "data:image/png;base64," + dataImage;

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
}
