import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-current-list',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './current-list.component.html',
  styleUrl: './current-list.component.css'
})
export class CurrentListComponent {

}
