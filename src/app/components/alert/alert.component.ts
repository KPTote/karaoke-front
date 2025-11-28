import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  template: `
    @switch (typeAlert()) {


      @case('warning'){
            <div class="alert-container alert-background-warning">
              <span>{{message()}}</span>
            </div>
      } @case ('error'){
            <div class="alert-container alert-background-error">
              <span>{{message()}}</span>
            </div>
      } @case('success'){
            <div class="alert-container alert-background-success">
              <span>{{message()}}</span>
            </div>
      } @default {
            <div class="alert-container">
              <span>No hay canciones agregadas a la lista.</span>
            </div>
      }

    }

  `,
  styles: `

  .alert-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px black solid;
  text-align: center;
  border-radius: 3px;
}

.alert-background-warning {
  background-color: #ffc107;

}

.alert-background-error {
  background-color: #dc3545;
  color: white;
}

.alert-background-success{
  background-color: #0f5132;
  color: white;
}

  `
})
export class AlertComponent {

  public message = input.required<string>();
  public typeAlert = input.required<string>();



}
