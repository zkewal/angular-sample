import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { DetailComponent } from './views/detail/detail.component';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    RouterModule,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    DetailComponent
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    DetailComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuardService,
        AuthService
      ]
    };
  }
}
