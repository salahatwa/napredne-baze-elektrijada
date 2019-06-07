import { Component, OnInit } from '@angular/core'
import { ISection } from 'src/app/models/ISection'
import { ActivatedRoute } from '@angular/router'
import { PostTypes } from 'src/app/constants/post-types.enum'
import { IPost } from 'src/app/models/IPost'

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  postTypes = PostTypes
  creatingAtm = PostTypes.NONE
  section: ISection
  posts: IPost[] = []

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => (this.section = { name: params.get('id'), imageURL: null })
    )
  }

  addPost(post: IPost) {
    this.posts = [post, ...this.posts]
  }

  removePost(post: IPost) {
    this.posts = this.posts.filter(p => post !== p)
  }
}
