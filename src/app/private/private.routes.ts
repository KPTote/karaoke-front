import { Routes } from "@angular/router";
import { CurrentListComponent } from "./pages/current-list/current-list.component";
import { LoginComponent } from "./pages/login/login.component";


export const privateRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'current-list',
    component: CurrentListComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


export default privateRoutes;
