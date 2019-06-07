// // import {
// //   isDeviceMobile,
// //   shouldItScroll,
// //   shouldItReallyScroll,
// //   justScrollItAlready,
// // } from '../../../../../helpers/common'
// // import { ChatService, ISession } from './chat.service'
// // import {
// //   IMessage,
// //   ISocketEvent,
// //   SocketService,
// // } from '../../../../../services/socket/socket.service'
// // import { Injector, OnInit } from '@angular/core'
// // import { UserService, Roles } from '../../../../../services/user.service'
// // import { Keys } from '../../../../../models/keyboard-keys.enum'
// // import { ObservableListener } from '../../../../../models/ObservableListener'
// // import { SocketEventTypes } from '../../../../../shared/socketEvents'
// // import { filter } from 'rxjs/operators'
// // import { convertBlobToBase64 } from '../../../diet-trainer/common'
// // import { IUser } from '../../../../../models/User'

// export interface IMaintainScroll {
//   chatContainer: HTMLElement
//   scrollBottom: number
// }

// const MAX_NUMBER_OF_FILES = 4
// export class Chat extends ObservableListener implements OnInit {
//   firstTimeScroll = true
//   scrollForImages = true // slike koje se ucitavaju posle load more ne treba da skroluju
//   isMobile = false
//   loadingMoreMessages = false
//   inputValue = ''
//   textareaHeight = 34
//   lineHeight = 26
//   maxRows = 5
//   mine: boolean
//   session: ISession
//   receiverId: number
//   uploadingImages = false
//   messages: IMessage[] = []
//   loadingMessages = false
//   seenCirclePosition: number
//   animationForSeenCircleOn = true
//   lastSeenMsgRef: HTMLElement = null
//   deliveredCirclesSvgs = deliveredCircles
//   userId1: number

//   enterEvent = new KeyboardEvent('keydown', {
//     key: Keys.ENTER,
//   })

//   files: {
//     binary: FileList
//     base64: string[]
//   } = {
//     binary: null,
//     base64: [],
//   }
//   protected chatService: ChatService
//   protected userService: UserService
//   protected socketService: SocketService

//   constructor(injector: Injector) {
//     super()
//     this.isMobile = isDeviceMobile()
//     this.chatService = injector.get(ChatService)
//     this.userService = injector.get(UserService)
//     this.socketService = injector.get(SocketService)
//   }

//   ngOnInit(): void {
//     this.userService.authStatus.subscribe(user => {
//       this.userId1 = user.id
//     })
//   }

//   get userId() {
//     return this.userId1
//   }

//   public submitOnEnter(event) {
//     if (event.key === Keys.ENTER && !event.shiftKey) {
//       event.target.form.dispatchEvent(
//         new Event('submit', {
//           cancelable: true,
//         })
//       )
//       event.preventDefault() // Prevents the addition of a new line in the text field (not needed in a lot of cases)
//     }
//   }

//   public openImage(url: string) {
//     window.open(url)
//   }

//   public updateScroll(action?: () => void, override?: boolean) {
//     setTimeout(() => {
//       const shouldScroll = override ? override : shouldItScroll('chat') // calculates if scroll is at the bottom
//       const scroll = shouldItReallyScroll('chat', this.firstTimeScroll, shouldScroll) // determines that user is not scrolling atm
//       this.scrollForImages = scroll
//       this.firstTimeScroll = false
//       if (action) {
//         action()
//       }
//       if (scroll) {
//         setTimeout(() => {
//           justScrollItAlready('chat')
//         }, 0)
//       }
//     }, 0)
//   }

//   resetFiles() {
//     this.files.base64 = []
//     this.files.binary = null
//   }

//   sendMessage(receiverId: number) {
//     const message = {
//       payload: this.inputValue.trim(),
//       sender_id: this.userId,
//       ref: this.newMessageReference,
//       status: 1,
//       files: this.files.binary,
//     } as IMessage

//     const formData = this.createFormData(message)
//     if (this.session.id) {
//       this.session.participants.find(user => user.id !== this.userId).details.unseen++
//     }
//     this.updateScroll(() => {
//       this.session.chatMessages.push({ ...message, files: this.files.base64 }) // this window  me
//       message.created_at = this.createBackendDate()
//       this.resetFiles()
//     })

