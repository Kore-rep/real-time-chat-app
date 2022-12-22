import { Message } from './../pocketbaseTypes';
import { Component } from '@angular/core';
import {
  pbGetRecentMessages,
  pbSubscribe,
  pbGetUser,
} from '../pocketbaseService';
import { UnsubscribeFunc } from 'pocketbase';

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.css'],
})
export class MessagesContainerComponent {
  messages: Message[] = [];
  unsubscribe!: UnsubscribeFunc;

  async ngOnInit() {
    this.messages = (await pbGetRecentMessages()).items;
    this.unsubscribe = await pbSubscribe(
      'messages',
      async ({ action, record }) => {
        const user = await pbGetUser(record.user);
        record.expand = { user };
        this.messages = [...this.messages, record];
      }
    );
    console.log(this.messages);
  }

  async ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
