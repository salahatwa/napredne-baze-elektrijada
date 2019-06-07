import { Component, OnInit, Input } from '@angular/core'
import { ISection } from 'src/app/models/ISection'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { FormComponent } from 'src/app/models/FormComponent'

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent extends FormComponent<ISection> implements OnInit {
  toppings = new FormControl()
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni']
  @Input() section: ISection
  sectionForm: FormGroup = this.buildForm()

  constructor(private formBuilder: FormBuilder) {
    super()
    if (this.section) {
      this.sectionForm = this.buildForm(this.section)
    }
  }

  ngOnInit() {}

  buildForm(section?: ISection) {
    return this.formBuilder.group({
      imageURL: [section ? section.imageURL : ''],
      name: [section ? section.name : '', Validators.required],
    })
  }

  get editing(): boolean {
    return this.section !== null
  }
}