import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string = "";

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getUsername().subscribe(
      response => {
        this.username = response[0].username;
      }
    )
  }



}