//     this.uploadingImages = true
//     const session = this.chatService.chatHeads.find(
//       head => head.sessionId === this.session.id
//     )
//     if (session) {
//       session.lastMessage = message
//     }

//     this.chatService.sendMessageTo(receiverId, formData).subscribe(messageResponse => {})
//     this.inputValue = ''
//   }

//   createFormData(obj: any): FormData {
//     const formData = new FormData()
//     for (const prop in obj) {
//       if (obj[prop]) {
//         if (obj[prop] instanceof FileList) {
//           const files: FileList = obj[prop]
//           for (let i = 0; i < files.length; i++) {
//             formData.append(`${prop}[]`, files.item(i), files.item(i).name)
//           }
//         } else {
//           formData.append(prop, obj[prop])
//         }
//       }
//     }
//     return formData
//   }

//   createBackendDate(): string {
//     const now = new Date()
//     const transformToTwoDigits = value => {
//       return value / 10 < 1 ? `0${value}` : value
//     }
//     const ret = `${now.getFullYear()}-${transformToTwoDigits(
//       now.getMonth() + 1
//     )}-${transformToTwoDigits(now.getDate())} ${transformToTwoDigits(
//       now.getHours()
//     )}:${transformToTwoDigits(now.getMinutes())}:${transformToTwoDigits(
//       now.getSeconds()
//     )}`
//     return ret
//   }

//   get newMessageReference(): string {
//     return (
//       Math.random()
//         .toString(36)
//         .substring(2, 15) +
//       Math.random()
//         .toString(36)
//         .substring(2, 15) +
//       '-' +
//       Date.now() +
//       '-' +
//       this.receiverId +
//       '-' +
//       this.userId
//     )
//   }

//   loadMoreMessages(maintainScroll?: IMaintainScroll) {
//     if (this.session.nextPageId) {
//       this.scrollForImages = false
//       const loaderHeight = 42
//       if (this.lastSeenMsgRef) {
//         this.animationForSeenCircleOn = false // without animation
//         this.moveSeenCircle(loaderHeight) // keep seen circle in position when loader shows up
//       }
//       this.loadingMessages = true
//       this.chatService
//         .loadMoreMessages(this.session.nextPageId, this.session.id)
//         .subscribe(response => {
//           this.session.nextPageId = response.data.nextPageId
//           this.session.chatMessages = [
//             ...response.data.messages,
//             ...this.session.chatMessages,
//           ]

//           if (maintainScroll) {
//             // options
//             const config = {
//               attributes: false,
//               childList: true,
//               characterData: false,
//               subtree: false,
//             }
//             // instance
//             const observer = new MutationObserver(mutations => {
//               maintainScroll.chatContainer.scrollTop =
//                 maintainScroll.chatContainer.scrollHeight -
//                 maintainScroll.scrollBottom -
//                 loaderHeight
//               this.moveSeenCircle() // then replace old seen circle position with the new one
//               setTimeout(() => (this.animationForSeenCircleOn = true), 0) // recover animation when other operations finish
//               this.loadingMessages = false
//             })
//             observer.observe(maintainScroll.chatContainer, config)
//             setTimeout(() => observer.disconnect(), 0)
//           }
//         })
//     }
//   }

//   get canLoadMoreMessages(): boolean {
//     return (
//       !this.loadingMessages && this.session !== null && this.session.nextPageId !== null
//     )
//   }

//   private receiveMessage(message: IMessage) {
//     const chatMessage = this.session.chatMessages.find(msg => msg.ref === message.ref)
//     let shouldIncrementSeen = true
//     if (message.ref && chatMessage) {
//       // this window
//       chatMessage.status = 2
//       chatMessage.id = message.id
//     } else {
//       const isMsgSenderMe: boolean = message.sender_id === this.userId
//       if (isMsgSenderMe) {
//         // my other windows
//         this.session.participants.find(user => user.id !== this.userId).details.unseen++
//       } else {
//         // receiver windows
//         this.session.participants.find(user => user.id === this.userId).details.unseen++
//         const input = document.getElementById('inputValue')
//         if (input && document.activeElement === input) {
//           shouldIncrementSeen = false
//           this.seeSession()
//         }
//       }
//       this.updateScroll(() => {
//         this.session.chatMessages.push(message)
//         this.moveSeenCircle()
//       }) // other windows (me) + everyone else
//     }
//   }

