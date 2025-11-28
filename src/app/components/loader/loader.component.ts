import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `

<div class="loader-container">
   <div class="spinner" aria-live="polite" aria-label="Cargando"></div>
</div>


  `,
  styles: `

  .spinner{
    width: 150px;
    height: 150px;
    border: 5px solid #fffc;
    border-top-color: #0066FF;
    border-radius: 100%;
    animation: spin 1s infinite;
  }

  @keyframes spin{
    to {
      transform:rotate(360deg);
    }
  }

  `
})
export class LoaderComponent {

}
