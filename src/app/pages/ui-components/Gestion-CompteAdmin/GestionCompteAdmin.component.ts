import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-gestionCompteAdmin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollable,
    MatButtonModule,
    MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule, CommonModule, MatTableModule
  ],
  templateUrl: './gestionCompteAdmin.component.html',
})
export class AppGestionCompteAdminComponent implements OnInit {

  displayedColumns: string[] = [
    'name',              // Nom
    'username',          // Login
    'status',            // Statut
    'role',              // Rôle
    'emfName'           // Nom de l'EMF
  ];

  accounts: any[] = []; // Tableau pour stocker les comptes
  username: string = ''; 
  password: string = ''; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.authService.getAllAccounts().subscribe(
      (data) => {
        this.accounts = data.map(account => ({
          name: account.name,
          username: account.username,
          status: account.active,
          role: account.accountType,
          //emfName: account.emfs?.[0]?.name || 'Non défini' // Vérifiez si emfs existe
        }));
        console.log('Comptes récupérés:', this.accounts);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des comptes', error);
      }
    );
  }
}

