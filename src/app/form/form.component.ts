import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit{

  form: FormGroup = new FormGroup({
    userName: new FormControl<string>(''),
    password: new FormControl<string>(''),
    email: new FormControl<string>(''),
    number: new FormControl<number | null>(null),
    dropdownOption: new FormControl<any>(null),
    radioOption: new FormControl<any>(null),
    checkboxOption: new FormControl<boolean>(true),
  })

  submitted: boolean = false
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  dropdownOptions = [
    {label:'2 Years+', value:'two'},
    {label:'5 Years+', value:'five'},
    {label:'10 Years+', value:'ten'}
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
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      password: ['', [Validators.required, this.passwordValidator()]],
      email: ['', [Validators.required, Validators.email]],
      number: [null,[Validators.required]],
      dropdownOption: [null, [Validators.required]],
      radioOption: [null, [Validators.required]],
      checkboxOption: [null, [Validators.required]],
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

  passwordValidator(): Validators {
    return (control: FormControl) => {
      const value: string = control.value;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const valid = hasUppercase && hasLowercase && hasSpecial;
      return valid ? null : { invalidPassword: true };
    };
  }

  onSubmit(formData: any) {
    console.log(formData);
    this.submitted = true;
    if(this.form.valid) {
      this.saveData(this.form.value).subscribe(res=>{
        console.log("Data saved successfully....");
        this.form.reset();
        this.submitted = false;
      });
    }
  }

  saveData(formData: any){
    return this.http.post('http://localhost:3000/user',formData);
  }
}
