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

// classe createaccount component

export class CreateAccountComponent {
  accountForm: FormGroup = new FormGroup({    // accountform agrupa os controles do usuario
    name: new FormControl('', [Validators.required])   // definindo o campo como required, para exigir o email do usuario

  })

  //formgroup valida e submete os dados no formulario


  constructor(private userService: UserService, private router: Router){}



// funcao para criar a conta do usuario
// ao submeter o formulario o metodo é chamado
  createAccount(){
    console.log('criou conta !')
    this.userService.addUser(this.accountForm.value.name);
    this.router.navigateByUrl('')
  }
// userservice é usado para adcionar o usuario , adcionando no localstorage
  


}
