import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule, MatBadgeModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  errorMessage: string = ''; 

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router) {}


  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     this.authService.login(this.username, this.Password).subscribe(
  //       response => {
  //         console.log('Connexion réussie', response);
  
          
  //         if (response.token) {
  //           // Stocker le token dans localStorage
  //           localStorage.setItem('authToken', response.token);
  //         }
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error => {
  //         console.error('Erreur de connexion', error);
  //         // Gérer l'erreur ici (afficher un message d'erreur, etc.)
  //         alert('Échec de la connexion, veuillez vérifier vos identifiants.');
  //       }
  //     );
  //   }
  // }

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe(
        response => {
          console.log('Connexion réussie', response);

          // Stocker le nom d'utilisateur et le mot de passe dans sessionStorage pour Basic Auth
          sessionStorage.setItem('username', this.username);
          sessionStorage.setItem('password', this.password);

          this.router.navigate(['/dashboard']);
        },
        error => {
          this.errorMessage = 'Echec d\'authentification'; 
          console.error('Erreur de connexion', error);
          alert('Échec de la connexion, veuillez vérifier vos identifiants.');
        }
      );
    }
  }

}
