import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../text-input/text-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent {
  textInputValue: string = '';
  passwordInputValue: string = ''
  emailInputValue: string = ''
  submitForm() {
    console.log('Submitted Value:', this.textInputValue);
    console.log('Submitted Value:', this.passwordInputValue);
    console.log('Submitted Value:', this.emailInputValue);
  }
}
