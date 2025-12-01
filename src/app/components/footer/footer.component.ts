import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `

  <footer class="footer-container">
  <div class="logo-container">
    <img src="images/logo2.png" alt="Logotipo" />
  </div>
  <div class="information-container">
    Desarrollado por <strong><a href="https://www.youtube.com/watch?v=dLl4PZtxia8&list=RDdLl4PZtxia8&start_radio=1" target="_blank" >Software Solutions</a></strong>
  </div>
</footer>


  `,
  styles: `

  .footer-container {
  background-color: #0d1117;
  color: #eaeaea;
  display: flex;
  justify-content: center;
  }

  .footer-container .logo-container img {
  width: 100%;
  max-width: 50px;
  }

  .footer-container .information-container {
  align-content: center;
  }

  `
})
export class FooterComponent {

  logoUrl = 'assets/images/logo1.png';

}
