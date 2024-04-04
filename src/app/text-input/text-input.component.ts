import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, noop, Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() type: string = 'text';
  @Input() label: string = "Username";
  formControl: FormControl = new FormControl('');

  private _destroy$ = new Subject<void>();

  onChange: (value: any) => void = () => {};
  onTouch: () => void = () => {};

  constructor() { }

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe(value => {
      this.onChange(value);
      this.onTouch();
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  writeValue(value: any): void {
    this.formControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  validate(): { [key: string]: any } | null {
    return this.formControl.errors;
  }
}