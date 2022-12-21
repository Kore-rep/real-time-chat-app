import { Component } from '@angular/core';
import { pbLogin, pbRegister } from '../pocketbaseService';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.css']
})
export class SignUpContainerComponent {
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  email: string = '';

  constructor(private router: Router) {}


  async onSignUp() {
    if (this.password !== this.passwordConfirm) {
      window.alert('Passwords do not match.');
      return;
    }
    const registerResposne = await pbRegister(this.username, this.password, this.passwordConfirm, this.email);
    switch (registerResposne.code) {
      case 204:
        window.alert('Successful sign up.');
        this.router.navigate(['/login'])
        break;
      case 400:
        window.alert('Unable to register, invalid request');
        break;
      default:
        window.alert('Unknown error.');
    }

    this.username = '';
    this.password = '';
    this.passwordConfirm = '';
    this.email = '';
  }

  shouldAllowSignUp(): Boolean {
    if (this.username === '' ||
        this.password === '' ||
        this.passwordConfirm === '' ||
        this.email === '')
    {
      return false;
    }
    return true;
  }
}
