import {
  convertBlobToBase64,
  isDeviceMobile,
  shouldItScroll,
  shouldItReallyScroll,
  justScrollItAlready,
} from 'src/app/common'
import { ISocketEvent, SocketService } from 'src/app/services/socket.service'
import { SocketEventTypes } from 'src/app/constants/socket-event-types'
import { IChatMessage } from 'src/app/models/IChatMessage'
import { IChatSession } from 'src/app/models/IChatSession'
import { Injector, OnInit, OnDestroy } from '@angular/core'
import { Keys } from 'src/app/models/keyboard-keys.enum'
import { AuthService } from 'src/app/services/auth/auth.service'
import { ChatService } from 'src/app/services/chat.service'
import { filter } from 'rxjs/operators'
import { ObservableListener } from 'src/app/models/ObservableListener'
import * as moment from 'moment'

export interface IMaintainScroll {
  chatContainer: HTMLElement
  scrollBottom: number
}

const MAX_NUMBER_OF_FILES = 4
export class Chat extends ObservableListener implements OnInit, OnDestroy {
  firstTimeScroll = true
  scrollForImages = true // slike koje se ucitavaju posle load more ne treba da skroluju
  isMobile = false
  loadingMoreMessages = false
  inputValue = ''
  textareaHeight = 34
  lineHeight = 26
  maxRows = 5
  mine: boolean
  session: IChatSession
  receiverId: string
  uploadingImages = false
  messages: IChatMessage[] = []
  totalMessages: number = 0
  loadingMessages = false

  enterEvent = new KeyboardEvent('keydown', {
    key: Keys.ENTER,
  })

  files: {
    binary: FileList
    base64: string[]
  } = {
      binary: null,
      base64: [],
    }
  protected chatService: ChatService
  protected authService: AuthService
  protected socketService: SocketService

  constructor(injector: Injector) {
    super()
    this.isMobile = isDeviceMobile()
    this.chatService = injector.get(ChatService)
    this.authService = injector.get(AuthService)
    this.socketService = injector.get(SocketService)
  }

  ngOnInit() {
    super.ngOnInit()
  }
  ngOnDestroy() {
    super.ngOnDestroy()
  }
  get userId(): string {
    return this.authService.user._id
  }

  public submitOnEnter(event) {
    if (event.key === Keys.ENTER && !event.shiftKey) {
      event.target.form.dispatchEvent(
        new Event('submit', {
          cancelable: true,
        })
      )
      event.preventDefault() // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
  }

  public openImage(url: string) {
    window.open(url)
  }

  public updateScroll(action?: () => void, override?: boolean) {
    setTimeout(() => {
      const shouldScroll = override ? override : shouldItScroll('chat') // calculates if scroll is at the bottom
      const scroll = shouldItReallyScroll('chat', this.firstTimeScroll, shouldScroll) // determines that user is not scrolling atm
      this.scrollForImages = scroll
      this.firstTimeScroll = false
      if (action) {
        action()
      }
      if (scroll) {
        setTimeout(() => {
          justScrollItAlready('chat')
        }, 0)
      }
    }, 0)
  }

  resetFiles() {
    this.files.base64 = []
    this.files.binary = null
  }

  sendMessage(receiverId: string) {
    const message = {
      text: this.inputValue.trim(),
      sender: this.userId,
      ref: this.newMessageReference,
      filesBase64: this.files.base64,
      session: this.session._id,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    } as IChatMessage

    this.updateScroll(() => {
      this.session.messages.push({ ...message, files: this.files.base64 }) // this window  me
      this.totalMessages++
      this.resetFiles()
    })

    this.uploadingImages = true

    this.chatService.sentPrivateMessage(message, receiverId).subscribe()
    this.inputValue = ''
  }

  get newMessageReference(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15) +
      '-' +
      Date.now() +
      '-' +
      this.receiverId +
      '-' +
      this.userId
    )
  }

  loadMoreMessages(maintainScroll?: IMaintainScroll) {
    if (this.canLoadMoreMessages) {
      this.scrollForImages = false
      const loaderHeight = 42

      this.loadingMessages = true
      this.chatService
        .getSessionBySessionId(this.session._id, this.session.messages.length)
        .subscribe(response => {
          // set total count
          this.totalMessages = response.data.total
          this.session.messages = [...response.data.docs, ...this.session.messages]
        })
    }
  }

  get canLoadMoreMessages(): boolean {
    return this.session.messages.length < this.totalMessages
  }

  private receiveMessage(message: IChatMessage) {
    const chatMessage = this.session.messages.find(msg => msg.ref === message.ref)

    if (message.ref && chatMessage) {
      // this window
      chatMessage._id = message._id
    } else {
      // this.updateScroll(() => {
      this.session.messages.push(message)
      this.totalMessages++
      // })
    }
  }

  initializeListeners() {
    this.listeners = [
      {
        eventName: SocketEventTypes.MESSAGE,
        handler: (
          event: ISocketEvent<{
            message: IChatMessage
            session: IChatSession
            sessionsCount: number
          }>
        ) => {
          if (!this.session._id) {
            const myIds = [this.userId, this.receiverId]
            if (
              event.data.session.participants.every(user => {
                return myIds.includes(user._id)
              })
            ) {
              // prva poruka stize dobijam sessionId
              const chatMessages = this.session.messages
              this.session = event.data.session
              this.session.messages = chatMessages
              this.receiveMessage(event.data.message)
            }
          } else {
            this.receiveMessage(event.data.message)
          }
        },
        observable$: this.socketService.socketSubject.pipe(
          filter(
            (
              data: ISocketEvent<{
                message: IChatMessage
                session: IChatSession
                sessionsCount: number
              }>
            ) =>
              data.type === SocketEventTypes.MESSAGE &&
              (!this.session._id || data.data.session._id === this.session._id)
          )
        ),
      },
    ]
  }

  fileAdded(event: Event) {
    this.files.binary = (event.target as any).files as FileList
    if (this.files.binary.length <= MAX_NUMBER_OF_FILES) {
      this.files.base64 = []
      const promises: Promise<string>[] = []
      for (let i = 0; i < this.files.binary.length; i++) {
        promises.push(convertBlobToBase64(this.files.binary.item(i)))
      }

      Promise.all(promises).then(values => {
        this.files.base64.push(...values)
        this.sendMessage(this.receiverId)
          ; (event.target as any).value = ''
      })
    } else {
      alert(`Maksimalan broj slika: ${MAX_NUMBER_OF_FILES}`)
      this.resetFiles()
    }
  }
}
