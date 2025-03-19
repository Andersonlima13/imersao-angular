import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Importe o HttpClientModule aqui

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],  // Inclua HttpClientModule aqui
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  createAccount() {
    console.log('Dados enviados para o backend:', this.accountForm.value);
  
    const userData = this.accountForm.value;
    this.http.post('http://localhost:8080/usuarios/criar', userData)
      .subscribe(response => {
        console.log('Resposta do backend:', response);
        this.router.navigateByUrl('');
      }, error => {
        console.error('Erro ao criar usuário:', error);
      });
  }}
