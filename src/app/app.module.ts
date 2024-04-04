import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { TextInputComponent } from './text-input/text-input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RadioGroupInputComponent } from './radio/radio.component';
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextInputComponent,
    DropdownComponent,
    RadioGroupInputComponent,
    CheckboxInputComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
