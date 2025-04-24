import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  sharedService = inject(SharedService);
  router = inject(Router);
  onLogout() {
    localStorage.removeItem('userDetails');
    this.router.navigate(['./login']);
  }
  roleSelect(event: any) {
    this.sharedService.roleSelected$.next(event.target.value);
  }
}
