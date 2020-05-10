import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IPaginationResponse } from "../models/IPaginationResponse";
import { ISection } from "../models/ISection";

@Injectable({
  providedIn: "root",
})
export class SectionService {
  public route = "sections/";
  constructor(private http: HttpClient) {}

  getSections() {
    return this.http.get<ISection[]>(environment.API_ENDPOINT + this.route);
  }

  getSectionById(sectionId: string) {
    return this.http.get<ISection>(
      `${environment.API_ENDPOINT}${this.route}${sectionId}`
    );
  }

  createSection(section: ISection) {
    return this.http.post<ISection>(
      environment.API_ENDPOINT + this.route,
      section
    );
  }

  updateSection(section: ISection) {
    return this.http.put<ISection>(
      environment.API_ENDPOINT + this.route + section._id,
      section
    );
  }

  deleteSection(sectionId: string) {
    return this.http.delete<ISection>(
      environment.API_ENDPOINT + this.route + sectionId
    );
  }
}
