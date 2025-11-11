import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PublicService } from '../services/public.service';

export const confirmationFormGuard: CanActivateFn = (route, state) => {
  const publicService = inject(PublicService);
  const router = inject(Router);


  const canAccessToConfirmationForm = publicService.haveAccessToConfirmation();

  return canAccessToConfirmationForm
    ? true
    : router.createUrlTree(['/public/user-form']);
};
