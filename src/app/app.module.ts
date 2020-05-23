import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./feature-modules/shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { SectionComponent } from "./components/section/section.component";
import { PostCreateComponent } from "./components/post-create/post-create.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FreeInputDirective } from "./directives/free-input.directive";
import { ProfileComponent } from "./components/profile/profile.component";
import { ChatComponent } from "./components/chat/chat.component";
import { PostComponent } from "./components/post/post.component";
import { CommentCreateComponent } from "./components/comment-create/comment-create.component";
import { FormsModule } from "@angular/forms";
import { RequestHttpInterceptor as HttpApiInterceptor } from "./interceptors/http-api-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SectionComponent,
    PostCreateComponent,
    NavbarComponent,
    FreeInputDirective,
    ProfileComponent,
    ChatComponent,
    PostComponent,
    CommentCreateComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
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
