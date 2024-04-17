import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tfm-front-end';
  isLoggedIn = false;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logOut() {
    this.auth.removeSession();
    this.toastr.info('Sesión cerrada correctamente', 'Logout', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
    this.router.navigate(['/login']);
  }
}
