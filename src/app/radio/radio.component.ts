import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, noop, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForOf } from '@angular/common';
import { Option } from './option';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupInputComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupInputComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) options: Option[] = [];

  readonly form: FormGroup = new FormGroup<{ value: FormControl<string | null> }>({
    value: new FormControl<string>(''),
  });

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  onChange: (value: unknown) => void = noop;
  onTouch: () => void = noop;

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(200),
        tap(({ value }) => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: string): void {
    this.form.patchValue({ value }, { emitEvent: false });
  }
}