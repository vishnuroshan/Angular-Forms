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
}
