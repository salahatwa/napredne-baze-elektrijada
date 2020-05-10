import { SectionService } from "src/app/services/section.service";
import { Component, OnInit } from "@angular/core";
import { ISection } from "src/app/models/ISection";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  sections: ISection[] = [];
  constructor(private sectionService: SectionService) {}

  ngOnInit() {
    this.loadSections();
  }

  loadSections() {
    this.sectionService.getSections().subscribe((sections) => {
      this.sections = sections;
    });
  }
}
