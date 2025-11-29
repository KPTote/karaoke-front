import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../../components/loader/loader.component";
import loginField from '../../data/login-fields.json';
import { PrivateApiService } from '../../services/private-api.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {


  private readonly maxLengthEmail = 100;
  private readonly minLengthPass = 8;
  isValidAccount = true;
  errorMessage = '';
  public showLoader = false;
  public loginFields = loginField;

  private readonly fb = inject(FormBuilder);
  private readonly privateApiService = inject(PrivateApiService);


  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(this.maxLengthEmail), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(this.minLengthPass)]]
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password')
  }

  private readonly router = inject(Router);

  public submit(): void {

    if (!this.loginForm?.valid) {
      this.loginForm.markAllAsTouched()
      return;
    };

    console.log(this.loginForm.valid);

    const email = this.email?.value ?? '';
    const password = this.password?.value ?? '';



    this.privateApiService.auth(email, password)
      .subscribe({
        next: res => {
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/private/dashboard']);

        },
        error: error => console.log(error)
      })







  }

}
