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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule, MatBadgeModule, CommonModule, MatProgressSpinnerModule],
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

  isLoading: boolean = false;

  constructor(private authService: AuthService, private loaderService: LoaderService, private router: Router) {}

  ngOnInit() {
    // S'abonner à l'état de chargement du service de loader
    this.loaderService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

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
        }
      );
    }
  }

}
