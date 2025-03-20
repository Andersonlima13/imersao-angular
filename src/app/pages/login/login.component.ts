import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Importando o HttpClientModule e HttpClient
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,  // Adicionando a propriedade standalone
  imports: [ReactiveFormsModule, HttpClientModule],  // Incluindo o HttpClientModule aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  successMessage: string = ''; // Variável para exibir a mensagem de sucesso

  constructor(private http: HttpClient, private router: Router) {}

  loginUsuario() {
    const loginData = this.loginForm.value;

    this.http.post('http://localhost:8080/usuarios/login', loginData).subscribe(
      (response: any) => {
        console.log('Login bem-sucedido!', response);
        this.successMessage = 'Login bem-sucedido!';

        // Redirecionando para a tela de Home após o login bem-sucedido
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        this.successMessage = 'Credenciais inválidas!'; // Mensagem de erro se as credenciais forem inválidas
      }
    );
  }
}
