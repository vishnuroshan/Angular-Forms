import { Component, DestroyRef, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { noop } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true,
    },
  ],
})
export class CheckboxInputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() formControlName!: string;

  readonly formControl: FormControl = new FormControl();

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  onChange: (value: boolean) => void = noop;
  onTouched: () => void = noop;

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((checked: boolean): void => this.onChange(checked));
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(checked: boolean): void {
    this.formControl.patchValue(checked, { emitEvent: false });
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}