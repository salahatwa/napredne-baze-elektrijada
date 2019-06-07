import { OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'

export interface IListener {
  eventName: string
  observable$: Observable<any>
  handler: (data: any) => void
  subscription?: Subscription
}

export abstract class ObservableListener implements OnInit, OnDestroy {
  listeners: IListener[] = []
  ngOnInit() {
    this.initializeListeners()
    this.subscribeObservables()
  }

  ngOnDestroy() {
    this.unsubscribe()
  }

  subscribeObservables() {
    this.listeners.forEach(listener => {
      listener.subscription = listener.observable$.subscribe(listener.handler)
    })
  }

  unsubscribe() {
    this.listeners.forEach(listener => listener.subscription.unsubscribe())
  }

  abstract initializeListeners(): void
}
