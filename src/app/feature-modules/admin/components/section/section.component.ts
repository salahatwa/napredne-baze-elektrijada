import { Component, OnInit, Input } from '@angular/core';
import { ISection } from 'src/app/models/ISection';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FormComponent } from 'src/app/models/FormComponent';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent extends FormComponent<ISection>
  implements OnInit {
  @Input() section: ISection;
  sectionForm: FormGroup = this.buildForm();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.sectionForm = this.buildForm(this.section);
  }

  buildForm(section?: ISection) {
    return this.formBuilder.group({
      imageURL: [section ? section.imageURL : '', Validators.required],
      name: [section ? section.name : '', Validators.required],
    });
  }

  get editing(): boolean {
    return this.section !== null;
  }

  submit() {
    const section = this.sectionForm.value;
    const base64 = section.imageURL;
    delete section.imageURL;
    this.submitted.emit({
      ...section,
      imageBase64: base64,
      _id: this.section ? this.section._id : undefined,
    });
    this.sectionForm.reset();
    this.finished.emit();
  }

  resetForm() {
    this.sectionForm.reset(this.section || {});
  }
}
