import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";


export const privateRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


export default privateRoutes;
