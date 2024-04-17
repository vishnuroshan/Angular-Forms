import { Component, forwardRef, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ICONS } from '../icons/icons';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../services/icons/icon.service';

@Component({
  selector: 'app-mobile-number',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ValidationErrorsComponent,MatSelectModule,MatIconModule],
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
  @Input() type:string = '';
  countryCodeOptions: { label: string, value: string, icon: any }[] = [
    { label: 'India (भारत) +91', value: '+91', icon: this.icons('indianflag') },
    { label: 'Mexico (México) +52', value: '+52', icon: this.icons('mexicanflag') },
    { label: 'Philippines +63', value: '+63', icon: this.icons('philippinesflag') },
    { label: 'United States +1', value: '+1', icon: this.icons('americanflag') },
  ];
  selectedCountryCode: string = '+91';
  mobileNumber: string = '';
  input!: any;

  onChange: any = () => {};
  onTouched: any = () => {};
  

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.type === 'text') {
      const allowedCharacters = /^[0-9\b\t\r]+$/;
      if (!allowedCharacters.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  constructor(private injector: Injector,private iconService: IconService, private sanitizer: DomSanitizer) { }

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

  protected icons(iconName: any): SafeHtml {
    const svgContent = this.iconService.getSvgForName(iconName);
    if (svgContent) {
      return this.sanitizer.bypassSecurityTrustHtml(svgContent);
    } else {
      return '';
    }
  }

  getIcon(countryCode: string): any {
    const selectedOption = this.countryCodeOptions.find(option => option.value === countryCode);
    return selectedOption ? selectedOption.icon : null;
  }
  
  updateValue(): void {
    this.onChange({ countrycode: this.selectedCountryCode, mobile: this.mobileNumber });
    this.onTouched();
  }
}