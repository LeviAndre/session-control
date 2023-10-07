import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from 'src/app/shared/dto/login.dto';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/core/services/register/register.service';
import { RegisterDTO } from 'src/app/shared/dto/register.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formGroup: FormGroup;
  registerInfo: RegisterDTO | undefined;
  defaultToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5kcmVsZXZpIiwiYWRtaW4iOiJmYWxzZSIsImlhdCI6MTUxNjIzOTAyMn0.9OMS3AygUOoAPa0Ow9gHQwAu3C5w5uUEilI7cT9pG10";

  auth: LoginDTO = new LoginDTO();

  constructor(private _fb: FormBuilder, private _router: Router, private _registerService: RegisterService ) {
    this.formGroup = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  register() {

    this.registerInfo = {
      username: this.formGroup.get('username')?.value,
      password: this.formGroup.get('password')?.value,
      birthDate: this.formGroup.get('birthDate')?.value,
      token: this.defaultToken,
    }

    this._registerService.register(this.registerInfo).subscribe(
      response => {
        if (response['token'] !== '') {
          this._router.navigate(['/']);
        } else {
          console.error('Ocorreu um erro ao cadastrar o usuário:', response.message);
        }
      },
      error => {
        console.error('Ocorreu um erro ao cadastrar o usuário:', error);
      }
    )
  }
}
