import { Component } from '@angular/core';
import { pbSendMessage } from '../pocketbaseService';

@Component({
  selector: 'app-message-creator',
  templateUrl: './message-creator.component.html',
  styleUrls: ['./message-creator.component.css'],
})
export class MessageCreatorComponent {
  message: string = '';

  onMessageSend() {
    pbSendMessage(this.message);
    this.message = '';
  }
}
