import { EventEmitter, Output } from '@angular/core'

export class FormComponent {
  @Output() finished = new EventEmitter()
}
