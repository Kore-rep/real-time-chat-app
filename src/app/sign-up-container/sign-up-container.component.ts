import { Component } from '@angular/core';
import { pbLogin, pbRegister } from '../pocketbaseService';

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

  async onSignUp() {
    if (this.password !== this.passwordConfirm) {
      window.alert('Passwords do not match.');
      return;
    }
    window.alert(`Sign up: ${this.username} and ${this.password}`);
    await pbRegister(this.username, this.password, this.passwordConfirm, this.email);
    await pbLogin(this.username, this.password);
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
