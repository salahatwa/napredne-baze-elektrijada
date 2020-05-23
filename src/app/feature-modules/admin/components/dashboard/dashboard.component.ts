import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { IUser } from 'src/app/models/user.interface';
import { ISection } from 'src/app/models/ISection';
import { ProfessorService } from 'src/app/services/professor.service';
import { SectionService } from 'src/app/services/section.service';

class Entity<T extends { _id?: string }> {
  array: T[];
  switch: boolean;

  constructor(public template: TemplateRef<any>, public title: string) {
    this.array = [];
    this.switch = false;
  }

  add?(item: T) {
    this.array.push(item);
  }

  remove?(item: T) {
    const itemIndex = this.array.findIndex((one) => item._id === one._id);
    this.array.splice(itemIndex, 1);
  }

  update?(item: T) {
    const itemIndex = this.array.findIndex((one) => item._id === one._id);
    if (itemIndex !== -1) {
      this.array[itemIndex] = item;
    }
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('professorTemplate', { static: true })
  proffesorTemplate: TemplateRef<any>;
  @ViewChild('sectionTemplate', { static: true })
  sectionTemplate: TemplateRef<any>;

  entities: { professor: Entity<IUser>; section: Entity<ISection> };
  entititesArray: (Entity<IUser | ISection> & { name: string })[];
  constructor(
    private professorService: ProfessorService,
    private sectionService: SectionService
  ) {}

  ngOnInit() {
    this.entities = {
      professor: new Entity<IUser>(this.proffesorTemplate, 'Professors'),
      section: new Entity<ISection>(this.sectionTemplate, 'Sections'),
    };

    this.entititesArray = Object.keys(this.entities).map((key) => ({
      ...this.entities[key],
      name: key,
    }));

    this.professorService
      .getProfessors()
      .subscribe((res) => this.entities.professor.array.push(...res.docs));

    this.sectionService
      .getSections()
      .subscribe((sections) => this.entities.section.array.push(...sections));
  }

  ngAfterViewInit() {}

  addProfessor(professor: IUser, editing: boolean) {
    console.log(professor);
    if (editing) {
      this.professorService
        .updateProfessor(professor)
        .subscribe((user) => this.entities.professor.update(user));
    } else {
      this.professorService
        .createProfessor(professor)
        .subscribe((user) => this.entities.professor.add(user));
    }
  }

  addSection(section: ISection, editing: boolean) {
    console.log('here');
    if (editing) {
      this.sectionService
        .updateSection(section)
        .subscribe((sec) => this.entities.section.update(sec));
    } else {
      this.sectionService
        .createSection(section)
        .subscribe((sec) => this.entities.section.add(sec));
    }
  }

  delete(entityName: string, id: string) {
    if (confirm('Are you sure you want to delete a ' + entityName)) {
      if (entityName === 'professor') {
        this.professorService
          .deleteProfessor(id)
          .subscribe((user) => this.entities.professor.remove(user));
      }

      if (entityName === 'section') {
        this.sectionService
          .deleteSection(id)
          .subscribe((section) => this.entities.section.remove(section));
      }
    }
  }

  log(data) {
    console.log(data);
  }
}
