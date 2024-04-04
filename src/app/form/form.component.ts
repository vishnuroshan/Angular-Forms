import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../text-input/text-input.component';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit{
  form!: FormGroup

  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm(){
    this.form = this.fb.group({
      userName: new FormControl('',[Validators.required]),
    })
  }

  get userName() {
    return this.form.controls['userName'];
  }

  onSubmit( formData: any) {
    console.log(formData);
  }
}
