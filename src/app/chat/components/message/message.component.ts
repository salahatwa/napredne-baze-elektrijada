import { Component, OnInit, HostBinding, Input } from '@angular/core';

type MessageColor = 'primary' | 'default';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @HostBinding('class.mine')
  @Input()
  isMine = false;

  @HostBinding('style.color')
  private _color: string;

  @HostBinding('style.background-color')
  private _bgColor: string;

  @Input()
  set color(value: MessageColor) {
    if (value === 'primary') {
      this._color = 'white';
      this._bgColor = '#3f51b5';
    }
  }

  constructor() {}

  ngOnInit() {}
}
