import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-consulterOperation',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule ],
  templateUrl: './consulterOperation.component.html',
})
export class AppConsulterOperationComponent implements OnInit {

  operations: any[] = []; // Tableau pour stocker les opérations

  // Définir les colonnes à afficher
  displayedColumns: string[] = [
    'emfName', 
    'number', 
    'validationDate', 
    'lastAttemptDate', 
    'attemptCount', 
    'creationDate', 
    'expirationDate', 
    'applicationName'
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadOperations();
  }

  loadOperations() {
    this.authService.getAllOperations().subscribe(
      (data) => {
        this.operations = data.map(operation => ({
          emfName: operation.recipient.emf.name,
          number: operation.number,
          validationDate: operation.validationDate,
          lastAttemptDate: operation.lastAttemptDate,
          attemptCount: operation.attempt,
          creationDate: operation.creationDate,
          expirationDate: operation.expirationDate,
          applicationName: operation.applicationName
        }));
        console.log('Opérations récupérées:', this.operations);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des opérations', error);
      }
    );
  }
}
