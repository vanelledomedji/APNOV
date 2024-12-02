import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Pour le support des dates
import { LoaderService } from 'src/app/services/loader.service'; // Mettez à jour le chemin
import { MatProgressBarModule } from '@angular/material/progress-bar';




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
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule ],
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

  filteredOperations: any[] = []; // Données filtrées
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  startDate: Date; // Date de début du filtre
  endDate: Date; // Date de fin du filtre
  
  constructor(private authService: AuthService, public  loaderService: LoaderService) {
    this.operations = this.getOperations(); // Remplacez par votre méthode de récupération des opérations
    this.filteredOperations = this.operations; // Initialement, toutes les opérations sont affichées
  }

  ngOnInit() {
    this.loadOperations();
  }

  loadOperations() {
    this.loaderService.show(); // Afficher le loader
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
        this.filteredOperations = [...this.operations]; 
        this.loaderService.hide(); // Masquer le loader
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des opérations', error);
        this.loaderService.hide(); // Masquer le loader en cas d'erreur
      }
    );
  }

  filterByCreationDate() {
    const start = this.startDate ? new Date(this.startDate).getTime() : 0;
    const end = this.endDate ? new Date(this.endDate).getTime() : Number.MAX_VALUE;

    this.filteredOperations = this.operations.filter(operation => {
      const creationDate = new Date(operation.creationDate).getTime();
      return creationDate >= start && creationDate <= end;
    });

    // Réinitialiser la pagination
    this.currentPage = 0;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedOperations() {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredOperations.slice(startIndex, startIndex + this.pageSize);
  }

  getOperations() {
    // Remplacez ceci par votre logique de récupération des opérations
    return []; // Exemple vide, remplacez par vos données réelles
  }
}
