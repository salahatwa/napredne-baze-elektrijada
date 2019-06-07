import { Component, OnInit, Injector } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Chat } from './chat'
import { IChatSession } from 'src/app/models/IChatSession'
import { IUser } from 'src/app/models/user.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends Chat implements OnInit {
  public receiver: IUser
  constructor(private route: ActivatedRoute, private injector: Injector) {
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
        this.session.messages = res.data.docs
        this.totalMessages = res.data.total
        if (!this.session) {
          this.createTmpSession()
        }

        // this.updateScroll(null, true)

        // setTimeout(() => {
        //   this.initKeyboardRecognition()
        // }, 0)
      })
    })
  }
}
