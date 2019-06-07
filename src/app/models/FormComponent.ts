import { EventEmitter, Output } from '@angular/core'

export class FormComponent<T> {
  @Output() finished = new EventEmitter()
  @Output() submitted = new EventEmitter<T>()

  submit() {
    this.finished.emit()
  }

  cancel() {
    this.finished.emit()
  }
}
