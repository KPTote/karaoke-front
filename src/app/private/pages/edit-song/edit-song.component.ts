import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertComponent } from "../../../components/alert/alert.component";
import { FormComponent } from "../../../components/form/form.component";
import { LoaderComponent } from '../../../components/loader/loader.component';
import { FormSettings, FormStructure } from '../../../interface/karaoke.interface';
import { AddSongRequest } from '../../interfaces/private.interface';
import { PrivateApiService } from '../../services/private-api.service';

type typeAlert = 'SUCCESS' | 'ERROR';
@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [FormComponent, AlertComponent, LoaderComponent],
  templateUrl: './edit-song.component.html',
  styleUrl: './edit-song.component.css'
})
export class EditSongComponent implements OnInit {


  public formSettings: FormSettings = {
    showTitle: true,
    showDescription: false,
    title: 'Editar canción',
  };
  public songSelected: FormStructure = {
    userName: '',
    userLastName: '',
    songName: '',
    artistName: ''
  };
  public showAlert = false;
  public loading = false;
  public typeAlert: typeAlert = 'SUCCESS';
  public messageAlert = '';
  public showConfirmation = false;
  public query: AddSongRequest = {
    numberOnList: 0,
    userName: '',
    songName: '',
    artistName: ''
  };

  private numberOnList = 0;


  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly privateApi = inject(PrivateApiService);
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.getSongSelected();
  }

  public formValue(values: FormStructure): void {

    this.loading = true;

    this.query = {
      numberOnList: this.numberOnList,
      userName: `${values.userName} ${values.userLastName}`,
      songName: values.songName,
      artistName: values.artistName
    }


    this.privateApi.updateSong(this.query)
    .pipe(
      finalize(()=> this.loading = false)
    )
    .subscribe({
      next: res => {
        this.showConfirmation = true;
        this.typeAlert = 'SUCCESS';
        this.messageAlert = 'Cambios aplicados exitosamente.'
      },
      error: error => {
        this.showAlert = true;
        this.typeAlert = 'ERROR';
        this.messageAlert = 'Error al aplicar los cambios.'
      }
    })
  }


  public getSongSelected(): void {

    const userNameWithLastName = this.activatedRoute.snapshot.queryParams['userName'];
    const { userName, userLastName } = this.getLastName(userNameWithLastName);

    this.songSelected.userName = userName;
    this.songSelected.userLastName = userLastName;
    this.songSelected.songName = this.activatedRoute.snapshot.queryParams['songName'];
    this.songSelected.artistName = this.activatedRoute.snapshot.queryParams['artistName'];
    this.numberOnList = Number(this.activatedRoute.snapshot.queryParams['numberOnList']);

  }

  private getLastName(userName: string) {
    if(!userName) return {userName: '', userLastName: ''}
    const splitName = userName.split(' ');
    return {
      userName: splitName[0],
      userLastName: splitName[1]
    }
  }

  public back(): void {
    this.router.navigate(['/private/dashboard'])
  }

}
