import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { pbLogin } from '../pocketbaseService';
@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})

export class LoginContainerComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  async onLogin() {
    const loginResponse = await pbLogin(this.username, this.password);
    switch (loginResponse.code) {
      case 200:
        window.alert('Successful login.');
        this.username="";
        this.router.navigate([''])
        break;
      case 400:
        window.alert('Unable to log in with provided details.');
        break;
      case 409:
        window.alert('Another user is already logged in.');
        break;
      default:
        window.alert('Unknown error');
    }
    this.password="";
  }
}
