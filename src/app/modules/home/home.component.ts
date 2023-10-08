import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string = "";
  timeRemaining: number = 600;
  timer: Date = new Date(0, 0, 0, 0, 10, 0);
  
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getUsername().subscribe(
      response => {
        this.username = response[0].username;
      }
    )

    this.startTimer()
  }

  startTimer() {
    const interval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimer();
      if (this.timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }  

  updateTimer() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    this.timer = new Date(0, 0, 0, 0, minutes, seconds);
  }  

}
