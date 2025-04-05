import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  successMessage: string = '';  // Variável para exibir a mensagem de sucesso





  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
  



  createAccount() {
    console.log('Criando conta!');
    const userData = this.accountForm.value;
  
    this.http.post('https://api-financeiro-cxyp.onrender.com/usuarios/criar', userData).subscribe(
      (response: any) => {
        console.log('Usuário criado com sucesso!', response);
        this.successMessage = 'Usuário criado com sucesso!'; // Define a mensagem de sucesso
  
        setTimeout(() => {
          this.successMessage = ''; // Oculta a mensagem após 3 segundos
        }, 3000);
      },
      (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    );
  }
}
