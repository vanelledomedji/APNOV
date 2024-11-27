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
    route: '/ui-components/profil',
  },
  {
    displayName: 'Déploquer un numéro',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/débloquer-numéro',
  },
  {
    displayName: 'Consulter les Opérations',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/consulterOperation',
  },
  {
    displayName: 'Gestion des Compte OTP',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/GestionCompteOTP',
  },
  {
    displayName: 'Gestion des Comptes Admin',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/GestionCompteAdmin',
  },
  // {
  //   displayName: 'Forms',
  //   iconName: 'solar:file-text-line-duotone',
  //   route: '/ui-components/forms',
  // },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
  },
  {
    navCap: 'Auth',
    divider: true
  },
  {
    displayName: 'Deconnexion',
    iconName: 'solar:login-3-line-duotone',
    route: '/connexion',
  },
  // {
  //   displayName: 'Register',
  //   iconName: 'solar:user-plus-rounded-line-duotone',
  //   route: '/authentication/register',
  // },

  // {
  //   navCap: 'Extra',
  //   divider: true
  // },
  
  // {
  //   displayName: 'Icons',
  //   iconName: 'solar:sticker-smile-circle-2-line-duotone',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'solar:planet-3-line-duotone',
  //   route: '/extra/sample-page',
  // },
];
