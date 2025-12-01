import { Component, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `

  <div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <i class="bi bi-search"></i>
      </span>
      <input
      type="text"
      class="form-control"
      placeholder="Nombre del participante"
      aria-label="Username"
      aria-describedby="basic-addon1"
      id="filter"
      [(ngModel)]="filterValue"
      (ngModelChange)="filterChange.emit(filterValue)"
      autocomplete="off"
      >
    </div>
  </div>



  `,
  styleUrl: './filter.component.css'
})
export class FilterComponent{

  filterChange = output<string>();
  filterValue = '';

}
