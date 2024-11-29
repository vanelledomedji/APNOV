import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debloquerNum',
  standalone: true,
  templateUrl: './debloquerNum.component.html',
  styleUrls: ['./debloquerNum.component.scss'],
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule, FormsModule,MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule],
  
})


export class AppDebloquerNumComponent implements OnInit {

  emfList: any[] = []; 
  selectedEMF: any; 
  recipient: string = '';
  accounts: any[] = []; 

  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadEmfs();
  }

  loadEmfs() {
    this.authService.getAllEmf().subscribe(
      (data) => {
        this.emfList = data; 
      },
      (error) => {
        console.error('Erreur lors du chargement des EMFs', error);
      }
    );
  }

  onEmfSelect(event: any) {
    this.selectedEMF = event.value; 
    this.loadAccountsForEmf(); 
  }

  loadAccountsForEmf() {
    this.authService.getAllEmf().subscribe(
      (accounts) => {
        this.accounts = accounts; // Stocke les comptes dans une variable
        console.log('Comptes récupérés:', accounts);
      },
      (error) => {
        console.error('Erreur lors de la récupération des comptes', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    if (form.valid) {
      this.authService.unlockRecipient(this.recipient, this.selectedEMF.code).subscribe(
        response => {
          console.log('Utilisateur débloqué avec succès', response);
        },
        error => {
          this.errorMessage = 'Compte introuvable'; 
          console.error('Erreur lors du déblocage de l\'utilisateur', error);
        }
      );
    } else {
      console.warn('Le formulaire n\'est pas valide');
    }
  }
}
