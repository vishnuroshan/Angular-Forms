import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../text-input/text-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit{
  public selectOptions :Array<{}> = [];
  formData: FormGroup = new FormGroup({});
  textControl = new FormControl('');
  passwordControl = new FormControl('');
  emailControl = new FormControl('');
  numberControl = new FormControl(123);

  ngOnInit(){
    this.selectOptions = [
      {label:'option1', value:'mock-option1'},
      {label:'option2', value:'mock-option2'},
      {label:'option3', value:'mock-option3'}
    ]
    this.createForm();
  }

  // options: Option[] = [
  //   { label: 'Option 1', value: 'radio-option1' },
  //   { label: 'Option 2', value: 'radio-option2' },
  // ];

  createForm(){
    this.formData = new FormGroup({
      userName: this.textControl,
      email: this.emailControl,
      password: this.passwordControl,
      number: this.numberControl
    })
  }

  onSubmit(form: any){
    console.log(form);
  }
}
