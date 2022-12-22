import { Component } from '@angular/core';
import { pbSendMessage, pbLogOut, pbIsLoggedIn } from '../pocketbaseService';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  message: string = '';

  onMessageSend() {
    pbSendMessage(this.message);
    this.message = '';
  }
}
