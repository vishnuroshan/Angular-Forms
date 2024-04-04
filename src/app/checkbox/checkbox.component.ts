import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  @Input() label!: string;
  selectedValue: any;

  private innerValue: any;

  constructor() {
    this.innerValue = []
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  get checkedOptions(): any[] {
    if (!this.innerValue || !Array.isArray(this.innerValue)) {
        return [];
    }
    return this.options.filter(option => this.innerValue.includes(option.value));
  }

  set checkedOptions(options: any[]) {
    if (options) {
      this.innerValue = options.map(option => option.value);
      this.onChange(this.innerValue);
      this.onTouch(this.innerValue);
    }
  }

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  isChecked(option: any): boolean {
    if (!this.innerValue || !Array.isArray(this.innerValue)) {
        return false;
    }
    return this.innerValue.includes(option.value);
}

  toggleSelection(option: any): void {
    if (this.isChecked(option)) {
      this.checkedOptions = this.checkedOptions.filter(o => o.value !== option.value);
    } else {
      this.checkedOptions = [...this.checkedOptions, option];
    }
  }
}
