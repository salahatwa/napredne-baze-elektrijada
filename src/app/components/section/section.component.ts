import { Component, OnInit } from '@angular/core'
import { ISection } from 'src/app/models/ISection'
import { ActivatedRoute } from '@angular/router'
import { PostTypes } from 'src/app/constants/post-types.enum'

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  postTypes = PostTypes
  creatingAtm = PostTypes.NONE
  section: ISection

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => (this.section = { name: params.get('id') }))
  }
}
