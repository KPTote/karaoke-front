import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

export const routes: Routes = [

  {
    path: 'public',
    loadChildren: () => import('./public/public.routes')
  },
  {
    path: 'private',
    loadChildren: () => import('./private/private.routes')
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'private',
    pathMatch: 'full'
  }

];
