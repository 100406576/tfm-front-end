import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}`);
  }

  loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
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
