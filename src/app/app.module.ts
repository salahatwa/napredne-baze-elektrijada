import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './feature-modules/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SectionComponent } from './components/section/section.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { CommentCreateComponent } from './components/comment-create/comment-create.component';
import { FormsModule } from '@angular/forms';
import { RequestHttpInterceptor as HttpApiInterceptor } from './interceptors/http-api-interceptor';
import { ChatModule } from './chat/chat.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { SharePostComponent } from './dialogs/share-post/share-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SectionComponent,
    PostCreateComponent,
    NavbarComponent,
    ProfileComponent,
    PostComponent,
    CommentCreateComponent,
    NotificationsComponent,
    SharePostComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ChatModule,
    MatBadgeModule,
    MatMenuModule,
  ],
  entryComponents: [SharePostComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
