import { Component,Injector,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { ICONS } from '../icons/icons';


@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ValidationErrorsComponent],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor,OnInit{
  control: FormControl | any;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() prefixIcon: string = ''; //Icon name from form component
  input!: string;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.control = FormControlHelper.setFormControl(this.injector);
  }

  writeValue(input: any){
    this.input = input;
  }
  registerOnChange(fn: any){
    this.onChange = fn;
  }
  registerOnTouched(fn: any){
    this.onTouched = fn;
  }
  
  get icons() {
    return ICONS
  }

  get dirty(): boolean {
    return this.control ? this.control.dirty : false;
  }

  get touched(): boolean {
    return this.control ? this.control.touched : false;
  }

  get disabled(): boolean {
    return this.control ? this.control.disabled : false;
  }

  get isRequired(): boolean {
    return this.control ? !!this.control.validator && !!this.control.validator({} as FormControl)?.required : false;
  }
}