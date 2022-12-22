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
  TAKE: number = 50;
  PAGE: number = 1;
  shouldScrollToPrevious: boolean = false;
  totalPages: number = 0;
  totalMessages: number = 0;

  async ngOnInit() {
    const messagesResponse = await pbGetRecentMessages(this.PAGE, this.TAKE);
    this.messages = messagesResponse.items;
    this.totalPages = messagesResponse.totalPages;
    this.totalMessages = messagesResponse.totalItems;
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

  isOwnMessage(message: Message): Boolean {
    return message.expand.user.id === pbGetCurrentUser()?.id;
  }
}
