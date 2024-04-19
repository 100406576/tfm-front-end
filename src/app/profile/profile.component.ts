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
  isEditing: boolean = false;

  constructor(private apiManager: ApiRestManagerService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.apiManager.getUserProfile().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  

  onEditClicked() {
    this.isEditing = !this.isEditing;
  }

  onDeletedClicked() {
    alert("Borrar aún no está implementado")
  }
}