import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule, FormsModule,MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatSnackBarModule],
})


export class AppProfilComponent implements OnInit {

  username: string = ''; 
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;


  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  message: string;
  successMessage: string = '';
  errorMessage: string = ''; // Message d'erreur

  closeAlert() {
    this.message = '';
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }



  passwordChange(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Tous les champs sont requis.';
      return;
    }
  
    if (this.newPassword === this.confirmPassword) {
      this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
        response => {
          console.log('mot de passe changé', response);
          this.message = 'Mot de passe changé avec succès';
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors du changement de mot de passe', error);
          this.errorMessage = 'Erreur lors du changement de mot de passe : ';
        }
      );
    } else {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
    }
  }

}