//   initializeListeners() {
//     this.listeners = [
//       {
//         eventName: SocketEventTypes.MESSSAGE,
//         handler: (
//           event: ISocketEvent<{
//             message: IMessage
//             session: ISession
//             sessionsCount: number
//           }>
//         ) => {
//           if (!this.session.id) {
//             const myIds = [this.userId, this.receiverId]
//             if (
//               event.data.session.participants.every(user => {
//                 return myIds.includes(user.id)
//               })
//             ) {
//               const chatMessages = this.session.chatMessages
//               this.session = event.data.session
//               this.session.chatMessages = chatMessages
//               this.receiveMessage(event.data.message)
//             }
//           } else {
//             this.receiveMessage(event.data.message)
//           }
//         },
//         observable$: this.socketService.socketSubject.pipe(
//           filter(
//             (
//               data: ISocketEvent<{
//                 message: IMessage
//                 session: ISession
//                 sessionsCount: number
//               }>
//             ) =>
//               data.type === SocketEventTypes.MESSSAGE &&
//               (!this.session.id || data.data.session.id === this.session.id)
//           )
//         ),
//       },
//       {
//         eventName: SocketEventTypes.READ_MESSAGE,
//         handler: (
//           data: ISocketEvent<{
//             sessionId: number
//             userId: number
//           }>
//         ) => {
//           if (this.session.id === +data.data.sessionId) {
//             this.session.participants.find(
//               user => user.id === data.data.userId
//             ).details.unseen = 0
//             this.moveSeenCircle()
//           }
//         },
//         observable$: this.socketService.socketSubject.pipe(
//           filter(
//             (
//               data: ISocketEvent<{
//                 sessionId: number
//                 userId: number
//               }>
//             ) => data.type === SocketEventTypes.READ_MESSAGE
//           )
//         ),
//       },
//       {
//         eventName: SocketEventTypes.CHANGE_TRAINER,
//         handler: (
//           data: ISocketEvent<{
//             oldTrainer: IUser
//             newTrainer: IUser
//             client: IUser
//           }>
//         ) => {
//           if (this.userId === +data.data.client.id) {
//             this.receiverId = data.data.newTrainer.id
//           }
//         },
//         observable$: this.socketService.socketSubject.pipe(
//           filter(
//             (
//               data: ISocketEvent<{
//                 oldTrainer: IUser
//                 newTrainer: IUser
//                 client: IUser
//               }>
//             ) => data.type === SocketEventTypes.CHANGE_TRAINER
//           )
//         ),
//       },
//     ]
//   }

//   fileAdded(event: Event) {
//     this.files.binary = (event.target as any).files as FileList
//     if (this.files.binary.length <= MAX_NUMBER_OF_FILES) {
//       this.files.base64 = []
//       const promises: Promise<string>[] = []
//       for (let i = 0; i < this.files.binary.length; i++) {
//         promises.push(convertBlobToBase64(this.files.binary.item(i)))
//       }

//       Promise.all(promises).then(values => {
//         this.files.base64.push(...values)
//         this.sendMessage(this.receiverId)
//         ;(event.target as any).value = ''
//       })
//     } else {
//       alert(`Maksimalan broj slika: ${MAX_NUMBER_OF_FILES}`)
//       this.resetFiles()
//     }
//   }

//   moveSeenCircle(includedOffset: number = 0) {
//     if (this.userService.checkRole(Roles.CLIENT) || !this.session.id) {
//       return
//     }
//     const position = this.session.chatMessages.length - this.unseenCount - 1
//     if (position >= 0) {
//       const msgId = this.session.chatMessages[position].id
//       this.lastSeenMsgRef = document.getElementById(`${msgId}`)
//       if (this.lastSeenMsgRef) {
//         const staticOffset = 16
//         this.seenCirclePosition =
//           this.lastSeenMsgRef.offsetTop +
//           this.lastSeenMsgRef.offsetHeight -
//           staticOffset +
//           includedOffset
//       }
//     }
//   }

//   seeSession() {
//     if (
//       this.session.id &&
//       this.session.participants.find(user => user.id === this.userId).details.unseen > 0
//     ) {
//       this.chatService
//         .seenSession(this.session.id)
//         .subscribe(() => this.chatService.sessionOpenedSubject.next(this.session.id))
//     }
//   }

//   get unseenCount(): number {
//     return this.session.id
//       ? this.session.participants.find(user => user.id === this.receiverId).details.unseen
//       : 0
//   }
// }
