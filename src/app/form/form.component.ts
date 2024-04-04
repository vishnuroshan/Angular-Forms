import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit{
  form!: FormGroup
  submitted: boolean = false
  constructor(private fb: FormBuilder) { }
  dropdownOptions = [
    {label:'option1', value:'value1'},
    {label:'option2', value:'value2'},
    {label:'option3', value:'value3'}
  ]

  radioOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  checkBoxOptions = [
    {label:'Angular Js', value:'angular'},
    {label:'React Js', value:'react'},
    {label:'vue Js', value:'vue'}
  ]

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      userName: new FormControl('default name', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      number: new FormControl('',[Validators.required]),
      dropdownOption: new FormControl(null,[Validators.required]),
      radioOption: new FormControl(null, [Validators.required]),
      checkboxOption: new FormControl(true)
    })
  }

  get userName() {
    return this.form.controls['userName'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get number() {
    return this.form.controls['number'];
  }

  onSubmit(formData: any) {
    console.log(formData);
    this.submitted = true;
  }
}
