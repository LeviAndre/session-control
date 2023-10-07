import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from 'src/app/shared/dto/login.dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  username: any = "";

  auth: LoginDTO = new LoginDTO();

  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.updateLoginStatus();
  }

  private updateLoginStatus(): void {
    var isOnline = this._authService.isAuthenticated();

    if (isOnline) {
      this.username = this._authService.getUsername();
      console.log('Usuário: ' + this.username);
    }
  }

  login() {
    this.auth = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }

    this._authService.authenticate(this.auth).subscribe(
      response => {
        if(response.success) {
          this._router.navigate(['/home']);
        } else {
          console.log('Autenticação falhou, exception: ' + response.message)
        }
      },
      error => {
        console.log('Autenticação falhou, exception: ' + error)
      }
    )
  }
}
