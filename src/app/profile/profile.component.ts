import { Component, OnInit } from '@angular/core';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();

  constructor(private apiManager: ApiRestManagerService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }
  
  getUserProfile() {
    this.apiManager.getUserProfile().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}