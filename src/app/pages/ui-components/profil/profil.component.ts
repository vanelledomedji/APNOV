import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
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

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule, FormsModule,MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
})


export class AppProfilComponent implements OnInit {

  username: string = ''; 
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;


  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  successMessage: string = ''; // Message de succès
  errorMessage: string = ''; // Message d'erreur

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

  // changePassword() {
  //   if (this.newPassword === this.confirmPassword) {
  //     this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
  //       response => {
  //         console.log('Mot de passe changé avec succès', response);
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('Erreur lors du changement de mot de passe', error);
  //       }
  //     );
  //   } else {
  //     console.error('Les mots de passe ne correspondent pas.');
  //   }
  // }

  changePassword() {
    if (this.newPassword === this.confirmPassword) {
      this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
        response => {
          this.successMessage = 'Mot de passe changé avec succès';
          this.errorMessage = ''; // Réinitialiser l'erreur
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Erreur lors du changement de mot de passe : ' + (error.error.message || error.message);
          this.successMessage = ''; // Réinitialiser le succès
        }
      );
    } else {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      this.successMessage = ''; // Réinitialiser le succès
    }
  }

}

