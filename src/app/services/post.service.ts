import { PostTypes } from "src/app/constants/post-types.enum";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPost } from "../models/IPost";
import { environment } from "src/environments/environment";
import { IPaginationResponse } from "../models/IPaginationResponse";
import { IEvent } from "../models/IEvent";
import { IComment } from "../models/IComment";
import { makePagination } from "../common";

@Injectable({
  providedIn: "root",
})
export class PostService {
  public route = "sections/";
  constructor(private http: HttpClient) {}

  getPosts(sectionId?: string, skip?: number, take?: number) {
    const params = makePagination(skip, take);
    return this.http.get<IPaginationResponse<IPost>>(
      `${environment.API_ENDPOINT}${this.route}${sectionId}/posts`,
      { params }
    );
  }

  deletePost(postId: string) {
    // returns deleted object or throws 404 NOT FOUND
    return this.http.delete(
      `${environment.API_ENDPOINT}${this.route}posts/${postId}`
    );
  }

  addComment(postId: string, comment: IComment) {
    return this.http.post<IComment>(this.getCommentRoute(postId), comment);
  }

  loadMoreComments(postId: string, skip?: number, take: number = 15) {
    const params = makePagination(skip, take);
    return this.http.get<IPaginationResponse<IComment>>(
      this.getCommentRoute(postId),
      {
        params,
      }
    );
  }

  updatePost<T extends IPost>(post: T, postType: PostTypes) {
    return this.http.put<T>(
      `${environment.API_ENDPOINT}${this.route}posts/${post._id}`,
      {
        type: postType,
        post,
      } as ICreatePost
    );
  }

  createPost<T extends IPost>(post: T, sectionId: string, postType: PostTypes) {
    return this.http.post<T>(
      `${environment.API_ENDPOINT}${this.route}${sectionId}/posts`,
      {
        type: postType,
        post,
      } as ICreatePost
    );
  }

  private getCommentRoute(postId: string) {
    return `${environment.API_ENDPOINT}${this.route}posts/${postId}/comments`;
  }
}

export interface ICreatePost {
  type: PostTypes;
  post: IPost;
}
