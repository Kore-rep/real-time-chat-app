import { Message } from './../pocketbaseTypes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  pbGetRecentMessages,
  pbSubscribe,
  pbGetUser,
  pbGetCurrentUser,
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
  prevContainerHeight: number = 0;
  @ViewChild('msgs') messagesContainer!: ElementRef;

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
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    if (this._canScrollToBottom()) {
      this.scrollToBottom();
    }
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

  _canScrollToBottom(): boolean {
    var scrollHeight = this.messagesContainer.nativeElement.scrollHeight;
    var scrollTop = this.messagesContainer.nativeElement.scrollTop;
    var clientHeight = this.messagesContainer.nativeElement.clientHeight;
    var can =
      this.prevContainerHeight !== scrollHeight &&
      scrollTop + clientHeight === this.prevContainerHeight;

    this.prevContainerHeight = scrollHeight;
    return can;
  }

  ownMessage(message: Message): Boolean {
    return message.expand.user.id === pbGetCurrentUser()?.id;
  }
}
