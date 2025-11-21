import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { AddSongRequest } from '../../../private/interfaces/private.interface';
import userFormFields from '../../data/user-form-fields.json';
import { UserFormFields } from '../../interfaces/public.interface';
import { PublicApiService } from '../../services/public-api.service';
import { PublicService } from '../../services/public.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  public readonly userFormFields: UserFormFields[] = userFormFields;
  public songFormInvalid = false;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly publicService = inject(PublicService);
  private readonly publicApiService = inject(PublicApiService);

  constructor() {
    this.publicService.accessToConfirmationForm(false);
  }

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

    this.generateId();

  }

  private navigateTo(numberOnList: number): void {
    this.router.navigate(['/public/confirmation-form'], {
      queryParams: {
        user: this.userForm?.controls['userName']?.value ?? null,
        songName: this.userForm?.controls['songName']?.value ?? null,
        artistName: this.userForm?.controls['artistName']?.value ?? null,
        numberOnList
      }
    })
  }

  private addSongToPlaylist(numberOnList: number): void {

    const req: AddSongRequest = {
      numberOnList,
      songName: this.userForm?.controls['songName']?.value ?? null,
      artistName: this.userForm?.controls['artistName']?.value ?? null,
      userName: this.getUserName(),
    }

    this.publicApiService.addNewSong(req).subscribe({
      next: res => {
        this.navigateTo(numberOnList);
        this.publicService.accessToConfirmationForm(true);
      },
      error: error => console.log(error)
    })

  }

  private getUserName(): string {
    const userName = this.userForm?.controls['userName']?.value ?? null;
    const userLastName = this.userForm?.controls['userLastName']?.value ?? null;
    return `${userName} ${userLastName}`;
  }

  private generateId(): void {
    this.publicApiService.getSongCount().subscribe({
      next: res => {
        console.log(res);
        this.addSongToPlaylist(res + 1)
      },
      error: error => console.log(error)
    })
  }

}
