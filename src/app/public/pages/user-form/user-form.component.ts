import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  public fb = inject(FormBuilder);

  public userForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$')]],
    userLastName: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$')]],
    songName: ['', Validators.required],
    artistName: [''],
    noArtistName: [false]
  });


  submit() {
      console.log(this.userForm);

    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched()
      return;
    }


    console.log(this.userForm.value);
    this.userForm.reset();

  }

}
