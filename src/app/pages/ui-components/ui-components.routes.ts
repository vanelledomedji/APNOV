import { Routes } from '@angular/router';

// ui
import { AppProfilComponent } from './profil/profil.component';
import { AppDebloquerNumComponent } from './Debloquer-numéro/debloquerNum.component';
import { AppConsulterOperationComponent } from './Consulter-operation/consulterOperation.component';
import { AppGestionCompteOTPComponent } from './Gestion-CompteOTP/GestionCompteOTP.component';
import { AppGestionCompteAdminComponent } from './Gestion-CompteAdmin/GestionCompteAdmin.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profil',
        component: AppProfilComponent,
      },
      {
        path: 'débloquer-numéro',
        component: AppDebloquerNumComponent,
      },
      {
        path: 'consulterOperation',
        component: AppConsulterOperationComponent,
      },
      {
        path: 'GestionCompteOTP',
        component: AppGestionCompteOTPComponent,
      },
      {
        path: 'GestionCompteAdmin',
        component: AppGestionCompteAdminComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
    ],
  },
];
