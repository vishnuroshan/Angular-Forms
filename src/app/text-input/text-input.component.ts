import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})

export class TextInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label: string = "Username";

  constructor() { }

  onChange: any = () => {}
  onTouch: any = () => {}
  val= ""

  set value(val: any){
    if( val !== undefined && this.val !== val){
    this.val = val
    this.onChange(val)
    this.onTouch(val)
    }

  }

  writeValue(value: any){
    this.value = value
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

}