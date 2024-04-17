import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-mobile-number',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ValidationErrorsComponent,MatSelectModule],
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MobileNumberComponent),
      multi: true
    }
  ]
})
export class MobileNumberComponent implements ControlValueAccessor, OnInit {
  control: FormControl | any;
  @Input() label:string = '';
  countryCodeOptions: { label: string, value: string }[] = [
    { label: 'US (+1)', value: '+1' },
    { label: 'Mexico (+52)', value: '+52' },
    { label: 'Philippines (+63)', value: '+63' },
    { label: 'India (+91)', value: '+91' }
  ];

  selectedCountryCode: string = '+91';
  mobileNumber: string = '';
  input!: any;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    this.control = FormControlHelper.setFormControl(this.injector);
    console.log(this.control.value);
  }

  writeValue(value: any): void {
    if(!this.control) {
      this.control = new FormControl(value);
    }
    if (value) {
      this.selectedCountryCode = value.countrycode || '+91';
      this.mobileNumber = value.mobile || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(): void {
    this.onChange({ countrycode: this.selectedCountryCode, mobile: this.mobileNumber });
    this.onTouched();
  }
}