import { Component,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent{
  textControl = new FormControl('');
  @Input() type:string = 'text';

  inputForm = new FormGroup({
    text: this.textControl,
  });

  onSubmit() {
    console.log(this.inputForm.value);
  }
}
