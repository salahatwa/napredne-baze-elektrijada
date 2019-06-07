import { Component, OnInit } from '@angular/core'
import { ISection } from 'src/app/models/ISection'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sections: ISection[] = Array.from({ length: 30 }, (v, i) => ({
    name: `Section ${i + 1}`,
    imageURL: null
  }))
  constructor() {}

  ngOnInit() {}
}
