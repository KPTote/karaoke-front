import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  maxLengthEmail = 100;
  minLengthPass = 8;
  isValidAccount = true;
  errorMessage = '';
  public showLoader = false;

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthEmail), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.minLengthPass)])
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password')
  }

  private readonly router = inject(Router);

    onSubmit() {

    if (!this.loginForm?.valid) return;

    const email = this.email?.value ?? '';
    const pass = this.password?.value ?? '';

    console.log(email);
    console.log(pass);



  }

}
