import { Component } from '@angular/core';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})

export class LoginContainerComponent {
  username: String | undefined = '';
  password: String | undefined = '';

  onLogin() {
    window.alert(`Login with ${this.username} and ${this.password}`);
    this.username="";
    this.password="";
  }
}
