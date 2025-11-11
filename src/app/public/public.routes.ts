import { Routes } from "@angular/router";
import { UserFormComponent } from "./pages/user-form/user-form.component";

export const publicRoutes: Routes = [
  {
    path: 'user-form',
    component: UserFormComponent
  },
  {
    path: '**',
    redirectTo: 'user-form',
    pathMatch: 'full'
  }
];


export default publicRoutes;
