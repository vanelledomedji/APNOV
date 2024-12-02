import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'Parametres',
    divider: true
  },
  {
    displayName: 'Profil',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/pages/profil',
  },
  {
    displayName: 'Déploquer un numéro',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/pages/débloquer-numéro',
  },
  {
    displayName: 'Consulter les Opérations',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/pages/consulterOperation',
  },
  {
    displayName: 'Gestion des Compte OTP',
    iconName: 'solar:file-text-line-duotone',
    route: '/pages/GestionCompteOTP',
  },
  {
    displayName: 'Gestion des Comptes Admin',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/pages/GestionCompteAdmin',
  },
  
  // {
  //   displayName: 'Tables',
  //   iconName: 'solar:tablet-line-duotone',
  //   route: '/ui-components/tables',
  // },
  {
    navCap: 'Auth',
    divider: true
  },
  {
    displayName: 'Deconnexion',
    iconName: 'solar:login-3-line-duotone',
    action: 'logout',
  },
 
];
