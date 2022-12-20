import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.css']
})
export class SignUpContainerComponent {
  username: String | undefined = '';
  password: String | undefined = '';

  onSignUp() {
    window.alert(`Sign up: ${this.username} and ${this.password}`);
    this.username="";
    this.password="";
  }

}
