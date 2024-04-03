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

  ngOnInit(){
    this.selectOptions = [
      {label:'option1', value:'mock-option1'},
      {label:'option2', value:'mock-option2'},
      {label:'option3', value:'mock-option3'}
    ]
  }
  

}
