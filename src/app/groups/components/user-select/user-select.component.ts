import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { UserSearchService } from '../../services/user-search.service';
import { SubsinkService } from 'src/app/services/subsink.service';
import { debounce } from 'src/app/common';
import { SelectOption } from 'src/app/services/searcher.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { map } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  providers: [
    UserSearchService,
    SubsinkService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectComponent),
      multi: true,
    },
  ],
})
export class UserSelectComponent implements OnInit, ControlValueAccessor {
  @Input() disabled = false;
  @Input() exclude: string[] = [];
  value: string = '';
  optionValid = false;
  options: SelectOption<string>[] = [];
  selectedOptions: SelectOption<string>[] = [];
  currentOption: SelectOption<string> = null;

  constructor(
    private userSearch: UserSearchService,
    private subsink: SubsinkService
  ) {}

  onChange = (options: string[]) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.selectedOptions = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
    this.subsink.add(
      this.userSearch.dataOptions$
        .pipe(
          map((data) =>
            data.filter(
              (opt) =>
                !this.selectedOptions
                  .map((sOpt) => sOpt.value)
                  .includes(opt.value) && !this.exclude.includes(opt.value)
            )
          )
        )
        .subscribe((userOptions) => (this.options = userOptions))
    );
  }

  displayFn(opt: SelectOption<string>): string {
    return (opt || { text: '' }).text;
  }

  filterUsers = debounce((value: string) => {
    this.userSearch.getData(value);
    this.onTouched();
    this.optionValid = false;
    this.currentOption = null;
  }, 250);

  loadMoreUser() {
    this.userSearch.getData(this.userSearch.lastTerm);
  }

  onOptionSelected(ev: MatAutocompleteSelectedEvent) {
    this.optionValid = true;
    this.currentOption = ev.option.value as SelectOption<string>;
  }

  addUser(event: Event) {
    event.stopPropagation();
    this.selectedOptions.push(this.currentOption);
    this.currentOption = null;
    this.optionValid = false;
    this.value = '';
    this.userSearch.getData();

    this.onChange(this.selectedOptions.map((opt) => opt.value));
  }

  removeUser(option: SelectOption<string>) {
    this.selectedOptions = this.selectedOptions.filter(
      (opt) => opt.value !== option.value
    );

    this.userSearch.getData(this.userSearch.lastTerm);
    this.onChange(this.selectedOptions.map((opt) => opt.value));
  }
}
