import { Component } from '@angular/core';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  selectedFile!: File;

  constructor(private apiManager: ApiRestManagerService,
    private toastr: ToastrService
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.apiManager.uploadDocument(formData).subscribe({
      next: (response) => {
        this.toastr.success('Documento subido correctamente', 'Documento', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      error: (error) => {
        this.toastr.error('No se ha podido subir el documento', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }
}
