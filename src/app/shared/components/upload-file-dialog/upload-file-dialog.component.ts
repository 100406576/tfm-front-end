import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiRestManagerService } from '../../services/api-rest-manager.service';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent {
  selectedFile!: File;
  selectedFileName: string = '';

  constructor(
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    private apiManager: ApiRestManagerService,
    private toastr: ToastrService
  ) {}

  onFileSelected(event: any) {
    this.saveFiles(event.target.files);
  }

  onFileDropped(event: any) {
    event.preventDefault();
    this.saveFiles(event.dataTransfer.files);
  }

  saveFiles(files: FileList) {
    if (files.length > 1) {
      this.toastr.error('Solo se puede subir un archivo al mismo tiempo', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    } else {
      this.selectedFile = files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }
  
  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  onDragLeave(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiManager.uploadDocument(formData).subscribe({
      next: (response) => {
        this.toastr.success('Documento subido correctamente', 'Documento', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.dialogRef.close();
      },
      error: (error) => {
        if(error.status === 409) {
          this.toastr.error('Ya existe un documento con el mismo nombre', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
        } else if(error.status === 400 && error.error.error === 'Unsupported file type') {
          this.toastr.error('Tipo de archivo no soportado', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
        } else {
          this.toastr.error('No se ha podido subir el documento', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
        }
      }
    });
  }
}
