import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from "../../../components/form/form.component";
import { FormSettings, FormStructure } from '../../../interface/karaoke.interface';
import { AddSongRequest } from '../../interfaces/private.interface';
import { PrivateApiService } from '../../services/private-api.service';

type typeAlert = 'SUCCESS' | 'ERROR';
@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [FormComponent],
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
  public typeAlert: typeAlert = 'SUCCESS';
  public messageAlert = '';
  private numberOnList = 0;


  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly privateApi = inject(PrivateApiService);
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.getSongSelected();
  }

  public formValue(values: FormStructure): void {
    console.log(typeof this.numberOnList);


    const query: AddSongRequest = {
      numberOnList: this.numberOnList,
      userName: `${values.userName} ${values.userLastName}`,
      songName: values.songName,
      artistName: values.artistName
    }


    this.privateApi.updateSong(query).subscribe({
      next: res => {
        console.log(res)
        this.showAlert = true;
        this.typeAlert = 'SUCCESS';
        this.messageAlert = 'Cambios aplicados exitosamente.'
      },
      error: error => {
        console.log(error)
        this.showAlert = false;
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
