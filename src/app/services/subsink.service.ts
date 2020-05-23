import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubsinkService implements OnDestroy {
  subs: Array<Subscription> = [];

  constructor() {}

  add(...subscriptions: Subscription[]) {
    this.subs.push(...subscriptions);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
