import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appFreeInput]',
})
export class FreeInputDirective {
  constructor(el: ElementRef) {
    const htmlEl = el.nativeElement as HTMLElement
    htmlEl.setAttribute('spellcheck', 'false')
    htmlEl.setAttribute('autocomplete', 'off')
    htmlEl.setAttribute('autocorrect', 'off')
  }
}
