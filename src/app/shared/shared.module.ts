import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule
  ],
  declarations: [SigninComponent, SignupComponent, HeaderComponent, FooterComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [

      ]
    };
  }
}
