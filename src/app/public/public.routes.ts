import { Routes } from "@angular/router";
import { ConfirmationFormComponent } from './pages/confirmation-form/confirmation-form.component';
import { UserFormComponent } from "./pages/user-form/user-form.component";

export const publicRoutes: Routes = [
  {
    path: 'user-form',
    component: UserFormComponent
  },
  {
    path: 'confirmation-form',
    component: ConfirmationFormComponent
  },
  {
    path: '**',
    redirectTo: 'user-form',
    pathMatch: 'full'
  }
];


export default publicRoutes;
