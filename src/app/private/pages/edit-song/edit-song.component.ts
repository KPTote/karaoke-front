import { Component } from '@angular/core';
import { FormComponent } from "../../../components/form/form.component";
import { FormSettings, FormStructure } from '../../../interface/karaoke.interface';

@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit-song.component.html',
  styleUrl: './edit-song.component.css'
})
export class EditSongComponent {

  public formSettings: FormSettings = {
    showTitle: true,
    showDescription: false,
    title: 'Editar canción',
  };


  public formValue(values: FormStructure) {
    console.log(values);
  }

}
