import { Component, TemplateRef, ViewChild } from '@angular/core';
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
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 

@Component({
  selector: 'app-gestionCompteOTP',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatIconModule, TablerIconsModule, MatButtonModule, MatTableModule, MaterialModule, MatDialogModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule,  MatSnackBarModule, MatProgressBarModule],
  templateUrl: './gestionCompteOTP.component.html',
})
export class AppGestionCompteOTPComponent {
  
  id: string=''
  name: string=''
  code: string=''
  otpDigitCount: number= 0
  otpExpirationDelay: number= 0
  loginSmsServer: string=''
  passwordSmsServer: string=''
  otpMessageFormat: string=''

  errorMessage: string = '';

  displayedColumns: string[] = [
   'emfName',              // Nom de l'EMF
    'emfCode',              // Numéro de l'EMF
    'numberOfDigits',       // Nombre de Chiffres
    'lifetime',             // Durée de Vie
    'serverLogin',          // Login Serveur
    'serverPassword',       // Mot de Passe Serveur
    'messageStart',          // Début du Message
    'actions'
  ];

  selectedAccount: any;
  selectedAccountId: string;

  
  filteredAccounts: any[] = [];
  filterEmfName: string = '';

  accounts: any[] = [];
  form: FormGroup;

  value: string = '';

  

  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;
  @ViewChild('editModalTemplate') editModalTemplate: TemplateRef<any>;
  @ViewChild('deleteModalTemplate') deleteModalTemplate: TemplateRef<any>;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar, public  loaderService: LoaderService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loadAccount();
  }

  loadAccount() {
    // Votre logique pour charger les comptes
    this.filteredAccounts = this.accounts; // Initialisez également filteredAccounts
  }

  filterByEmfName() {
    this.filteredAccounts = this.accounts.filter(account => 
      account.emfName.toLowerCase().includes(this.filterEmfName.toLowerCase())
    );
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

  openDeleteModal(element: any) {
    if (!element) {
        console.error('Aucun élément sélectionné');
        return;
    }

    // Stockez l'ID de l'élément sélectionné
    this.selectedAccountId = element.id; // Assurez-vous que l'élément a un champ 'id'
    this.selectedAccount = { ...element }; 

    const dialogRef = this.dialog.open(this.deleteModalTemplate, {
        width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            console.log('Suppression annulée');
        } 
    });
}


  

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loaderService.show(); // Afficher le loader
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
        this.filteredAccounts = this.accounts;
        this.loaderService.hide(); // Masquer le loader
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des comptes', error);
        this.loaderService.hide(); // Masquer le loader en cas d'erreur
      }
    );
  }

  onCreateUser(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Tous les champs sont requis.';
      return;
    }
    this.authService.createEmf(
      this.name,              
      this.code,              
      this.otpDigitCount, 
      this.otpExpirationDelay,             
      this.loginSmsServer,       
      this.passwordSmsServer,  
      this.otpMessageFormat 
    ).subscribe(
      response => {
        console.log('Utilisateur créé:', response);
        this.snackBar.open('Utilisateur créé avec succès', 'Fermer', {
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

  
  updateEmf() {
    // Préparez l'objet à envoyer à l'API
    const updatedEmf = {
      id: this.selectedAccount.id, // Assurez-vous d'avoir l'ID de l'EMF
      name: this.selectedAccount.emfName,
      code: this.selectedAccount.emfCode,
      otpDigitCount: this.selectedAccount.numberOfDigits,
      otpExpirationDelay: this.selectedAccount.lifetime,
      loginSmsServer: this.selectedAccount.serverLogin,
      passwordSmsServer: this.selectedAccount.serverPassword,
      otpMessageFormat: this.selectedAccount.messageStart,
    };
  
    this.authService.updateEmf(updatedEmf).subscribe(
      response => {
        console.log('EMF mis à jour avec succès:', response);
        this.loadAccounts();
        this.snackBar.open('Mise à jour réuissi', 'Fermer', {
          duration: 5000, // Durée en millisecondes
        });
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'EMF:', error);
        this.errorMessage = 'Erreur de mise à jour. Veuillez réessayer.';
      }
    );
  }

  deleteEmf() {
    this.authService.deleteEmf().subscribe(
      response => {
        console.log('Compte supprimé avec succès:', response);
        this.loadAccounts(); // Rechargez les comptes après suppression
        this.snackBar.open('suppréssion réuissie', 'Fermer', {
          duration: 5000, // Durée en millisecondes
        });
      },
      error => {
        console.error('Erreur lors de la suppression du compte:', error);
        this.errorMessage = 'Erreur de suppression. Veuillez réessayer.';
      }
    );
  }

}
