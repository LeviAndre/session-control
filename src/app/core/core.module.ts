
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './services/register/register.service';

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports:[
  ],
  providers: [
    AuthService,
    RegisterService
  ]
})
export class CoreModule { }
