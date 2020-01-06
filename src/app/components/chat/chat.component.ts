import { Component, OnInit, Injector, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Chat } from './chat'
import { IChatSession } from 'src/app/models/IChatSession'
import { IUser } from 'src/app/models/user.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends Chat implements OnInit, OnDestroy {
  public receiver: IUser
  constructor(private route: ActivatedRoute, injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.socketService.initSocket()
    this.initReceiver()
    super.ngOnInit()
  }
  ngOnDestroy() {
    super.ngOnDestroy()
  }

  createTmpSession() {
    this.session = {
      messages: [],
    } as IChatSession
  }

  initReceiver() {
    this.loadingMoreMessages = true
    this.route.paramMap.subscribe(paramMap => {
      this.receiverId = paramMap.get('id')
      this.chatService.getSessionByUserId(this.receiverId).subscribe(res => {
        this.loadingMoreMessages = false
        this.receiver = res.user
        this.receiverId = this.receiver._id
        this.session = res.session
        if (!this.session) {
          this.createTmpSession()
        } else {
          this.session.messages = res.data.docs
          this.totalMessages = res.data.total
        }

        // this.updateScroll(null, true)

        // setTimeout(() => {
        //   this.initKeyboardRecognition()
        // }, 0)
      })
    })
  }
}
