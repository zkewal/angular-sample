import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  info(s: any) {
    // tslint:disable-next-line:no-console
    console.info(s);
  }

  log(s: any) {
    console.log(s);
  }

  error(s: any) {
    console.error(s);
  }

}
