import { FormatWidth } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-create-account',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])

  })

  createAccount(){
    console.log('testand')
  }

  


}
