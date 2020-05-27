import { Roles } from 'src/app/services/auth/roles.enum';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SectionService } from 'src/app/services/section.service';
import { Component, OnInit } from '@angular/core';
import { ISection } from 'src/app/models/ISection';
import { ActivatedRoute } from '@angular/router';
import { PostTypes } from 'src/app/constants/post-types.enum';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post.service';
import { SubsinkService } from 'src/app/services/subsink.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  providers: [SubsinkService],
})
export class SectionComponent implements OnInit {
  postTypes = PostTypes;
  creatingAtm: PostTypes = PostTypes.NONE;
  section: ISection;
  sectionId: string;
  posts: IPost[] = [];
  totalPosts: number;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private sectionService: SectionService,
    private authService: AuthService,
    private subsink: SubsinkService
  ) {}

  ngOnInit() {
    this.subsink.add(
      this.route.paramMap.subscribe((params) => {
        this.sectionId = params.get('id');
        this.loadSection();
        this.loadSectionPosts();
      })
    );
  }

  loadSection() {
    this.sectionService.getSectionById(this.sectionId).subscribe((section) => {
      this.section = section;
    });
  }

  loadSectionPosts(skip?: number, take?: number) {
    this.postService
      .getPosts(this.sectionId, skip, take)
      .subscribe(({ docs, total }) => {
        this.totalPosts = total;
        this.posts = [...this.posts, ...docs];

        setTimeout(
          () =>
            this.subsink.add(
              this.route.fragment.subscribe((fragment) => {
                const el = document.getElementById(fragment);
                if (el) {
                  el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }
              })
            ),
          500
        );
      });
  }

  addPost(postBody: IPost) {
    this.postService
      .createPost(postBody, this.sectionId, this.creatingAtm)
      .subscribe((post) => {
        this.posts = [{ ...post, comments: [] }, ...this.posts];
        this.creatingAtm = PostTypes.NONE;
      });
  }

  removePost(post: IPost) {
    if (confirm('Are you sure you want to remove post?')) {
      this.postService.deletePost(post._id).subscribe(() => {
        this.posts = this.posts.filter(
          (currentPosts) => currentPosts._id !== post._id
        );
      });
    }
  }
}
