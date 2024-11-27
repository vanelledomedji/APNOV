import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'; 
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-gestionCompteOTP',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatIconModule, TablerIconsModule, MatButtonModule, MatTableModule, MaterialModule, MatDialogModule, CommonModule],
  templateUrl: './gestionCompteOTP.component.html',
})
export class AppGestionCompteOTPComponent {

  emfName: string=''
  emfCode: string=''
  numberOfDigits: number= 0
  liftime: number= 0
  serverLogin: string=''
  serverPassword: string=''
  messageStart: string=''

  displayedColumns: string[] = [
   'emfName',              // Nom de l'EMF
    'emfCode',              // Numéro de l'EMF
    'numberOfDigits',       // Nombre de Chiffres
    'lifetime',             // Durée de Vie
    'serverLogin',          // Login Serveur
    'serverPassword',       // Mot de Passe Serveur
    'messageStart'          // Début du Message
  ];

  accounts: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}



  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.authService.getAllEmf().subscribe(
      (data) => {
        console.log('Données reçues:', data); 
        this.accounts = data.map(account => ({
          emfName: account.name,              
          emfCode: account.code,              
          numberOfDigits: account.otpDigitCount, 
          lifetime: account.otpExpirationDelay,             
          serverLogin: account.loginSmsServer,       
          serverPassword: account.passwordSmsServer,  
          messageStart: account.otpMessageFormat       
        }));
        console.log('Comptes récupérés:', this.accounts); 
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des comptes', error);
      }
    );
  }

}
