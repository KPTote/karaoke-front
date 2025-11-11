import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private canAccessToConfirmationForm = false;

  public accessToConfirmationForm(value: boolean): void {
    this.canAccessToConfirmationForm = value;
  }

  public haveAccessToConfirmation(): boolean {
    return this.canAccessToConfirmationForm;
  }

}
