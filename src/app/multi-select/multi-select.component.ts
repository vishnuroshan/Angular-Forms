import { Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControlHelper } from '../helpers/form-control-helper';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() label: string = 'Select';
  @Input() options: any[] = [];
  private _isDisabled = false;
  @Input() dropdownSettings: IDropdownSettings = {};
  
  control: FormControl | any;
  selectedItems: any[] = [];

  constructor(private injector: Injector) { }

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.control = FormControlHelper.setFormControl(this.injector);
  }

  writeValue(value: any): void {
    if (!this.control) {
      this.control = new FormControl(value);
    }
    this.selectedItems = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
