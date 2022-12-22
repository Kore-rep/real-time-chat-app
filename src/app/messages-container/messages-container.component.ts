import { Message } from './../pocketbaseTypes';
import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('msgs')
  messagesContainer!: ElementRef;

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
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async ngOnDestroy(): Promise<void> {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
