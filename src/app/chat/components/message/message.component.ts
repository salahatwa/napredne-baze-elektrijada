import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @HostBinding('class.mine')
  @Input()
  isMine = false;

  constructor() {}

  ngOnInit() {}
}
