import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
    checkboxOption: new FormControl<string[]>([]),
    multiSelectOption: new FormControl<string[]>([]),
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
  ];
  
  multiSelectOptions = [
    { item_id: 1, item_text: 'Chennai' },
    { item_id: 2, item_text: 'Bangaluru' },
    { item_id: 3, item_text: 'Pune' },
    { item_id: 4, item_text: 'Mumbai' },
    { item_id: 5, item_text: 'New Delhi' }
  ];
  
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any[] = [];

  ngOnInit(): void {
    this.createForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.selectedItems = [
      { item_id: 1, item_text: 'Chennai' },
      { item_id: 4, item_text: 'Mumbai' }
    ];
  }

  createForm(){
    this.form = this.fb.group({
      userName: [{value: 'defaultname', disabled: false }, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      password: [{value: 'R@ils', disabled: false }, [Validators.required, this.passwordValidator()]],
      email: [{value: 'default@gmail.com', disabled: true },[Validators.required, Validators.email]],
      number: [{value: null, disabled: false },[Validators.required, Validators.min(1)]],
      dropdownOption: [{value: null, disabled: false }, [Validators.required]],
      radioOption: [{value: null, disabled: false }, [Validators.required]],
      checkboxOption: [{value: ["angular", "vue"], disabled: false }, [Validators.required]],
      multiSelectOption: [{ value: null, disabled: true }, [Validators.required]]
    })
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
        this.createForm();
        this.submitted = false;
      });
    }
  }

  saveData(formData: any){
    return this.http.post('http://localhost:3000/user',formData);
  }
}
