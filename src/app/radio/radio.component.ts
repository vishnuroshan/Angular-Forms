import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupInputComponent,
      multi: true
    }
  ]
})
export class RadioGroupInputComponent implements ControlValueAccessor{
  @Input() options: { label: string; value: any }[] = [];
  @Input() label!: string;
  selectedValue: any;

  private innerValue: any;

  constructor() { }

  onChange: any = () => {};
  onTouch: any = () => {};

  get checkedOption(): any {
    return this.options.find(option => option.value === this.innerValue);
  }

  set checkedOption(option: any) {
    if (option) {
      this.innerValue = option.value;
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

}