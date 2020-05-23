import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from '../feature-modules/shared/shared.module';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MessageComponent } from './components/message/message.component';
import { AllSessionsComponent } from './components/all-sessions/all-sessions.component';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [
    ChatComponent,
    ChatInputComponent,
    MessageComponent,
    AllSessionsComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [SessionService],
  exports: [ChatComponent],
})
export class ChatModule {}
