import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import userFormFields from '../../data/user-form-fields.json';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {


  public readonly userFormFields = userFormFields;
  public songFormInvalid = false;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  public userForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$')]],
    userLastName: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$')]],
    songName: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\\s]+$')]],
    artistName: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\\s]+$')]],
    noArtistName: [false]
  });


  public submit(): void {

    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched()
      return;
    }

    this.router.navigate(['/public/confirmation-form'], {
      queryParams: {
        user: this.userForm?.controls['userName']?.value ?? null,
        songName: this.userForm?.controls['songName']?.value ?? null,
        artistName: this.userForm?.controls['artistName']?.value ?? null,
      }
    })


  }

  private getName(): string {
    const userName = this.userForm?.controls['userName']?.value ?? null;
    const userLastName = this.userForm?.controls['userLastName']?.value ?? null;
    return `${userName} ${userLastName}`;
  }

}
