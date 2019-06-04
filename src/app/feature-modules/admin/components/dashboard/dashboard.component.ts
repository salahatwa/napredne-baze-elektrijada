import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core'
import { IUser } from 'src/app/models/user.interface'
import { ISection } from 'src/app/models/ISection'

class Entity<T> {
  array: T[]
  switch: boolean

  constructor(public template: TemplateRef<any>) {
    this.array = []
    this.switch = false
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('professorTemplate', { static: true })
  proffesorTemplate: TemplateRef<any>
  @ViewChild('sectionTemplate', { static: true })
  sectionTemplate: TemplateRef<any>

  entities: { [key: string]: Entity<any> }
  entititesArray: Entity<any>[]
  constructor() {}

  ngOnInit() {
    this.entities = {
      professor: new Entity<IUser>(this.proffesorTemplate),
      section: new Entity<ISection>(this.sectionTemplate),
    }

    this.entititesArray = Object.keys(this.entities).map(key => ({
      ...this.entities[key],
      name: key,
    }))
  }

  ngAfterViewInit() {}

  log(data) {
    console.log(data)
  }
}
