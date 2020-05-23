import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Input() defaultImg = 'assets/images/thumbnail.svg';
  @Input() imgClasses: string;
  @ViewChild('imgInput', { static: true }) imgInput: ElementRef<HTMLElement>;

  image: File;
  imageURL: string = null;

  @Output() fileChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  fileAdded(event) {
    this.image = event.target.files[0] as File;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.imageURL = fileReader.result as string;
      this.fileChanged.emit(this.imageURL);
    };
    fileReader.readAsDataURL(this.image);
  }

  openFileExplorer() {
    this.imgInput.nativeElement.click();
  }

  reset() {
    this.image = null;
    this.imageURL = '';
  }
}
