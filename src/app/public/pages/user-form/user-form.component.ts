import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { FormComponent } from "../../../components/form/form.component";
import { FormSettings, FormStructure } from '../../../interface/karaoke.interface';
import { AddSongRequest } from '../../../private/interfaces/private.interface';
import userFormFields from '../../data/user-form-fields.json';
import { UserFormFields } from '../../interfaces/public.interface';
import { PublicApiService } from '../../services/public-api.service';
import { PublicService } from '../../services/public.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, FormComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  public readonly userFormFields: UserFormFields[] = userFormFields;
  public songFormInvalid = false;
  public formSettings: FormSettings = {
    showTitle: true,
    showDescription: true,
    title: '¡Hola!',
    description: `Gracias por participar en el karaoke. Para poder participar es necesario completar el siguiente formulario. Luego, dar click en el botón de enviar.`
  };

  private userName = '';
  private userLastName = '';
  private songName = '';
  private artistName = '';

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly publicService = inject(PublicService);
  private readonly publicApiService = inject(PublicApiService);

  constructor() {
    this.publicService.accessToConfirmationForm(false);
  }


  public submit(formValue: FormStructure): void {

    const { userName, userLastName, songName, artistName } = formValue;

    this.userName = userName.trim();
    this.userLastName = userLastName.trim();
    this.songName = songName.trim();
    this.artistName = artistName.trim();

    this.generateId();

  }

  private navigateTo(numberOnList: number): void {
    this.router.navigate(['/public/confirmation-form'], {
      queryParams: {
        user: this.userName,
        songName: this.songName,
        artistName: this.artistName,
        numberOnList
      }
    })
  }

  private addSongToPlaylist(numberOnList: number): void {

    const req: AddSongRequest = {
      numberOnList,
      songName: this.songName,
      artistName: this.artistName,
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
    return `${this.userName} ${this.userLastName}`;
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
