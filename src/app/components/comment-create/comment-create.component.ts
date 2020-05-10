import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormComponent } from "src/app/models/FormComponent";
import { IComment } from "src/app/models/IComment";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-comment-create",
  templateUrl: "./comment-create.component.html",
  styleUrls: ["./comment-create.component.scss"],
})
export class CommentCreateComponent extends FormComponent<IComment>
  implements OnInit {
  text: string;
  imageURL: string;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {}

  submit() {
    super.submit();
    const newComment = {
      imageBase64: this.imageURL,
      text: this.text,
    } as IComment;
    this.submitted.emit(newComment);
    this.resetForm();
  }

  resetForm() {
    this.text = "";
    this.imageURL = undefined;
  }
}
