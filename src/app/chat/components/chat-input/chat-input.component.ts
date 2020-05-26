import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { isDeviceMobile } from 'src/app/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChatInputComponent),
      multi: true,
    },
  ],
})
export class ChatInputComponent implements OnInit, ControlValueAccessor {
  @Input() paddingString = '8px 12px';
  @Input() disabled = false;

  @Output()
  enter = new EventEmitter<KeyboardEvent>();

  fontSize = '16px';
  lineHeight = '20px';
  maxRows = 4;
  placeholder = 'Type your message';
  value: string;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  height: number;
  maxHeight: number;
  lineHeightVal: number;

  onChange = () => {};
  onTouched = () => {};

  @ViewChild('textarea', { static: true })
  textarea: ElementRef<HTMLTextAreaElement>;

  resize = () =>
    /** Put the resize function at the end of the event loop
     *  in order to give textarea a time to rerender
     */
    setTimeout(() => {
      const el = this.textarea.nativeElement;
      el.style.height = '0';
      const { scrollHeight } = el;
      const newHeight =
        scrollHeight -
        ((scrollHeight - (this.padding.top + this.padding.bottom)) %
          this.lineHeightVal);
      el.style.height = newHeight + 'px';
      if (newHeight <= this.maxHeight) {
        el.style.overflow = 'hidden';
      } else {
        el.style.overflow = 'auto';
      }
    }, 0);

  /** We need to extract exact padding values in order to set proper [max]height */
  extractPaddingValues() {
    const matches = this.paddingString.match(/(\d+)/g).map(Number);
    switch (matches.length) {
      case 1: {
        const [value] = matches;
        this.padding = {
          top: value,
          right: value,
          bottom: value,
          left: value,
        };
        break;
      }

      case 2: {
        const [valueY, valueX] = matches;
        this.padding = {
          top: valueY,
          right: valueX,
          bottom: valueY,
          left: valueX,
        };
        break;
      }

      case 3: {
        const [valueTop, valueX, valueBottom] = matches;
        this.padding = {
          top: valueTop,
          right: valueX,
          bottom: valueBottom,
          left: valueX,
        };
        break;
      }

      case 4: {
        const [valueTop, valueRight, valueBottom, valueLeft] = matches;
        this.padding = {
          top: valueTop,
          right: valueRight,
          bottom: valueBottom,
          left: valueLeft,
        };
        break;
      }
    }
  }

  constructor() {
    this.extractPaddingValues();
    this.lineHeightVal = Number.parseInt(this.lineHeight);

    /** set initial and calculate max height */
    this.maxHeight =
      this.maxRows * this.lineHeightVal +
      this.padding.top +
      this.padding.bottom;
    this.height = this.padding.top + this.padding.bottom + this.lineHeightVal;
  }

  writeValue(obj: string): void {
    this.textarea.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  onKeyDown(ev: KeyboardEvent) {
    this.onTouched();
    if (ev.key === 'Enter') {
      if (!isDeviceMobile()) {
        /** desktop environment */
        if (!ev.shiftKey) {
          /** Only enter was pressed */
          ev.preventDefault();
          this.enter.emit(ev);
        }
      }
    }

    this.resize();
  }
}
