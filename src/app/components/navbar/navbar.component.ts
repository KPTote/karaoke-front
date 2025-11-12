import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
<div class="navbar-container">
  <nav>

    <input type="checkbox" id="check" />
    <label for="check" class="checkbtn" name="menu">
      <i class="bi bi-list"></i>
    </label>

    <div class="navbar__logo">
    <img src="images/logo3.png" alt="Logotipo">
    </div>

    <ul>
      <li><a routerLink="/" >Lista actual</a></li>
      <li><a routerLink="/" >Historial</a></li>
      <li><a (click)="logOut()" class="navbar__logout">Cerrar sesión</a></li>
    </ul>
  </nav>
</div>

  `,
  styles: `

* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}

.navbar-container {
  position: relative;
}

nav {
  background: #0d1117;
  height: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.navbar__logo{
  align-content: center;
  grid-area: 1 / 1 / 2 / 2;
}

.navbar__logo img{
  width: 100%;
  max-width: 200px;
}

nav ul {
  float: right;
  margin-right: 20px;
  text-align: end;
}

nav ul li {
  display: inline-block;
  line-height: 80px;
  margin: 0 5px;
}

nav ul li a {
  color: white;
  font-size: 17px;
  padding: 7px 13px;
  border-radius: 3px;
  text-transform: uppercase;
}

nav ul li a:hover {
  color: #0066FF;
  cursor: pointer;
}

.checkbtn {
  font-size: 30px;
  color: white;
  text-align: end;
  line-height: 80px;
  margin-right: 15px;
  cursor: pointer;
  display: none;
}

#check {
  display: none;
}

@media (max-width: 952px) {

  nav ul li a {
    font-size: 16px;
  }
}

@media (max-width: 858px) {
  .checkbtn {
    display: block;
  }

  ul {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #0d1117;
    top: 80px;
    left: -100%;
    text-align: center;
    transition: all 0.5s;
    z-index: 100;
  }

  nav ul li {
    display: block;
    margin: 50px 0;
    line-height: 30px;
  }

  nav ul li a {
    font-size: 20px;
  }

  a:hover,
  a.active {
    color: yellow;
  }

  #check:checked ~ ul {
    left: 0;
  }

  .navbar__logout:hover {
    cursor: pointer;
  }
}

  `
})
export class NavbarComponent {
  logOut() {
    throw new Error('Method not implemented.');
  }

}
