import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hoverable]',
})
export class HoverableDirective {
  tmpStyles: any = {}
  constructor(private el: ElementRef<HTMLElement>) {
    this.tmpStyles = {
      color: this.el.nativeElement.style.color,
      textDecoration: this.el.nativeElement.style.textDecoration,
      cursor: this.el.nativeElement.style.cursor,
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.color = '#3F51B5'
    this.el.nativeElement.style.textDecoration = 'underline'
    this.el.nativeElement.style.cursor = 'pointer'
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.color = this.tmpStyles.color
    this.el.nativeElement.style.textDecoration = this.tmpStyles.textDecoration
    this.el.nativeElement.style.cursor = this.tmpStyles.cursor
  }
}
