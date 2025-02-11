import { FormatWidth } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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


  constructor(private userService: UserService, private router: Router){}

  createAccount(){
    console.log('testand')
    this.userService.addUser(this.accountForm.value.name);
    this.router.navigateByUrl('')
  }

  


}
