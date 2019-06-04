import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-entity-crud',
  templateUrl: './entity-crud.component.html',
  styleUrls: ['./entity-crud.component.scss'],
})
export class EntityCrudComponent implements OnInit {
  @Input() title = 'Custom Toolbar'

  constructor() {}

  ngOnInit() {}
}
