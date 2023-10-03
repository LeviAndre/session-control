import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginDTO } from 'src/app/shared/dto/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  authenticate(userInfo: any): Observable<any> {
    return this._http.get<any[]>(`${this.baseUrl}/users`, { params: userInfo }).pipe(
      map(users => {
        if (users.length === 1) {
          const user = users[0];
          localStorage.setItem('session', user.token.toString());
          localStorage.setItem('isAuth', 'true');

          return { success: true, message: 'User authenticated'}
        }
        return { success: false, message: 'Authentication failed'}
      })
    )
  }

  logout(): void {
    localStorage.clear;
  }

  getUsername(): Observable<string> {
    return this._http.get<string>(`${this.baseUrl}/username`).pipe(
      map(output => output)
    );
  }

  isAuthenticated(): boolean {
    const logged = !!localStorage.getItem('isAuth');
    console.log("Login: " + logged);
    return logged;
  }
}
