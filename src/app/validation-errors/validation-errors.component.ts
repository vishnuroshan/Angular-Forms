import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss'],
  
})
export class ValidationErrorsComponent {
  @Input() errors: Record<string, ValidationErrors> | null = {};
  @Input() invalid: boolean = false;
  @Input() touched: boolean = false;
  @Input() label: string = '';

  errorMessages: Record<string,string> = {
    required: `The field is required`,
    maxlength: 'You have entered less characters than expected',
    minlength: 'You have entered more characters than expected',
    invalidPassword: 'Password must contain atleast one uppercase,lowercase and a special character',
    email: 'Enter a valid email address'
  }
}
