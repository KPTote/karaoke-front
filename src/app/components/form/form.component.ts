import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import formFields from '../../data/form-fields.json';
import { FormSettings, FormStructure } from '../../interface/karaoke.interface';
import { UserFormFields } from '../../public/interfaces/public.interface';

type formAction = 'CREATE' | 'UPDATE';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {


  public headerForm = input.required<FormSettings>();
  public formActionValue = input.required<formAction>();
  public formValue = output<FormStructure>();

  public readonly formFields: UserFormFields[] = formFields;
  private readonly fb = inject(FormBuilder);
  public form: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern(`^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$`)]],
    userLastName: ['', [Validators.required, Validators.pattern(`^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$`)]],
    songName: ['', [Validators.required, Validators.pattern(`^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\\s]+$`)]],
    artistName: ['', [Validators.required, Validators.pattern(`^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\\s]+$`)]],
  });



  ngOnInit(): void {
    if (this.formActionValue() === 'UPDATE') {
      this.setValueForms();
    }
  }

  private setValueForms(): void {

    this.form.patchValue({
      userName: 'Kevyn',
      userLastName: 'Posadas',
      songName: 'Entre dos tierras',
      artistName: 'Heroes del silencio'
    })

  }


  public submit(): void {

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.pristine && this.formActionValue() === 'UPDATE') return;

    this.formValue.emit(this.form.value)
  }

}
