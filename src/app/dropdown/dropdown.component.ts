import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  dropDownControl = new FormControl('');
  @Input() options:Array<any> = [];
  @Input() label:string = "Username";

  inputForm = new FormGroup({
    text: this.dropDownControl,
  });

  onSubmit() {
    console.log(this.inputForm.value);
  }
}
