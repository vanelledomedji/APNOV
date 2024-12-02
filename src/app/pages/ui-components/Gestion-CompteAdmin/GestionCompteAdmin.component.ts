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
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';


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
    MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule, CommonModule, MatTableModule, MatIconModule, MatDialogModule, MatSelectModule,  MatSnackBarModule ,MatProgressBarModule 
  ],
  templateUrl: './gestionCompteAdmin.component.html',
})
export class AppGestionCompteAdminComponent implements OnInit {

  displayedColumns: string[] = [
    'name',              // Nom
    'username',          // Login
    'status',            // Statut
    'role',              // Rôle
    'emfs',          // Nom de l'EMF
    'actions'
  ];
  selectedAccount: any;

  errorMessage1: string = '';
  errorMessage: string = '';
  accounts: any[] = []; // Tableau pour stocker les comptes
  form: FormGroup;
  
  id: string=''
  name: string=''
  username: string=''
  accountUsername: string=''
  active: string=''
  accountType: string=''
  emfs: string[] = []
  userPassword: string='';

  emfList: any[] = []; 
  selectedEMF: any; 
  



  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;
  @ViewChild('editModalTemplate') editModalTemplate: TemplateRef<any>;

  constructor(private authService: AuthService, private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar, public  loaderService: LoaderService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      accountUsername: ['', Validators.required],
      userPassword: ['', Validators.required],
      accountType: ['', Validators.required],
      emfs: ['', Validators.required],
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

    // Initialiser selectedEMF si nécessaire
    if (this.emfList.length > 0) {
      this.selectedEMF = this.emfList[0]; // Sélectionner le premier EMF par défaut
    }
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
    // this.loadAccountsForEmf(); 
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
    this.loaderService.show(); // Afficher le loader
    this.authService.getAllAccounts().subscribe(
      (data) => {
        this.accounts = data.map(account => ({
          id: account.id,
          name: account.name,
          username: account.username,
          status: account.active,
          role: account.accountType,
          emfNames: account.emfs.map((emf: { name: any; }) => emf.name).join(', '), 
        }));
        console.log('Comptes récupérés:', this.accounts);
        this.loaderService.hide(); // Masquer le loader
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des comptes', error);
        this.loaderService.hide(); // Masquer le loader
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
      this.emfs,
      this.userPassword,        
    ).subscribe( 
      response => {
        console.log('Utilisateur créé:', response);
        this.snackBar.open('utilisateur créé avec succès', 'Fermer', {
          duration: 5000, // Durée en millisecondes
        });
        // Gérer la redirection ou afficher un message de succès
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        // Gérer l'erreur
      }
    );
  }


  updateAccount() {
    console.log('Selected Account:', this.selectedAccount); // Ajoutez ce log pour le débogage


    const updatedAccount = {
        password: this.userPassword, 
        accountType: this.selectedAccount.role, 
        name: this.selectedAccount.name,
        active: this.selectedAccount.status,
        emfNames: this.selectedAccount.emfNames,
        username: this.selectedAccount.username, 
        id: this.selectedAccount.id
    };

    this.authService.updateAccount(updatedAccount).subscribe(
        response => {
            console.log('Compte mis à jour avec succès:', response);
            this.loadAccounts(); // Rechargez les comptes après la mise à jour
            this.snackBar.open('Compte mis à jour avec succès', 'Fermer', {
                duration: 5000,
            });
        },
        error => {
            console.error('Erreur lors de la mise à jour du compte:', error);
            this.errorMessage = 'Erreur de mise à jour. Veuillez réessayer.';
        }
    );
  }
}

