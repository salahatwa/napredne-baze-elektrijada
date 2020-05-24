import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostTypes } from "src/app/constants/post-types.enum";
import * as _moment from "moment";
import * as _rollupMoment from "moment";
import { FormComponent } from "src/app/models/FormComponent";
import { IPost } from "src/app/models/IPost";
import { AuthService } from "src/app/services/auth/auth.service";
import { IEvent } from "src/app/models/IEvent";

const moment = _rollupMoment || _moment;
const arrayMaker = (length: number) =>
  Array.from({ length }, (v, index) =>
    index < 10 ? `0${index}` : index.toString()
  );

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent extends FormComponent<IPost>
  implements OnInit {
  @Input() postType = PostTypes.POST;
  @Input() post: IPost;

  array24 = arrayMaker(24);
  array60 = arrayMaker(60);

  myContext = { name: "nesto" };

  postTypes = PostTypes;
  postForm: FormGroup;

  essentialFormObj(post: IPost) {
    return {
      title: [post ? post.title : "", Validators.required],
      text: [
        post ? post.text : "",
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(1000),
        ],
      ],
    };
  }

  timeFormObj(post: IEvent) {
    return {
      hour: [post ? post.startTime.hour : "00", Validators.required],
      minute: [post ? post.startTime.minute : "00", Validators.required],
      second: [post ? post.startTime.second : "00", Validators.required],
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm(this.post);
  }

  buildForm(post: IPost) {
    if (this.postType === PostTypes.POST) {
      this.postForm = this.formBuilder.group(this.essentialFormObj(post));
    }

    if (this.postType === PostTypes.EVENT) {
      const event = post as IEvent;
      this.postForm = this.formBuilder.group({
        ...this.essentialFormObj(event),
        startsAt: moment(event ? event.startsAt : undefined),
        endsAt: moment(event ? event.startsAt : undefined),
        startTime: this.formBuilder.group(this.timeFormObj(event)),
        endTime: this.formBuilder.group(this.timeFormObj(event)),
      });
    }
  }

  submit() {
    this.submitted.emit(this.postForm.value);
  }

  get isPost(): boolean {
    return this.postType === PostTypes.POST;
  }
}
