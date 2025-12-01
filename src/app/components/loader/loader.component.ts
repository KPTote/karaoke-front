import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `

<div class="loader-container" [class.loader-container__login]="loginLoader()" >
   <div class="spinner" [class]="{ 'spinner-login': loginLoader(), 'spinner-normal': !loginLoader()}" aria-live="polite" aria-label="Cargando"></div>
</div>


  `,
  styles: `

  .spinner{
    border: 5px solid #fffc;
    border-top-color: #0066FF;
    border-radius: 100%;
    animation: spin 1s infinite;
  }

  .loader-container__login{
    display: grid;
    justify-content: center;
  }

    .spinner-normal{
    width: 50px;
    height: 50px;
  }

  .spinner-login{
        width: 50px;
    height: 50px;
  }

  @keyframes spin{
    to {
      transform:rotate(360deg);
    }
  }

  @media only screen and (min-width: 600px){
     .spinner-normal{
    width: 150px;
    height: 150px;
  }
  }

  `
})
export class LoaderComponent {

  loginLoader = input<boolean>();

}
