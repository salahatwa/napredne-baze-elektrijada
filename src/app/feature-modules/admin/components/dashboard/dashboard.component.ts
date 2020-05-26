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
import { GroupService, Group } from 'src/app/services/group.service';

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

  removeById?(id: string) {
    const itemIndex = this.array.findIndex((one) => one._id === id);
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
  @ViewChild('groupTemplate', { static: true })
  groupTemplate: TemplateRef<any>;

  entities: {
    professor: Entity<IUser>;
    section: Entity<ISection>;
    group: Entity<Group>;
  };
  entititesArray: (Entity<IUser | ISection> & { name: string })[];
  constructor(
    private professorService: ProfessorService,
    private sectionService: SectionService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.entities = {
      professor: new Entity<IUser>(this.proffesorTemplate, 'Professors'),
      section: new Entity<ISection>(this.sectionTemplate, 'Sections'),
      group: new Entity<Group>(this.groupTemplate, 'Groups'),
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
    this.groupService
      .fetchGroups()
      .subscribe((res) => this.entities.group.array.push(...res.docs));
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

  saveGroup(groupBody: Group, editing: boolean) {
    if (editing) {
      this.groupService
        .updateGroup(groupBody)
        .subscribe((group) => this.entities.group.update(group));
    } else {
      this.groupService
        .createGroup(groupBody)
        .subscribe((group) => this.entities.group.add(group));
    }
  }

  addSection(section: ISection, editing: boolean) {
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
          .subscribe(() => this.entities.professor.removeById(id));
      }

      if (entityName === 'section') {
        this.sectionService
          .deleteSection(id)
          .subscribe(() => this.entities.section.removeById(id));
      }
      if (entityName === 'group') {
        this.groupService
          .deleteGroup(id)
          .subscribe(() => this.entities.group.removeById(id));
      }
    }
  }
}
