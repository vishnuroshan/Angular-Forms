import { Component, forwardRef, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../services/icons/icon.service';
import { MobileTransformPipe } from 'src/app/pipes/mobile-transform.pipe';

@Component({
  selector: 'app-mobile-number',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationErrorsComponent,
    MatSelectModule,
    MatIconModule,
    MobileTransformPipe,
  ],
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MobileNumberComponent),
      multi: true,
    },
  ],
})
export class MobileNumberComponent implements ControlValueAccessor, OnInit {
  control: FormControl | any;
  @Input() label: string = '';
  @Input() type: string = '';
  countryCodeOptions: {
    label: string;
    value: string;
    icon: any;
    code: string;
  }[] = [
    {
      label: 'India',
      code: this.getFlagEmoji('IN'),
      value: '+91',
      icon: this.icons('indianflag'),
    },
    {
      label: 'Mexico',
      value: '+52',
      code: this.getFlagEmoji('MX'),
      icon: this.icons('mexicanflag'),
    },
    {
      label: 'Philippines',
      code: this.getFlagEmoji('PH'),
      value: '+63',
      icon: this.icons('philippinesflag'),
    },
    {
      label: 'USA',
      code: this.getFlagEmoji('US'),
      value: '+1',
      icon: this.icons('americanflag'),
    },
  ];
  selectedCountryCode: string = '+91';
  mobileNumber: string = '';
  input!: any;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
    private injector: Injector,
    private iconService: IconService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.control = FormControlHelper.setFormControl(this.injector);
    console.log('mobile::> ', this.control.value);
    this.mobileNumber = this.control.value['mobile'];
    this.selectedCountryCode = this.control.value['countrycode'];
    console.log(this.mobileNumber, this.selectedCountryCode);
  }

  writeValue(value: any): void {
    console.log('write value::> ', value);
    if (!this.control) {
      this.control = new FormControl(value);
    }
    if (value) {
      this.selectedCountryCode = value.countrycode || '+91';
      this.mobileNumber = value.mobile || '';
      console.log(
        'inside write value::> ',
        value,
        this.control,
        this.selectedCountryCode,
        this.mobileNumber
      );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  protected icons(iconName: any): SafeHtml {
    const svgContent = this.iconService.getSvgForName(iconName);
    if (svgContent) {
      return this.sanitizer.bypassSecurityTrustHtml(svgContent);
    } else {
      return '';
    }
  }

  getIcon(countryCode: string): any {
    const selectedOption = this.countryCodeOptions.find(
      (option) => option.value === countryCode
    );
    return selectedOption ? selectedOption.code : null;
  }

  updateValue(): void {
    this.onChange({
      countrycode: this.selectedCountryCode,
      mobile: this.mobileNumber,
    });
  }
}
