import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'app-confirmation-form',
  standalone: true,
  imports: [CapitalizePipe, FooterComponent],
  templateUrl: './confirmation-form.component.html',
  styleUrl: './confirmation-form.component.css'
})
export class ConfirmationFormComponent implements OnInit {

  public user: string | undefined;
  public songName: string | undefined;
  public artistName: string | undefined;
  public numberOnlist: string = '';

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.getFormData();
  }

  private getFormData(): void {

    this.user = this.activatedRoute.snapshot.queryParams['user'] ?? '';
    this.songName = this.activatedRoute.snapshot.queryParams['songName'] ?? '';
    this.artistName = this.activatedRoute.snapshot.queryParams['artistName'] ?? '';
    this.numberOnlist = this.activatedRoute.snapshot.queryParams['numberOnList'] ?? '';
  }

  public back(): void {
    this.router.navigate(['/public/user-form']).finally(() => { });
  }

}
