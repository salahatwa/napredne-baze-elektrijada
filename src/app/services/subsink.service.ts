import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubsinkService implements OnDestroy {
  private _subs: Array<Subscription> = [];

  constructor() {}

  add(...subscriptions: Subscription[]) {
    this._subs.push(...subscriptions);
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
