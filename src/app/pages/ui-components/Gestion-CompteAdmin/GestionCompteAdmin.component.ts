import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { NgForm, FormGroup,Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; // Pour mat-icon
import { MatDialogModule } from '@angular/material/dialog';

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
    MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule, CommonModule, MatTableModule, MatIconModule, MatDialogModule, MatSelectModule 
  ],
  templateUrl: './gestionCompteAdmin.component.html',
})
export class AppGestionCompteAdminComponent implements OnInit {

  displayedColumns: string[] = [
    'name',              // Nom
    'username',          // Login
    'status',            // Statut
    'role',              // Rôle
    'emf',          // Nom de l'EMF
    'actions'
  ];
  selectedAccount: any;

  errorMessage: string = '';
  accounts: any[] = []; // Tableau pour stocker les comptes
  form: FormGroup;

  name: string=''
  accountUsername: string=''
  active: string=''
  accountType: string=''
  emf: string[] = []
  userPassword: string='';

  emfList: any[] = []; 
  selectedEMF: any; 
  



  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;
  @ViewChild('editModalTemplate') editModalTemplate: TemplateRef<any>;

  constructor(private authService: AuthService, private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      accountUsername: ['', Validators.required],
      userPassword: ['', Validators.required],
      accountType: ['', Validators.required],
      emf: ['', Validators.required],
    });
  }

  editElement(element: any) {
    if (!element) {
      console.error('Aucun élément sélectionné');
      return;
    }
  
    this.selectedAccount = { ...element }; // Clonez l'élément pour le modifier
    const dialogRef = this.dialog.open(this.editModalTemplate, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Données mises à jour:', result);
      }
    });
  }


  openModal() {
    const dialogRef = this.dialog.open(this.modalTemplate, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Données reçues:', result);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData);
      this.dialog.closeAll(); // Fermer le modal après soumission
    }
  }
  onCancel() {
    this.dialog.closeAll(); // Fermer le modal sans traitement
  }

  ngOnInit() {
    this.loadAccounts();
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

  loadAccounts() {
    this.authService.getAllAccounts().subscribe(
      (data) => {
        this.accounts = data.map(account => ({
          name: account.name,
          username: account.username,
          status: account.active,
          role: account.accountType,
          emfName: account.emf,
        }));
        console.log('Comptes récupérés:', this.accounts);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des comptes', error);
      }
    );
  }

  
  onCreateUser(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Tous les champs sont requis.';
      return;
    }
    this.authService.createAccounts(
      this.name,              
      this.accountUsername,               
      this.accountType,             
      this.emf,
      this.userPassword,        
    ).subscribe(
      response => {
        console.log('Utilisateur créé:', response);
        // Gérer la redirection ou afficher un message de succès
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        // Gérer l'erreur
      }
    );
  }

  updateAccount() {
    // Préparez l'objet à envoyer à l'API
    const updatedAccount = {
      id: this.selectedAccount.id, // Assurez-vous d'avoir l'ID du compte
      name: this.selectedAccount.name,
      username: this.selectedAccount.username,
      status: this.selectedAccount.status,
      role: this.selectedAccount.role,
      emfName: this.selectedAccount.emfName,
    };
  
    // Appelez le service pour mettre à jour le compte
    this.authService.updateAccount(updatedAccount).subscribe(
      response => {
        console.log('Compte mis à jour avec succès:', response);
        this.loadAccounts(); // Rechargez les comptes après la mise à jour
        this.dialog.closeAll(); // Fermer le modal après la mise à jour
      },
      error => {
        console.error('Erreur lors de la mise à jour du compte:', error);
        this.errorMessage = 'Erreur de mise à jour. Veuillez réessayer.';
      }
    );
  }

}

