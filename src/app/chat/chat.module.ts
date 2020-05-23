import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from '../feature-modules/shared/shared.module';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [ChatComponent, ChatInputComponent, MessageComponent],
  imports: [CommonModule, SharedModule],
  exports: [ChatComponent],
})
export class ChatModule {}
