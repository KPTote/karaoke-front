import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `
  <div class="spinner" aria-live="polite" aria-label="Cargando"></div>
  `,
  styles: `
  .loader-container{
    outline: 1px red solid;
  }

  .spinner{
    width: 36px;
    height: 36px;
    border: 5px solid #fffc;
    border-top-color: rgb(255, 0, 119);
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
